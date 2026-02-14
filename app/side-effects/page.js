"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loadMedications, generateId } from "@/lib/storage";
import { components } from "@/lib/theme";

export default function SideEffects() {
  const router = useRouter();
  const [medications, setMedications] = useState([]);
  const [sideEffects, setSideEffects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    medicationId: "",
    symptoms: [],
    severity: "mild",
    notes: "",
  });

  // Common symptoms with SVG icons
  const commonSymptoms = [
    {
      id: "nausea",
      name: "Nausea",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      color: "text-green-600",
      bg: "bg-green-50",
      severity: "common",
    },
    {
      id: "headache",
      name: "Headache",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      color: "text-purple-600",
      bg: "bg-purple-50",
      severity: "common",
    },
    {
      id: "dizziness",
      name: "Dizziness",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      ),
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      severity: "common",
    },
    {
      id: "fatigue",
      name: "Fatigue",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      ),
      color: "text-blue-600",
      bg: "bg-blue-50",
      severity: "common",
    },
    {
      id: "stomach_pain",
      name: "Stomach Pain",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      ),
      color: "text-orange-600",
      bg: "bg-orange-50",
      severity: "common",
    },
    {
      id: "diarrhea",
      name: "Diarrhea",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      ),
      color: "text-amber-600",
      bg: "bg-amber-50",
      severity: "common",
    },
    {
      id: "constipation",
      name: "Constipation",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
          />
        </svg>
      ),
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      severity: "common",
    },
    {
      id: "dry_mouth",
      name: "Dry Mouth",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      color: "text-cyan-600",
      bg: "bg-cyan-50",
      severity: "common",
    },
    {
      id: "insomnia",
      name: "Insomnia",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      ),
      color: "text-slate-600",
      bg: "bg-slate-50",
      severity: "common",
    },
    {
      id: "drowsiness",
      name: "Drowsiness",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      ),
      color: "text-teal-600",
      bg: "bg-teal-50",
      severity: "common",
    },
    {
      id: "rash",
      name: "Skin Rash",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
      ),
      color: "text-pink-600",
      bg: "bg-pink-50",
      severity: "monitor",
    },
    {
      id: "itching",
      name: "Itching",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
          />
        </svg>
      ),
      color: "text-rose-600",
      bg: "bg-rose-50",
      severity: "monitor",
    },
    {
      id: "swelling",
      name: "Swelling",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      ),
      color: "text-fuchsia-600",
      bg: "bg-fuchsia-50",
      severity: "monitor",
    },
    {
      id: "rapid_heartbeat",
      name: "Rapid Heartbeat",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
      color: "text-red-600",
      bg: "bg-red-50",
      severity: "serious",
    },
    {
      id: "chest_pain",
      name: "Chest Pain",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      ),
      color: "text-red-700",
      bg: "bg-red-100",
      severity: "serious",
    },
    {
      id: "breathing_difficulty",
      name: "Breathing Difficulty",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      color: "text-red-700",
      bg: "bg-red-100",
      severity: "serious",
    },
    {
      id: "confusion",
      name: "Confusion",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      color: "text-red-600",
      bg: "bg-red-50",
      severity: "serious",
    },
    {
      id: "vision_changes",
      name: "Vision Changes",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      ),
      color: "text-violet-600",
      bg: "bg-violet-50",
      severity: "monitor",
    },
  ];

  useEffect(() => {
    const meds = loadMedications().filter((m) => m.status === "active");
    setMedications(meds);

    const stored = localStorage.getItem("sideEffects");
    if (stored) {
      setSideEffects(JSON.parse(stored));
    }
  }, []);

  const saveSideEffects = (effects) => {
    localStorage.setItem("sideEffects", JSON.stringify(effects));
    setSideEffects(effects);
  };

  const toggleSymptom = (symptomId) => {
    setForm((prev) => {
      const symptoms = prev.symptoms.includes(symptomId)
        ? prev.symptoms.filter((s) => s !== symptomId)
        : [...prev.symptoms, symptomId];
      return { ...prev, symptoms };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const medication = medications.find((m) => m.id === form.medicationId);
    if (!medication || form.symptoms.length === 0) return;

    const newEffect = {
      id: generateId(),
      medicationId: form.medicationId,
      medicationName: medication.name,
      symptoms: form.symptoms.map((id) =>
        commonSymptoms.find((s) => s.id === id),
      ),
      severity: form.severity,
      notes: form.notes,
      timestamp: new Date().toISOString(),
    };

    const updated = [newEffect, ...sideEffects];
    saveSideEffects(updated);

    setForm({
      medicationId: "",
      symptoms: [],
      severity: "mild",
      notes: "",
    });
    setShowForm(false);
  };

  const deleteEffect = (id) => {
    if (confirm("Are you sure you want to delete this side effect log?")) {
      const updated = sideEffects.filter((e) => e.id !== id);
      saveSideEffects(updated);
    }
  };

  const analyzeSideEffects = () => {
    if (sideEffects.length === 0) return null;

    const severeCount = sideEffects.filter(
      (e) => e.severity === "severe",
    ).length;
    const recentSevere = sideEffects.filter(
      (e) =>
        e.severity === "severe" &&
        new Date() - new Date(e.timestamp) < 7 * 24 * 60 * 60 * 1000,
    ).length;

    const seriousSymptoms = sideEffects.filter((e) =>
      e.symptoms.some((s) => s.severity === "serious"),
    );

    const frequentSymptoms = {};
    sideEffects.forEach((effect) => {
      effect.symptoms.forEach((symptom) => {
        frequentSymptoms[symptom.name] =
          (frequentSymptoms[symptom.name] || 0) + 1;
      });
    });

    const mostFrequent = Object.entries(frequentSymptoms).sort(
      (a, b) => b[1] - a[1],
    )[0];

    return {
      severeCount,
      recentSevere,
      seriousSymptoms: seriousSymptoms.length,
      mostFrequent,
      totalLogs: sideEffects.length,
    };
  };

  const analysis = analyzeSideEffects();

  const getAnalysisMessage = () => {
    if (!analysis) return null;

    if (analysis.seriousSymptoms > 0) {
      return {
        type: "critical",
        title: "Serious Symptoms Detected",
        message:
          "You've logged symptoms that may require immediate medical attention. Please contact your healthcare provider.",
        bg: "bg-red-50",
        border: "border-red-300",
        text: "text-red-900",
      };
    }

    if (analysis.recentSevere > 0) {
      return {
        type: "urgent",
        title: "Recent Severe Side Effects",
        message:
          "You've experienced severe side effects recently. Consider discussing medication adjustments with your doctor.",
        bg: "bg-amber-50",
        border: "border-amber-300",
        text: "text-amber-900",
      };
    }

    if (analysis.mostFrequent && analysis.mostFrequent[1] >= 3) {
      return {
        type: "pattern",
        title: "Pattern Detected",
        message: `You've reported "${analysis.mostFrequent[0]}" ${analysis.mostFrequent[1]} times. This pattern may be worth discussing with your doctor.`,
        bg: "bg-blue-50",
        border: "border-blue-300",
        text: "text-blue-900",
      };
    }

    return {
      type: "normal",
      title: "Tracking Well",
      message:
        "You're doing a great job tracking your side effects. Keep monitoring and share this information with your healthcare provider.",
      bg: "bg-green-50",
      border: "border-green-300",
      text: "text-green-900",
    };
  };

  const analysisMessage = getAnalysisMessage();

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "mild":
        return "bg-green-100 text-green-700 border-green-300";
      case "moderate":
        return "bg-amber-100 text-amber-700 border-amber-300";
      case "severe":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const groupedEffects = sideEffects.reduce((acc, effect) => {
    if (!acc[effect.medicationName]) {
      acc[effect.medicationName] = [];
    }
    acc[effect.medicationName].push(effect);
    return acc;
  }, {});

  return (
    <div className={components.pageContainer}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className={components.contentContainer}>
          <div className="flex items-center justify-between py-5">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/")}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Side Effects Tracker
                </h1>
                <p className="text-sm text-gray-600 mt-0.5">
                  Log and monitor medication side effects
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className={components.button.primary}
            >
              {showForm ? "Cancel" : "+ Log Side Effect"}
            </button>
          </div>
        </div>
      </header>

      <div className={components.contentContainer}>
        {/* Analysis Message */}
        {analysisMessage && sideEffects.length > 0 && (
          <div
            className={`mb-6 p-6 rounded-lg border-2 ${analysisMessage.bg} ${analysisMessage.border}`}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-gray-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3
                  className={`text-lg font-bold mb-2 ${analysisMessage.text}`}
                >
                  {analysisMessage.title}
                </h3>
                <p className={`text-sm ${analysisMessage.text}`}>
                  {analysisMessage.message}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Add Side Effect Form */}
        {showForm && (
          <div className={components.card + " p-6 mb-6"}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Log New Side Effect
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Medication Selection */}
              <div>
                <label className={components.label}>Medication *</label>
                <select
                  required
                  value={form.medicationId}
                  onChange={(e) =>
                    setForm({ ...form, medicationId: e.target.value })
                  }
                  className={components.input}
                >
                  <option value="">Select medication</option>
                  {medications.map((med) => (
                    <option key={med.id} value={med.id}>
                      {med.name} ({med.dosage})
                    </option>
                  ))}
                </select>
              </div>

              {/* Symptom Selection - Icon Grid */}
              <div>
                <label className={components.label}>
                  Select Symptoms * (choose one or more)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-2">
                  {commonSymptoms.map((symptom) => (
                    <button
                      key={symptom.id}
                      type="button"
                      onClick={() => toggleSymptom(symptom.id)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        form.symptoms.includes(symptom.id)
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <div className={`mb-2 ${symptom.color}`}>
                        {symptom.icon}
                      </div>
                      <div className="text-sm font-semibold text-gray-900">
                        {symptom.name}
                      </div>
                    </button>
                  ))}
                </div>
                {form.symptoms.length > 0 && (
                  <p className="text-sm text-gray-600 mt-2">
                    {form.symptoms.length} symptom
                    {form.symptoms.length > 1 ? "s" : ""} selected
                  </p>
                )}
              </div>

              {/* Severity */}
              <div>
                <label className={components.label}>Severity *</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { val: "mild", label: "Mild", desc: "Minor discomfort" },
                    {
                      val: "moderate",
                      label: "Moderate",
                      desc: "Noticeable impact",
                    },
                    {
                      val: "severe",
                      label: "Severe",
                      desc: "Significant impact",
                    },
                  ].map((sev) => (
                    <button
                      key={sev.val}
                      type="button"
                      onClick={() => setForm({ ...form, severity: sev.val })}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        form.severity === sev.val
                          ? sev.val === "mild"
                            ? "border-green-500 bg-green-50"
                            : sev.val === "moderate"
                              ? "border-amber-500 bg-amber-50"
                              : "border-red-500 bg-red-50"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-sm font-semibold text-gray-900">
                          {sev.label}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          {sev.desc}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className={components.label}>Additional Notes</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="When did it occur? Duration? Any triggers?"
                  rows={3}
                  className={components.input}
                />
              </div>

              <button
                type="submit"
                className={components.button.primary + " w-full"}
                disabled={form.symptoms.length === 0 || !form.medicationId}
              >
                Save Side Effect Log
              </button>
            </form>
          </div>
        )}

        {/* Summary Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className={components.card + " p-6"}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">
                  Total Logged
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {sideEffects.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className={components.card + " p-6"}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">
                  Severe Cases
                </p>
                <p className="text-3xl font-bold text-red-600">
                  {sideEffects.filter((e) => e.severity === "severe").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className={components.card + " p-6"}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">
                  Last 7 Days
                </p>
                <p className="text-3xl font-bold text-amber-600">
                  {
                    sideEffects.filter((e) => {
                      const weekAgo = new Date();
                      weekAgo.setDate(weekAgo.getDate() - 7);
                      return new Date(e.timestamp) >= weekAgo;
                    }).length
                  }
                </p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Side Effects List */}
        {sideEffects.length === 0 ? (
          <div className={components.card + " p-12 text-center"}>
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No side effects logged yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start tracking any side effects you experience
            </p>
            <button
              onClick={() => setShowForm(true)}
              className={components.button.primary}
            >
              Log First Side Effect
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Your Logs</h3>
            {Object.entries(groupedEffects).map(([medicationName, effects]) => (
              <div key={medicationName}>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  {medicationName}
                </h4>
                <div className="grid gap-3">
                  {effects.map((effect) => (
                    <div key={effect.id} className={components.card + " p-5"}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold border ${getSeverityColor(
                                effect.severity,
                              )}`}
                            >
                              {effect.severity.toUpperCase()}
                            </span>
                            <span className="text-sm text-gray-600">
                              {formatDate(effect.timestamp)}
                            </span>
                          </div>

                          {/* Symptoms with Icons */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            {effect.symptoms.map((symptom, idx) => (
                              <div
                                key={idx}
                                className={`flex items-center gap-2 px-3 py-2 ${symptom.bg} rounded-lg border border-gray-200`}
                              >
                                <div className={symptom.color}>
                                  {symptom.icon}
                                </div>
                                <span className="text-sm font-medium text-gray-900">
                                  {symptom.name}
                                </span>
                              </div>
                            ))}
                          </div>

                          {effect.notes && (
                            <p className="text-sm text-gray-700 p-3 bg-gray-50 rounded">
                              {effect.notes}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => deleteEffect(effect.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Important Notice */}
        <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex gap-3">
            <svg
              className="w-6 h-6 text-red-600 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Important Medical Information
              </h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>
                  • Contact your healthcare provider if you experience severe
                  side effects
                </li>
                <li>
                  • Do not stop taking medications without consulting your
                  doctor
                </li>
                <li>
                  • Share this log with your healthcare team during appointments
                </li>
                <li>
                  • Seek immediate medical attention for serious or
                  life-threatening reactions
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
