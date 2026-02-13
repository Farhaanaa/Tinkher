"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveMedications, loadMedications, generateId } from "@/lib/storage";

export default function AddMedication() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    dosage: "",
    condition: "",
    frequency: "once_daily",
    time: "09:00",
    pillsPerDose: 1,
    totalPills: 30,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMed = {
      id: generateId(),
      ...form,
      currentPills: form.totalPills,
      startDate: new Date().toISOString(),
    };

    const medications = loadMedications();
    medications.push(newMed);
    saveMedications(medications);

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Add Medication
          </h1>
          <p className="text-gray-600 mb-8">Enter your medication details</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Medication Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Medication Name *
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g., Metformin"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
              />
            </div>

            {/* Dosage */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Dosage *
              </label>
              <input
                type="text"
                required
                value={form.dosage}
                onChange={(e) => setForm({ ...form, dosage: e.target.value })}
                placeholder="e.g., 500mg"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
              />
            </div>

            {/* Condition */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                What is this for?
              </label>
              <input
                type="text"
                value={form.condition}
                onChange={(e) =>
                  setForm({ ...form, condition: e.target.value })
                }
                placeholder="e.g., Type 2 Diabetes"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
              />
            </div>

            {/* Frequency */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                How often? *
              </label>
              <select
                value={form.frequency}
                onChange={(e) =>
                  setForm({ ...form, frequency: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
              >
                <option value="once_daily">Once daily</option>
                <option value="twice_daily">Twice daily</option>
                <option value="three_times">Three times daily</option>
              </select>
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                What time? *
              </label>
              <input
                type="time"
                required
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
              />
            </div>

            {/* Pills */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Pills per dose *
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={form.pillsPerDose}
                  onChange={(e) =>
                    setForm({ ...form, pillsPerDose: parseInt(e.target.value) })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Total pills *
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={form.totalPills}
                  onChange={(e) =>
                    setForm({ ...form, totalPills: parseInt(e.target.value) })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition shadow-lg"
            >
              Add Medication
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
