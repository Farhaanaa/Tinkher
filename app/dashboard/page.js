"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  loadMedications,
  loadDoseLogs,
  saveDoseLogs,
  saveMedications,
  generateId,
  deleteMedication,
} from "@/lib/storage";

export default function Dashboard() {
  const router = useRouter();
  const [medications, setMedications] = useState([]);
  const [doseLogs, setDoseLogs] = useState([]);
  const [adherence, setAdherence] = useState(100);

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    const meds = loadMedications();
    const logs = loadDoseLogs();
    setMedications(meds);
    setDoseLogs(logs);
    calculateAdherence(logs);
  }

  function handleDelete(medicationId) {
    if (confirm("Are you sure you want to delete this medication?")) {
      deleteMedication(medicationId);
      loadData();
    }
  }

  function calculateAdherence(logs) {
    const last7Days = logs.filter((log) => {
      const logDate = new Date(log.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return logDate >= weekAgo;
    });

    if (last7Days.length === 0) {
      setAdherence(100);
      return;
    }

    const taken = last7Days.filter((l) => l.status === "taken").length;
    const score = Math.round((taken / last7Days.length) * 100);
    setAdherence(score);
  }

  function logDose(medication, status) {
    const log = {
      id: generateId(),
      medicationId: medication.id,
      medicationName: medication.name,
      date: new Date().toISOString(),
      status: status,
    };

    const updatedLogs = [...doseLogs, log];
    saveDoseLogs(updatedLogs);

    if (status === "taken") {
      const updatedMeds = medications.map((med) => {
        if (med.id === medication.id) {
          return { ...med, currentPills: med.currentPills - med.pillsPerDose };
        }
        return med;
      });
      saveMedications(updatedMeds);
      setMedications(updatedMeds);
    }

    loadData();
  }

  function getDaysLeft(medication) {
    const { currentPills, pillsPerDose, frequency } = medication;
    const dosesPerDay =
      frequency === "once_daily"
        ? 1
        : frequency === "twice_daily"
          ? 2
          : frequency === "three_times"
            ? 3
            : 4;
    const pillsPerDay = pillsPerDose * dosesPerDay;
    return Math.floor(currentPills / pillsPerDay);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
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
            <h1 className="text-2xl font-bold text-gray-800">
              MediMind Dashboard
            </h1>
          </div>
          <button
            onClick={() => router.push("/medications/add")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            + Add Medication
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Adherence Score */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white mb-8 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm mb-2">
                7-Day Adherence Score
              </p>
              <p className="text-6xl font-bold">{adherence}%</p>
              <p className="mt-2 text-blue-100">
                {adherence >= 80
                  ? "Great job!"
                  : adherence >= 60
                    ? "Keep going!"
                    : "Need improvement"}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-100">Total Medications</p>
              <p className="text-4xl font-bold">{medications.length}</p>
            </div>
          </div>
        </div>

        {/* Medications */}
        {medications.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <p className="text-gray-500 text-lg mb-4">No medications yet</p>
            <button
              onClick={() => router.push("/medications/add")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Add Your First Medication
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {medications.map((med) => {
              const daysLeft = getDaysLeft(med);
              const isLow = daysLeft <= 7;
              const todayLog = doseLogs.find(
                (log) =>
                  log.medicationId === med.id &&
                  new Date(log.date).toDateString() ===
                    new Date().toDateString(),
              );

              return (
                <div key={med.id} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">
                        {med.name}
                      </h3>
                      <p className="text-gray-600">{med.dosage}</p>
                      {med.condition && (
                        <p className="text-sm text-gray-500 mt-1">
                          {med.condition}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <div
                        className={`px-4 py-2 rounded-lg ${isLow ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}
                      >
                        <p className="text-sm font-medium">
                          {daysLeft} days left
                        </p>
                        <p className="text-xs">{med.currentPills} pills</p>
                      </div>

                      <button
                        onClick={() => handleDelete(med.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title="Delete medication"
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

                  <div className="flex items-center justify-between">
                    <p className="text-gray-600">Take at: {med.times[0]}</p>

                    {todayLog ? (
                      <div
                        className={`px-4 py-2 rounded-lg ${
                          todayLog.status === "taken"
                            ? "bg-green-100 text-green-800"
                            : todayLog.status === "skipped"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        <p className="font-medium capitalize">
                          {todayLog.status}
                        </p>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => logDose(med, "taken")}
                          className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition"
                        >
                          Taken
                        </button>
                        <button
                          onClick={() => logDose(med, "skipped")}
                          className="bg-gray-400 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-500 transition"
                        >
                          Skip
                        </button>
                        <button
                          onClick={() => logDose(med, "delayed")}
                          className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-600 transition"
                        >
                          Delayed
                        </button>
                      </div>
                    )}
                  </div>

                  {isLow && (
                    <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-3 rounded">
                      <p className="text-red-800 font-medium text-sm">
                        Refill needed soon! Only {daysLeft} days of medication
                        left.
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
