// Design System - Color Palette & Styles
export const theme = {
  colors: {
    // Primary - Medical Blue
    primary: {
      50: "#eff6ff",
      100: "#dbeafe",
      200: "#bfdbfe",
      300: "#93c5fd",
      400: "#60a5fa",
      500: "#3b82f6",
      600: "#2563eb",
      700: "#1d4ed8",
      800: "#1e40af",
      900: "#1e3a8a",
    },
    // Success - Green
    success: {
      50: "#f0fdf4",
      100: "#dcfce7",
      500: "#22c55e",
      600: "#16a34a",
      700: "#15803d",
    },
    // Warning - Amber
    warning: {
      50: "#fffbeb",
      100: "#fef3c7",
      500: "#f59e0b",
      600: "#d97706",
    },
    // Danger - Red
    danger: {
      50: "#fef2f2",
      100: "#fee2e2",
      500: "#ef4444",
      600: "#dc2626",
      700: "#b91c1c",
    },
    // Neutral - Gray
    gray: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
    },
  },

  // Shadows
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
  },

  // Border radius
  radius: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    "2xl": "1.5rem",
  },

  // Spacing (consistent gaps)
  spacing: {
    xs: "0.5rem",
    sm: "0.75rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
  },
};

// Reusable component classes
export const components = {
  card: "bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200",
  cardClickable:
    "bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer",
  button: {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2.5 rounded-lg transition-colors duration-200 shadow-sm",
    success:
      "bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2.5 rounded-lg transition-colors duration-200 shadow-sm",
    warning:
      "bg-amber-500 hover:bg-amber-600 text-white font-medium px-4 py-2.5 rounded-lg transition-colors duration-200 shadow-sm",
    danger:
      "bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2.5 rounded-lg transition-colors duration-200 shadow-sm",
    secondary:
      "bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-4 py-2.5 rounded-lg transition-colors duration-200",
  },
  badge: {
    success:
      "bg-green-100 text-green-800 px-3 py-1.5 rounded-full text-sm font-medium",
    warning:
      "bg-amber-100 text-amber-800 px-3 py-1.5 rounded-full text-sm font-medium",
    danger:
      "bg-red-100 text-red-800 px-3 py-1.5 rounded-full text-sm font-medium",
    info: "bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium",
    gray: "bg-gray-100 text-gray-800 px-3 py-1.5 rounded-full text-sm font-medium",
  },
  input:
    "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200",
  label: "block text-sm font-semibold text-gray-700 mb-2",
  pageContainer:
    "min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50",
  contentContainer: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
};
