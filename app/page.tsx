"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">MediMind</h1>
              <p className="text-sm text-gray-600 mt-0.5">
                Medication Adherence Tracker
              </p>
            </div>
            <button
              onClick={() => router.push("/dashboard")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-md transition-colors duration-200"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl py-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Take Control of Your Medication Management
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              MediMind helps you track medications, monitor adherence, and
              receive timely refill alerts. A simple, professional tool for
              better health outcomes.
            </p>
            <button
              onClick={() => router.push("/medications/add")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 text-lg rounded-md transition-colors duration-200"
            >
              Add Your First Medication
            </button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Features</h3>
          <p className="text-gray-600">
            Everything you need to manage your medications effectively
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 - Dashboard */}
          
            href="/dashboard"
            className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-200 p-6 block"
          >
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
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
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Medications
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              Track your medications, dosages, and schedules in one place
            </p>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Manage
              </span>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </a>

          {/* Card 2 - Adherence */}
          
            href="/adherence"
            className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-200 p-6 block"
          >
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Adherence Score
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              Monitor your medication adherence with detailed analytics
            </p>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Track
              </span>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </a>

          {/* Card 3 - Refill */}
          
            href="/refill"
            className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-200 p-6 block"
          >
            <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center mb-4">
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
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Refill Alerts
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              Receive timely notifications when medications need refilling
            </p>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Alerts
              </span>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </a>

          {/* Card 4 - Side Effects */}
          
            href="/side-effects"
            className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-200 p-6 block"
          >
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-purple-600"
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
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Side Effects
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              Log and track side effects to share with your healthcare provider
            </p>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Log
              </span>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </a>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 py-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">Track</div>
              <p className="text-gray-600">Medication schedules and dosages</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                Monitor
              </div>
              <p className="text-gray-600">Adherence scores and patterns</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">Alert</div>
              <p className="text-gray-600">Refill reminders and warnings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}