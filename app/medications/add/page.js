"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { addMedication, searchMedications } from "@/lib/storage";
import { components } from "@/lib/theme";

export default function AddMedication() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    dosage: "",
    condition: "",
    frequency: "once_daily",
    times: ["09:00"],
    pillsPerDose: 1,
    totalPills: 30,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (searchQuery.length >= 2) {
      const results = searchMedications(searchQuery);
      setSuggestions(results);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSuggestionClick = (medication) => {
    setForm({
      ...form,
      name: medication.name,
      dosage: medication.defaultDosage,
      condition: medication.condition,
    });
    setSearchQuery(medication.name);
    setShowSuggestions(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addMedication({
      name: form.name,
      dosage: form.dosage,
      condition: form.condition,
      frequency: form.frequency,
      times: form.times,
      pillsPerDose: form.pillsPerDose,
      totalPills: form.totalPills,
    });

    router.push("/dashboard");
  };

  const frequencyOptions = [
    { value: "once_daily", label: "Once daily" },
    { value: "twice_daily", label: "Twice daily" },
    { value: "three_times", label: "Three times daily" },
    { value: "four_times", label: "Four times daily" },
  ];

  return (
    <div className={components.pageContainer}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className={components.contentContainer}>
          <div className="flex items-center justify-between py-5">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="text-gray-600 hover:text-gray-900 transition-colors"
                title="Go back"
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Add Medication
                </h1>
                <p className="text-sm text-gray-600 mt-0.5">
                  Enter your medication details
                </p>
              </div>
            </div>
            <button
              onClick={() => router.push("/")}
              className="text-gray-600 hover:text-gray-900 transition-colors p-2"
              title="Back to Home"
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
          </div>
        </div>
      </header>

      {/* Form */}
      <div className={components.contentContainer}>
        <div className="max-w-2xl mx-auto">
          <div className={`${components.card} p-8`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Medication Name with Autocomplete */}
              <div className="relative">
                <label className={components.label}>Medication Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                    setSearchQuery(e.target.value);
                  }}
                  onFocus={() =>
                    searchQuery.length >= 2 && setShowSuggestions(true)
                  }
                  placeholder="Start typing medication name..."
                  className={components.input}
                />

                {/* Autocomplete Suggestions */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {suggestions.map((med, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSuggestionClick(med)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                      >
                        <div className="font-medium text-gray-900">
                          {med.name}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {med.defaultDosage} • {med.condition}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Dosage */}
              <div>
                <label className={components.label}>Dosage *</label>
                <input
                  type="text"
                  required
                  value={form.dosage}
                  onChange={(e) => setForm({ ...form, dosage: e.target.value })}
                  placeholder="e.g., 500mg, 10mg, 50mcg"
                  className={components.input}
                />
              </div>

              {/* Condition */}
              <div>
                <label className={components.label}>Condition / Purpose</label>
                <input
                  type="text"
                  value={form.condition}
                  onChange={(e) =>
                    setForm({ ...form, condition: e.target.value })
                  }
                  placeholder="e.g., Type 2 Diabetes, High Blood Pressure"
                  className={components.input}
                />
              </div>

              {/* Frequency */}
              <div>
                <label className={components.label}>Frequency *</label>
                <select
                  value={form.frequency}
                  onChange={(e) =>
                    setForm({ ...form, frequency: e.target.value })
                  }
                  className={components.input}
                >
                  {frequencyOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Time */}
              <div>
                <label className={components.label}>Scheduled Time *</label>
                <input
                  type="time"
                  required
                  value={form.times[0]}
                  onChange={(e) =>
                    setForm({ ...form, times: [e.target.value] })
                  }
                  className={components.input}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Set the time you typically take this medication
                </p>
              </div>

              {/* Pills Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={components.label}>Pills per Dose *</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    required
                    value={form.pillsPerDose}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        pillsPerDose: parseInt(e.target.value),
                      })
                    }
                    className={components.input}
                  />
                </div>
                <div>
                  <label className={components.label}>
                    Total Pills in Bottle *
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={form.totalPills}
                    onChange={(e) =>
                      setForm({ ...form, totalPills: parseInt(e.target.value) })
                    }
                    className={components.input}
                  />
                </div>
              </div>

              {/* Refill Prediction Info */}
              {form.totalPills > 0 && form.pillsPerDose > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
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
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Refill Estimate</p>
                      <p>
                        With {form.totalPills} pills taking {form.pillsPerDose}{" "}
                        per dose, you have approximately{" "}
                        <span className="font-semibold">
                          {Math.floor(form.totalPills / form.pillsPerDose)}{" "}
                          doses
                        </span>{" "}
                        remaining.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className={components.button.secondary + " flex-1"}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={components.button.primary + " flex-1"}
                >
                  Add Medication
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
