// ============================================
// STORAGE UTILITIES FOR MEDIMIND
// ============================================

// Save medications to browser storage
export function saveMedications(medications) {
  if (typeof window !== "undefined") {
    localStorage.setItem("medications", JSON.stringify(medications));
  }
}

// Load medications from browser storage
export function loadMedications() {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("medications");
    return stored ? JSON.parse(stored) : [];
  }
  return [];
}

// Save dose logs
export function saveDoseLogs(logs) {
  if (typeof window !== "undefined") {
    localStorage.setItem("doseLogs", JSON.stringify(logs));
  }
}

// Load dose logs
export function loadDoseLogs() {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("doseLogs");
    return stored ? JSON.parse(stored) : [];
  }
  return [];
}

// Generate unique ID
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// ============================================
// MEDICATION MANAGEMENT
// ============================================

// Add a new medication
export function addMedication(medication) {
  const medications = loadMedications();
  const newMed = {
    id: generateId(),
    ...medication,
    createdAt: new Date().toISOString(),
    status: "active",
    currentPills: medication.totalPills || 0,
  };
  medications.push(newMed);
  saveMedications(medications);
  return newMed;
}

// Update medication
export function updateMedication(id, updates) {
  const medications = loadMedications();
  const index = medications.findIndex((m) => m.id === id);
  if (index !== -1) {
    medications[index] = { ...medications[index], ...updates };
    saveMedications(medications);
    return medications[index];
  }
  return null;
}

// Delete medication
export function deleteMedication(id) {
  const medications = loadMedications();
  const filtered = medications.filter((m) => m.id !== id);
  saveMedications(filtered);
}

// Get medication by ID
export function getMedicationById(id) {
  const medications = loadMedications();
  return medications.find((m) => m.id === id);
}

// ============================================
// DOSE LOGGING
// ============================================

// Log a dose (taken, skipped, delayed)
export function logDose(
  medicationId,
  status,
  timestamp = new Date(),
  notes = "",
) {
  const logs = loadDoseLogs();
  const medication = getMedicationById(medicationId);

  if (!medication) return null;

  const log = {
    id: generateId(),
    medicationId,
    medicationName: medication.name,
    status, // 'taken', 'skipped', 'delayed'
    timestamp: timestamp.toISOString(),
    scheduledTime: timestamp.toISOString(),
    notes,
    createdAt: new Date().toISOString(),
  };

  logs.push(log);
  saveDoseLogs(logs);

  // Update pill count if taken
  if (status === "taken" && medication.currentPills !== undefined) {
    updateMedication(medicationId, {
      currentPills: Math.max(
        0,
        medication.currentPills - (medication.pillsPerDose || 1),
      ),
    });
  }

  return log;
}

