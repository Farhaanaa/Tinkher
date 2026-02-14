"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  loadMedications,
  loadDoseLogs,
  calculateOverallAdherence,
  calculateAdherenceScore,
  getMedicationStats,
} from "@/lib/storage";

export default function AdherencePage() {
  const router = useRouter();
  const [overallAdherence, setOverallAdherence] = useState(100);
  const [medications, setMedications] = useState([]);
  const [medicationStats, setMedicationStats] = useState([]);
  const [message, setMessage] = useState({ type: "", text: "", impact: "" });

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    const meds = loadMedications();
    const adherence = calculateOverallAdherence(7);

    setMedications(meds);
    setOverallAdherence(adherence);
    setMessage(getAdherenceMessage(adherence));

    // Get stats for each medication
    const stats = meds.map((med) => ({
      ...med,
      stats: getMedicationStats(med.id, 7),
    }));
    setMedicationStats(stats);
  }

  function getAdherenceMessage(score) {
    const goodMessages = [
      {
        text: "Outstanding consistency. You're setting a gold standard for medication adherence.",
        impact:
          "Maintaining this level maximizes treatment effectiveness and reduces health risks.",
      },
      {
        text: "Excellent work. Your commitment to your health regimen is commendable.",
        impact:
          "Consistent adherence like this significantly improves long-term health outcomes.",
      },
      {
        text: "Impressive adherence rate. Your dedication is clearly paying off.",
        impact:
          "This consistency ensures optimal medication effectiveness and symptom control.",
      },
      {
        text: "Remarkable consistency. You're managing your medications exceptionally well.",
        impact:
          "Your discipline minimizes health complications and promotes better treatment results.",
      },
    ];

    const averageMessages = [
      {
        text: "Your adherence is moderate. Small improvements could make a significant difference.",
        impact:
          "Missing doses occasionally reduces medication effectiveness by 20-30% and may lead to symptom breakthrough.",
      },
      {
        text: "Room for improvement. Consistency is key to achieving optimal health outcomes.",
        impact:
          "Irregular adherence can cause medication levels to fluctuate, reducing treatment effectiveness.",
      },
      {
        text: "You're on track but could benefit from better consistency.",
        impact:
          "Improving adherence from this level could prevent disease progression and complications.",
      },
    ];

    const lowMessages = [
      {
        text: "Critical: Your adherence requires immediate attention.",
        impact:
          "Missing this many doses significantly increases risk of hospitalization, disease complications, and treatment failure. Please contact your healthcare provider.",
      },
      {
        text: "Warning: Frequent missed doses are compromising your treatment.",
        impact:
          "Low adherence can lead to drug resistance, worsening symptoms, and serious health complications. Immediate action needed.",
      },
      {
        text: "Urgent: Your medication routine needs restructuring.",
        impact:
          "At this adherence level, medications lose most of their effectiveness, putting your health at serious risk.",
      },
    ];

    if (score >= 85) {
      const msg = goodMessages[Math.floor(Math.random() * goodMessages.length)];
      return { type: "good", ...msg };
    } else if (score >= 65) {
      const msg =
        averageMessages[Math.floor(Math.random() * averageMessages.length)];
      return { type: "average", ...msg };
    } else {
      const msg = lowMessages[Math.floor(Math.random() * lowMessages.length)];
      return { type: "low", ...msg };
    }
  }

  const getScoreColor = (score) => {
    if (score >= 85) return "from-green-500 to-emerald-600";
    if (score >= 65) return "from-amber-500 to-orange-600";
    return "from-red-500 to-rose-600";
  };

  const getScoreBg = (score) => {
    if (score >= 85) return "bg-green-50 border-green-200";
    if (score >= 65) return "bg-amber-50 border-amber-200";
    return "bg-red-50 border-red-200";
  };

  const getScoreText = (score) => {
    if (score >= 85) return "text-green-900";
    if (score >= 65) return "text-amber-900";
    return "text-red-900";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  Adherence Analytics
                </h1>
                <p className="text-sm text-gray-600 mt-0.5">
                  7-day medication adherence overview
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

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overall Score Card */}
        <div
          className={`bg-gradient-to-r ${getScoreColor(overallAdherence)} rounded-lg p-8 text-white mb-8 shadow-lg`}
        >
          <div className="text-center">
            <p className="text-white/90 text-sm mb-2 font-medium uppercase tracking-wide">
              Overall 7-Day Adherence
            </p>
            <p className="text-7xl font-bold mb-4">{overallAdherence}%</p>
            <p className="text-white/90 text-lg">
              {overallAdherence >= 85
                ? "Excellent"
                : overallAdherence >= 65
                  ? "Needs Improvement"
                  : "Critical"}
            </p>
          </div>
        </div>

        {/* Message Card */}
        <div
          className={`border-2 rounded-lg p-6 mb-8 ${getScoreBg(overallAdherence)}`}
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              {message.type === "good" ? (
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : message.type === "average" ? (
                <svg
                  className="w-8 h-8 text-amber-600"
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
              ) : (
                <svg
                  className="w-8 h-8 text-red-600"
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
              )}
            </div>
            <div className="flex-1">
              <h3
                className={`text-lg font-bold mb-2 ${getScoreText(overallAdherence)}`}
              >
                {message.text}
              </h3>
              <p className={`text-sm ${getScoreText(overallAdherence)}`}>
                <span className="font-semibold">Health Impact:</span>{" "}
                {message.impact}
              </p>
            </div>
          </div>
        </div>

        {/* Per-Medication Breakdown */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Medication Breakdown
          </h2>

          {medicationStats.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No medications tracked yet
            </p>
          ) : (
            <div className="space-y-4">
              {medicationStats.map((med) => {
                const adherence = med.stats.adherenceScore;
                return (
                  <div
                    key={med.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-gray-900">{med.name}</h3>
                        <p className="text-sm text-gray-600">{med.dosage}</p>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-2xl font-bold ${
                            adherence >= 85
                              ? "text-green-600"
                              : adherence >= 65
                                ? "text-amber-600"
                                : "text-red-600"
                          }`}
                        >
                          {adherence}%
                        </p>
                        <p className="text-xs text-gray-500">Adherence</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="bg-green-50 rounded p-2">
                        <p className="text-lg font-bold text-green-700">
                          {med.stats.taken}
                        </p>
                        <p className="text-xs text-green-600">Taken</p>
                      </div>
                      <div className="bg-gray-50 rounded p-2">
                        <p className="text-lg font-bold text-gray-700">
                          {med.stats.skipped}
                        </p>
                        <p className="text-xs text-gray-600">Skipped</p>
                      </div>
                      <div className="bg-amber-50 rounded p-2">
                        <p className="text-lg font-bold text-amber-700">
                          {med.stats.delayed}
                        </p>
                        <p className="text-xs text-amber-600">Delayed</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Health Impact Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-blue-900 mb-3">
            Understanding Medication Adherence
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex gap-2">
              <span className="font-semibold min-w-[80px]">85-100%:</span>
              <span>
                Optimal range. Medication works as intended, minimal health
                risks.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold min-w-[80px]">65-84%:</span>
              <span>
                Suboptimal. May experience symptom breakthrough and reduced
                effectiveness.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold min-w-[80px]">Below 65%:</span>
              <span>
                Critical. High risk of treatment failure, complications, and
                hospitalization.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
