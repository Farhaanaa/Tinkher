"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  loadMedications,
  getMedicationsNeedingRefill,
  predictRefillDate,
  updateMedication,
} from "@/lib/storage";
import { components } from "@/lib/theme";

export default function RefillAlerts() {
  const router = useRouter();
  const [allMedications, setAllMedications] = useState([]);
  const [refillNeeded, setRefillNeeded] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const meds = loadMedications().filter((m) => m.status === "active");
    setAllMedications(meds);
    setRefillNeeded(getMedicationsNeedingRefill(14)); // 14 days threshold
  };

  const handleRefill = (medicationId, newPillCount) => {
    updateMedication(medicationId, {
      currentPills: newPillCount,
      totalPills: newPillCount,
    });
    loadData();
  };

  const handleQuickRefill = (med) => {
    const pills = prompt(
      `How many pills did you refill for ${med.name}?`,
      med.totalPills || "30",
    );
    if (pills && !isNaN(pills)) {
      handleRefill(med.id, parseInt(pills));
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getUrgencyLevel = (days) => {
    if (days <= 0) return "critical";
    if (days <= 3) return "urgent";
    if (days <= 7) return "warning";
    return "normal";
  };

  const getUrgencyStyles = (level) => {
    const styles = {
      critical: {
        badge: "bg-red-100 text-red-700 border-red-300",
        text: "OUT OF STOCK",
        bg: "bg-red-50",
        border: "border-red-200",
      },
      urgent: {
        badge: "bg-red-50 text-red-600 border-red-200",
        text: "URGENT",
        bg: "bg-red-50",
        border: "border-red-200",
      },
      warning: {
        badge: "bg-amber-50 text-amber-600 border-amber-200",
        text: "SOON",
        bg: "bg-amber-50",
        border: "border-amber-200",
      },
      normal: {
        badge: "bg-blue-50 text-blue-600 border-blue-200",
        text: "UPCOMING",
        bg: "bg-blue-50",
        border: "border-blue-200",
      },
    };
    return styles[level];
  };

  const getStockPercentage = (current, total) => {
    return Math.min(100, (current / total) * 100);
  };

  const getStockColor = (percentage) => {
    if (percentage > 50) return "bg-green-600";
    if (percentage > 25) return "bg-amber-600";
    return "bg-red-600";
  };

  return (
    <div className={components.pageContainer}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className={components.contentContainer}>
          <div className="flex items-center gap-4 py-5">
            <button
              onClick={() => router.back()}
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Refill Management
              </h1>
              <p className="text-sm text-gray-600 mt-0.5">
                Track your medication inventory
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className={components.contentContainer}>
        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className={components.card + " p-6"}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">
                  Total Medications
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {allMedications.length}
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
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className={components.card + " p-6"}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">
                  Refills Needed
                </p>
                <p className="text-3xl font-bold text-amber-600">
                  {refillNeeded.length}
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
                  Urgent Refills
                </p>
                <p className="text-3xl font-bold text-red-600">
                  {refillNeeded.filter((m) => m.daysUntilRefill <= 3).length}
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
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Active Alerts */}
        {refillNeeded.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Active Refill Alerts
            </h3>
            <div className="grid gap-4">
              {refillNeeded.map((med) => {
                const urgency = getUrgencyLevel(med.daysUntilRefill);
                const styles = getUrgencyStyles(urgency);

                return (
                  <div
                    key={med.id}
                    className={`${components.card} p-6 border-l-4 ${styles.border} ${styles.bg}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">
                            {med.name}
                          </h4>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold border ${styles.badge}`}
                          >
                            {styles.text}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                          {med.dosage} · {med.condition}
                        </p>

                        {/* Stock Info */}
                        <div className="grid grid-cols-2 gap-6 mb-4">
                          <div>
                            <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">
                              Pills Remaining
                            </p>
                            <p className="text-2xl font-bold text-gray-900">
                              {med.currentPills}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">
                              Days Left
                            </p>
                            <p
                              className={`text-2xl font-bold ${
                                med.daysUntilRefill <= 0
                                  ? "text-red-600"
                                  : med.daysUntilRefill <= 3
                                    ? "text-red-600"
                                    : med.daysUntilRefill <= 7
                                      ? "text-amber-600"
                                      : "text-blue-600"
                              }`}
                            >
                              {med.daysUntilRefill <= 0
                                ? "0"
                                : med.daysUntilRefill}
                            </p>
                          </div>
                        </div>

                        <div className="text-sm text-gray-700">
                          <span className="font-semibold">Refill by:</span>{" "}
                          {formatDate(med.refillDate)}
                        </div>
                      </div>

                      {/* Action Button */}
                      <div>
                        <button
                          onClick={() => handleQuickRefill(med)}
                          className={components.button.primary + " text-sm"}
                        >
                          Mark Refilled
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* All Medications Inventory */}
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Medication Inventory
        </h3>

        {allMedications.length === 0 ? (
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
              No medications added yet
            </h3>
            <p className="text-gray-600 mb-6">
              Add your first medication to track inventory
            </p>
            <button
              onClick={() => router.push("/medications/add")}
              className={components.button.primary}
            >
              Add Medication
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {allMedications.map((med) => {
              const refillDate = predictRefillDate(med.id);
              const daysUntil = refillDate
                ? Math.ceil((refillDate - new Date()) / (1000 * 60 * 60 * 24))
                : null;
              const stockPercentage = getStockPercentage(
                med.currentPills,
                med.totalPills,
              );

              return (
                <div key={med.id} className={components.card + " p-6"}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">
                        {med.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {med.dosage} · {med.frequency.replace("_", " ")}
                      </p>
                    </div>

                    {daysUntil !== null && daysUntil <= 7 && (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          daysUntil <= 0
                            ? "bg-red-100 text-red-700"
                            : daysUntil <= 3
                              ? "bg-red-50 text-red-600"
                              : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {daysUntil <= 0 ? "OUT" : `${daysUntil}d left`}
                      </span>
                    )}
                  </div>

                  {/* Stock Display */}
                  <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-xs text-gray-600 uppercase tracking-wide">
                          Current Stock
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {med.currentPills}{" "}
                          <span className="text-sm font-normal text-gray-600">
                            / {med.totalPills} pills
                          </span>
                        </p>
                      </div>
                      {daysUntil !== null && (
                        <div className="text-right">
                          <p className="text-xs text-gray-600 uppercase tracking-wide">
                            Refill in
                          </p>
                          <p
                            className={`text-2xl font-bold ${
                              daysUntil <= 0
                                ? "text-red-600"
                                : daysUntil <= 7
                                  ? "text-amber-600"
                                  : "text-green-600"
                            }`}
                          >
                            {daysUntil <= 0 ? "Now" : `${daysUntil}d`}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full transition-all duration-500 ${getStockColor(
                          stockPercentage,
                        )}`}
                        style={{ width: `${stockPercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => handleQuickRefill(med)}
                    className={components.button.primary + " w-full text-sm"}
                  >
                    Mark Refilled
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Help Section */}
        <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-3">Refill Tips</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex gap-2">
              <span className="text-blue-600">•</span>
              <span>Order refills 7-10 days before running out</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600">•</span>
              <span>Keep your pharmacy contact information handy</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600">•</span>
              <span>Check if your insurance allows 90-day supplies</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600">•</span>
              <span>
                Set up automatic refills with your pharmacy if available
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