// Get dose logs for a medication
export function getDoseLogsForMedication(medicationId, days = 30) {
  const logs = loadDoseLogs();
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  return logs
    .filter(
      (log) =>
        log.medicationId === medicationId &&
        new Date(log.timestamp) >= cutoffDate,
    )
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

// Get all recent dose logs
export function getRecentDoseLogs(days = 7) {
  const logs = loadDoseLogs();
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  return logs
    .filter((log) => new Date(log.timestamp) >= cutoffDate)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

// ============================================
// ADHERENCE CALCULATION
// ============================================

// Calculate adherence score for a medication
export function calculateAdherenceScore(medicationId, days = 30) {
  const medication = getMedicationById(medicationId);
  if (!medication) return 0;

  const logs = getDoseLogsForMedication(medicationId, days);

  // Calculate expected doses based on frequency
  const frequencyMap = {
    once_daily: 1,
    twice_daily: 2,
    three_times: 3,
    four_times: 4,
  };

  const dosesPerDay = frequencyMap[medication.frequency] || 1;
  const expectedDoses = days * dosesPerDay;

  // Count taken doses
  const takenDoses = logs.filter((log) => log.status === "taken").length;

  // Calculate score (0-100)
  const score =
    expectedDoses > 0 ? Math.round((takenDoses / expectedDoses) * 100) : 0;

  return Math.min(100, score);
}

// Calculate overall adherence score
export function calculateOverallAdherence(days = 30) {
  const medications = loadMedications().filter((m) => m.status === "active");

  if (medications.length === 0) return 0;

  const scores = medications.map((med) =>
    calculateAdherenceScore(med.id, days),
  );
  const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;

  return Math.round(average);
}

// ============================================
// RISK DETECTION
// ============================================

// Detect risk patterns for a medication
export function detectRisks(medicationId) {
  const medication = getMedicationById(medicationId);
  if (!medication) return [];

  const risks = [];
  const logs = getDoseLogsForMedication(medicationId, 7);

  // Risk 1: Low adherence (< 80% in last 7 days)
  const adherenceScore = calculateAdherenceScore(medicationId, 7);
  if (adherenceScore < 80) {
    risks.push({
      type: "low_adherence",
      severity: adherenceScore < 50 ? "high" : "medium",
      message: `Adherence is ${adherenceScore}% in the last week`,
      recommendation: "Try setting reminders or adjusting your schedule",
    });
  }

  // Risk 2: Consecutive missed doses
  const recentLogs = logs.slice(0, 5);
  const consecutiveMissed = recentLogs.filter(
    (log) => log.status === "skipped",
  ).length;
  if (consecutiveMissed >= 3) {
    risks.push({
      type: "consecutive_missed",
      severity: "high",
      message: `${consecutiveMissed} doses missed recently`,
      recommendation:
        "Contact your healthcare provider if you're having difficulty",
    });
  }

  // Risk 3: Low pill count (< 7 days remaining)
  if (medication.currentPills !== undefined) {
    const dosesPerDay =
      { once_daily: 1, twice_daily: 2, three_times: 3 }[medication.frequency] ||
      1;
    const pillsPerDay = dosesPerDay * (medication.pillsPerDose || 1);
    const daysRemaining = medication.currentPills / pillsPerDay;

    if (daysRemaining < 7 && daysRemaining > 0) {
      risks.push({
        type: "low_supply",
        severity: daysRemaining < 3 ? "high" : "medium",
        message: `Only ${Math.floor(daysRemaining)} days of medication remaining`,
        recommendation: "Order a refill soon",
      });
    } else if (daysRemaining <= 0) {
      risks.push({
        type: "out_of_stock",
        severity: "high",
        message: "Out of medication",
        recommendation: "Refill immediately",
      });
    }
  }

  // Risk 4: Delayed doses pattern
  const delayedCount = logs.filter((log) => log.status === "delayed").length;
  if (delayedCount >= 4) {
    risks.push({
      type: "frequent_delays",
      severity: "low",
      message: "Doses frequently taken late",
      recommendation: "Consider adjusting your scheduled time",
    });
  }

  return risks;
}

// Get all active risks across medications
export function getAllRisks() {
  const medications = loadMedications().filter((m) => m.status === "active");
  const allRisks = [];

  medications.forEach((med) => {
    const risks = detectRisks(med.id);
    risks.forEach((risk) => {
      allRisks.push({
        ...risk,
        medicationId: med.id,
        medicationName: med.name,
      });
    });
  });

  // Sort by severity
  const severityOrder = { high: 0, medium: 1, low: 2 };
  return allRisks.sort(
    (a, b) => severityOrder[a.severity] - severityOrder[b.severity],
  );
}

// ============================================
// REFILL PREDICTIONS
// ============================================

// Predict when refill is needed
export function predictRefillDate(medicationId) {
  const medication = getMedicationById(medicationId);
  if (!medication || medication.currentPills === undefined) return null;

  const dosesPerDay =
    { once_daily: 1, twice_daily: 2, three_times: 3 }[medication.frequency] ||
    1;
  const pillsPerDay = dosesPerDay * (medication.pillsPerDose || 1);
  const daysRemaining = medication.currentPills / pillsPerDay;

  if (daysRemaining <= 0) return new Date(); // Needs refill now

  const refillDate = new Date();
  refillDate.setDate(refillDate.getDate() + Math.floor(daysRemaining));

  return refillDate;
}

// Get medications needing refill soon
export function getMedicationsNeedingRefill(daysThreshold = 7) {
  const medications = loadMedications().filter((m) => m.status === "active");
  const needingRefill = [];

  medications.forEach((med) => {
    const refillDate = predictRefillDate(med.id);
    if (refillDate) {
      const daysUntilRefill = Math.ceil(
        (refillDate - new Date()) / (1000 * 60 * 60 * 24),
      );
      if (daysUntilRefill <= daysThreshold) {
        needingRefill.push({
          ...med,
          refillDate,
          daysUntilRefill,
        });
      }
    }
  });

  return needingRefill.sort((a, b) => a.daysUntilRefill - b.daysUntilRefill);
}

// ============================================
// ANALYTICS & STATISTICS
// ============================================

// Get medication statistics
export function getMedicationStats(medicationId, days = 30) {
  const logs = getDoseLogsForMedication(medicationId, days);

  const taken = logs.filter((l) => l.status === "taken").length;
  const skipped = logs.filter((l) => l.status === "skipped").length;
  const delayed = logs.filter((l) => l.status === "delayed").length;

  return {
    taken,
    skipped,
    delayed,
    total: logs.length,
    adherenceScore: calculateAdherenceScore(medicationId, days),
  };
}

// Get dashboard summary
export function getDashboardSummary() {
  const medications = loadMedications().filter((m) => m.status === "active");
  const overallAdherence = calculateOverallAdherence(7);
  const risks = getAllRisks();
  const refills = getMedicationsNeedingRefill(7);
  const recentLogs = getRecentDoseLogs(7);

  return {
    totalMedications: medications.length,
    overallAdherence,
    highRisks: risks.filter((r) => r.severity === "high").length,
    refillsNeeded: refills.length,
    recentActivity: recentLogs.length,
    medications,
    risks,
    refills,
  };
}

// ============================================
// COMMON MEDICATIONS DATABASE
// ============================================

export const commonMedications = [
  { name: "Metformin", defaultDosage: "500mg", condition: "Type 2 Diabetes" },
  {
    name: "Lisinopril",
    defaultDosage: "10mg",
    condition: "High Blood Pressure",
  },
  {
    name: "Atorvastatin",
    defaultDosage: "20mg",
    condition: "High Cholesterol",
  },
  {
    name: "Levothyroxine",
    defaultDosage: "50mcg",
    condition: "Hypothyroidism",
  },
  {
    name: "Amlodipine",
    defaultDosage: "5mg",
    condition: "High Blood Pressure",
  },
  {
    name: "Metoprolol",
    defaultDosage: "50mg",
    condition: "High Blood Pressure",
  },
  { name: "Omeprazole", defaultDosage: "20mg", condition: "Acid Reflux" },
  { name: "Losartan", defaultDosage: "50mg", condition: "High Blood Pressure" },
  { name: "Albuterol", defaultDosage: "90mcg", condition: "Asthma" },
  { name: "Gabapentin", defaultDosage: "300mg", condition: "Nerve Pain" },
  {
    name: "Sertraline",
    defaultDosage: "50mg",
    condition: "Depression/Anxiety",
  },
  { name: "Simvastatin", defaultDosage: "20mg", condition: "High Cholesterol" },
  {
    name: "Escitalopram",
    defaultDosage: "10mg",
    condition: "Depression/Anxiety",
  },
  { name: "Montelukast", defaultDosage: "10mg", condition: "Asthma/Allergies" },
  {
    name: "Rosuvastatin",
    defaultDosage: "10mg",
    condition: "High Cholesterol",
  },
  { name: "Pantoprazole", defaultDosage: "40mg", condition: "Acid Reflux" },
  { name: "Furosemide", defaultDosage: "40mg", condition: "Fluid Retention" },
  { name: "Aspirin", defaultDosage: "81mg", condition: "Heart Health" },
  { name: "Clopidogrel", defaultDosage: "75mg", condition: "Blood Thinner" },
  { name: "Warfarin", defaultDosage: "5mg", condition: "Blood Thinner" },
];

// Search medications by name
export function searchMedications(query) {
  if (!query || query.length < 2) return [];

  const lowerQuery = query.toLowerCase();
  return commonMedications
    .filter((med) => med.name.toLowerCase().includes(lowerQuery))
    .slice(0, 5);
}
