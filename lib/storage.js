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
