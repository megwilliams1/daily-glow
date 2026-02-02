import { useState } from "react";

const THEMES = [
  {
    name: "Pink Dreams",
    id: "pink",
    gradient: "from-pink-300 to-purple-300",
    darkGradient: "from-pink-700 to-purple-700",
    bgLight: "from-pink-50 via-pink-100 to-purple-100",
    bgDark: "from-pink-950 via-purple-950 to-pink-900",
    accent: "pink",
    emoji: "💖",
  },
  {
    name: "Ocean Breeze",
    id: "blue",
    gradient: "from-blue-300 to-cyan-300",
    darkGradient: "from-blue-700 to-cyan-700",
    bgLight: "from-blue-50 via-cyan-100 to-blue-100",
    bgDark: "from-blue-950 via-cyan-950 to-blue-900",
    accent: "blue",
    emoji: "🌊",
  },
  {
    name: "Mint Fresh",
    id: "mint",
    gradient: "from-emerald-300 to-teal-300",
    darkGradient: "from-emerald-700 to-teal-700",
    bgLight: "from-emerald-50 via-teal-100 to-emerald-100",
    bgDark: "from-emerald-950 via-teal-950 to-emerald-900",
    accent: "emerald",
    emoji: "🍃",
  },
  {
    name: "Sunset Glow",
    id: "sunset",
    gradient: "from-orange-300 to-pink-300",
    darkGradient: "from-orange-700 to-pink-700",
    bgLight: "from-orange-50 via-pink-100 to-orange-100",
    bgDark: "from-orange-950 via-pink-950 to-orange-900",
    accent: "orange",
    emoji: "🌅",
  },
  {
    name: "Lavender Dream",
    id: "lavender",
    gradient: "from-purple-300 to-indigo-300",
    darkGradient: "from-purple-700 to-indigo-700",
    bgLight: "from-purple-50 via-indigo-100 to-purple-100",
    bgDark: "from-purple-950 via-indigo-950 to-purple-900",
    accent: "purple",
    emoji: "💜",
  },
  {
    name: "Peach Blossom",
    id: "peach",
    gradient: "from-rose-300 to-amber-300",
    darkGradient: "from-rose-700 to-amber-700",
    bgLight: "from-rose-50 via-amber-100 to-rose-100",
    bgDark: "from-rose-950 via-amber-950 to-rose-900",
    accent: "rose",
    emoji: "🍑",
  },
];

export default function ThemePicker({ currentTheme, onThemeChange }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-4 py-2 rounded-full bg-gradient-to-r ${THEMES.find((t) => t.id === currentTheme)?.gradient}
                   text-white font-semibold shadow-lg hover:scale-105 transition`}
      >
        🎨 Theme: {THEMES.find((t) => t.id === currentTheme)?.name}
      </button>

      {isOpen && (
        <div
          className="absolute top-full mt-2 left-0 bg-white dark:bg-neutral-800 
                        rounded-2xl shadow-2xl p-4 z-50 border-2 border-gray-200 
                        dark:border-neutral-700 min-w-[300px]"
        >
          <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
            Choose Your Theme 🎨
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {THEMES.map((theme) => (
              <button
                key={theme.id}
                onClick={() => {
                  onThemeChange(theme);
                  setIsOpen(false);
                }}
                className={`p-3 rounded-xl bg-gradient-to-r ${theme.gradient} 
                           hover:scale-105 transition shadow-md relative
                           ${currentTheme === theme.id ? "ring-4 ring-yellow-400" : ""}`}
              >
                <div className="text-2xl mb-1">{theme.emoji}</div>
                <div className="text-white font-medium text-sm">
                  {theme.name}
                </div>
                {currentTheme === theme.id && (
                  <div className="absolute top-1 right-1 text-yellow-400">
                    ✓
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
}

export { THEMES };
