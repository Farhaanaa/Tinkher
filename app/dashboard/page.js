"use client";

import { useRouter } from "next/navigation";
import { components } from "@/lib/theme";

export default function Home() {
  const router = useRouter();

  const features = [
    {
      title: "Medications",
      description:
        "Track your medications, dosages, and schedules in one place",
      icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
      link: "/medications/add",
      stat: "Manage",
      colorBg: "bg-blue-100",
      colorHover: "group-hover:bg-blue-200",
      colorIcon: "text-blue-600",
    },
    {
      title: "Adherence Score",
      description: "Monitor your medication adherence with detailed analytics",
      icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
      link: "/adherence", // ← CHANGED FROM /dashboard TO /adherence
      stat: "Track",
      colorBg: "bg-green-100",
      colorHover: "group-hover:bg-green-200",
      colorIcon: "text-green-600",
    },
    {
      title: "Refill Alerts",
      description:
        "Receive timely notifications when medications need refilling",
      icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
      link: "/refill",
      stat: "Alerts",
      colorBg: "bg-amber-100",
      colorHover: "group-hover:bg-amber-200",
      colorIcon: "text-amber-600",
    },
    {
      title: "Side Effects",
      description:
        "Log and track side effects to share with your healthcare provider",
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
      link: "/side-effects",
      stat: "Log",
      colorBg: "bg-purple-100",
      colorHover: "group-hover:bg-purple-200",
      colorIcon: "text-purple-600",
    },
  ];

  return (
    <div className={components.pageContainer}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className={components.contentContainer}>
          <div className="flex justify-between items-center py-5">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">MediMind</h1>
              <p className="text-sm text-gray-600 mt-0.5">
                Medication Adherence Tracker
              </p>
            </div>
            <button
              onClick={() => router.push("/dashboard")}
              className={components.button.primary}
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className={components.contentContainer}>
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
              className={components.button.primary + " text-lg px-8 py-3"}
            >
              Add Your First Medication
            </button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className={components.contentContainer}>
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Features</h3>
          <p className="text-gray-600">
            Everything you need to manage your medications effectively
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <button
              key={index}
              onClick={() => router.push(feature.link)}
              className={`${components.cardClickable} p-6 text-left group`}
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-lg ${feature.colorBg} ${feature.colorHover} flex items-center justify-center mb-4 transition-colors duration-200`}
              >
                <svg
                  className={`w-6 h-6 ${feature.colorIcon}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={feature.icon}
                  />
                </svg>
              </div>

              {/* Content */}
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                {feature.description}
              </p>

              {/* Action */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {feature.stat}
                </span>
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200"
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
            </button>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white border-t border-gray-200 mt-16">
        <div className={components.contentContainer}>
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
