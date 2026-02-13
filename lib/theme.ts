// Design System - Professional & Minimal
export const theme = {
  colors: {
    primary: {
      50: "#eff6ff",
      100: "#dbeafe",
      500: "#3b82f6",
      600: "#2563eb",
      700: "#1d4ed8",
    },
    success: {
      50: "#f0fdf4",
      100: "#dcfce7",
      500: "#22c55e",
      600: "#16a34a",
    },
    warning: {
      50: "#fffbeb",
      100: "#fef3c7",
      500: "#f59e0b",
      600: "#d97706",
    },
    danger: {
      50: "#fef2f2",
      100: "#fee2e2",
      500: "#ef4444",
      600: "#dc2626",
    },
    gray: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
    },
  },
};

export const components = {
  card: "bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200",
  cardClickable:
    "bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-200 cursor-pointer",
  button: {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-md transition-colors duration-200",
    success:
      "bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2.5 rounded-md transition-colors duration-200",
    warning:
      "bg-amber-600 hover:bg-amber-700 text-white font-medium px-5 py-2.5 rounded-md transition-colors duration-200",
    danger:
      "bg-red-600 hover:bg-red-700 text-white font-medium px-5 py-2.5 rounded-md transition-colors duration-200",
    secondary:
      "bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-5 py-2.5 rounded-md transition-colors duration-200",
  },
  badge: {
    success:
      "bg-green-100 text-green-700 px-2.5 py-1 rounded text-xs font-semibold uppercase tracking-wide",
    warning:
      "bg-amber-100 text-amber-700 px-2.5 py-1 rounded text-xs font-semibold uppercase tracking-wide",
    danger:
      "bg-red-100 text-red-700 px-2.5 py-1 rounded text-xs font-semibold uppercase tracking-wide",
    info: "bg-blue-100 text-blue-700 px-2.5 py-1 rounded text-xs font-semibold uppercase tracking-wide",
    gray: "bg-gray-100 text-gray-700 px-2.5 py-1 rounded text-xs font-semibold uppercase tracking-wide",
  },
  input:
    "w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200",
  label: "block text-sm font-semibold text-gray-700 mb-1.5",
  pageContainer: "min-h-screen bg-gray-50",
  contentContainer: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
};
