import { useState, useEffect } from "react";

export default function HeatmapView({ habits, theme }) {
  const [hoveredDay, setHoveredDay] = useState(null);
  const [selectedView, setSelectedView] = useState("month"); // 'week' or 'month'
  const [isExpanded, setIsExpanded] = useState(false); // Collapsed by default

  // Get last 60 days for heatmap
  const getLast60Days = () => {
    const days = [];
    for (let i = 59; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date);
    }
    return days;
  };

  // Get completion percentage for a specific day
  const getCompletionForDay = (date) => {
    if (habits.length === 0) return 0;

    const dateString = date.toDateString();
    let completed = 0;

    habits.forEach((habit) => {
      const doneDate = localStorage.getItem(`doneDate-${habit.title}`);
      const isDone = localStorage.getItem(`done-${habit.title}`) === "true";

      if (isDone && doneDate === dateString) {
        completed++;
      }
    });

    return Math.round((completed / habits.length) * 100);
  };

  // Get color based on percentage and theme
  const getHeatColor = (percentage) => {
    const colors = {
      pink: {
        0: "bg-gray-100 dark:bg-neutral-800",
        25: "bg-pink-200 dark:bg-pink-900/50",
        50: "bg-pink-400 dark:bg-pink-700",
        75: "bg-pink-600 dark:bg-pink-600",
        100: "bg-pink-700 dark:bg-pink-500",
      },
      blue: {
        0: "bg-gray-100 dark:bg-neutral-800",
        25: "bg-blue-200 dark:bg-blue-900/50",
        50: "bg-blue-400 dark:bg-blue-700",
        75: "bg-blue-600 dark:bg-blue-600",
        100: "bg-blue-700 dark:bg-blue-500",
      },
      mint: {
        0: "bg-gray-100 dark:bg-neutral-800",
        25: "bg-emerald-200 dark:bg-emerald-900/50",
        50: "bg-emerald-400 dark:bg-emerald-700",
        75: "bg-emerald-600 dark:bg-emerald-600",
        100: "bg-emerald-700 dark:bg-emerald-500",
      },
      sunset: {
        0: "bg-gray-100 dark:bg-neutral-800",
        25: "bg-orange-200 dark:bg-orange-900/50",
        50: "bg-orange-400 dark:bg-orange-700",
        75: "bg-orange-600 dark:bg-orange-600",
        100: "bg-orange-700 dark:bg-orange-500",
      },
      lavender: {
        0: "bg-gray-100 dark:bg-neutral-800",
        25: "bg-purple-200 dark:bg-purple-900/50",
        50: "bg-purple-400 dark:bg-purple-700",
        75: "bg-purple-600 dark:bg-purple-600",
        100: "bg-purple-700 dark:bg-purple-500",
      },
      peach: {
        0: "bg-gray-100 dark:bg-neutral-800",
        25: "bg-rose-200 dark:bg-rose-900/50",
        50: "bg-rose-400 dark:bg-rose-700",
        75: "bg-rose-600 dark:bg-rose-600",
        100: "bg-rose-700 dark:bg-rose-500",
      },
    };

    const themeColors = colors[theme?.id] || colors.pink;

    if (percentage === 0) return themeColors[0];
    if (percentage <= 25) return themeColors[25];
    if (percentage <= 50) return themeColors[50];
    if (percentage <= 75) return themeColors[75];
    return themeColors[100];
  };

  // Get emoji based on percentage
  const getEmoji = (percentage) => {
    if (percentage === 0) return "○";
    if (percentage <= 25) return "◔";
    if (percentage <= 50) return "◑";
    if (percentage <= 75) return "◕";
    return "●";
  };

  // Group days by week
  const groupByWeeks = (days) => {
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }
    return weeks;
  };

  const days60 = getLast60Days();
  const weeks = groupByWeeks(days60);

  // Calculate stats
  const totalDays = days60.length;
  const perfectDays = days60.filter(
    (day) => getCompletionForDay(day) === 100,
  ).length;
  const currentStreak = (() => {
    let streak = 0;
    for (let i = days60.length - 1; i >= 0; i--) {
      if (getCompletionForDay(days60[i]) === 100) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  })();

  const bestWeek = (() => {
    let best = 0;
    weeks.forEach((week) => {
      const weekPerf =
        week.reduce((sum, day) => sum + getCompletionForDay(day), 0) /
        week.length;
      if (weekPerf > best) best = weekPerf;
    });
    return Math.round(best);
  })();

  return (
    <div className="mb-6">
      {/* Collapsible Header - Always Visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full bg-gradient-to-r ${theme.gradient} rounded-2xl p-4 shadow-lg 
                   hover:scale-[1.02] transition-all duration-300 flex items-center justify-between
                   text-white`}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{isExpanded ? "📊" : "🔥"}</span>
          <div className="text-left">
            <h3 className="text-lg font-bold">Your Habit Heatmap</h3>
            <p className="text-sm opacity-90">
              {currentStreak} day streak • {perfectDays} perfect days
            </p>
          </div>
        </div>
        <div
          className="text-2xl transition-transform duration-300"
          style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          ▼
        </div>
      </button>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="mt-4 animate-in slide-in-from-top duration-300">
          {/* View Toggle */}
          <div className="flex justify-end gap-2 mb-4">
            <button
              onClick={() => setSelectedView("week")}
              className={`px-3 py-1 rounded-full text-sm transition ${
                selectedView === "week"
                  ? `bg-gradient-to-r ${theme.gradient} text-white`
                  : "bg-gray-200 dark:bg-neutral-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setSelectedView("month")}
              className={`px-3 py-1 rounded-full text-sm transition ${
                selectedView === "month"
                  ? `bg-gradient-to-r ${theme.gradient} text-white`
                  : "bg-gray-200 dark:bg-neutral-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              2 Months
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <div
              className={`bg-gradient-to-br ${theme.gradient} bg-opacity-20 rounded-xl p-3 text-center`}
            >
              <div className="text-2xl font-bold text-gray-800 dark:text-white">
                {currentStreak}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300">
                Current Streak 🔥
              </div>
            </div>
            <div
              className={`bg-gradient-to-br ${theme.gradient} bg-opacity-20 rounded-xl p-3 text-center`}
            >
              <div className="text-2xl font-bold text-gray-800 dark:text-white">
                {perfectDays}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300">
                Perfect Days ✨
              </div>
            </div>
            <div
              className={`bg-gradient-to-br ${theme.gradient} bg-opacity-20 rounded-xl p-3 text-center`}
            >
              <div className="text-2xl font-bold text-gray-800 dark:text-white">
                {bestWeek}%
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300">
                Best Week 🏆
              </div>
            </div>
            <div
              className={`bg-gradient-to-br ${theme.gradient} bg-opacity-20 rounded-xl p-3 text-center`}
            >
              <div className="text-2xl font-bold text-gray-800 dark:text-white">
                {Math.round((perfectDays / totalDays) * 100)}%
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300">
                Success Rate 💖
              </div>
            </div>
          </div>

          {/* Heatmap */}
          <div className="bg-white dark:bg-neutral-800 rounded-2xl p-4 shadow-lg border-2 border-gray-200 dark:border-neutral-700">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full">
                {/* Day labels */}
                <div className="flex mb-2">
                  <div className="w-12"></div>
                  <div className="flex gap-1 flex-1">
                    {selectedView === "week"
                      ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                          (day, i) => (
                            <div
                              key={i}
                              className="flex-1 text-center text-xs text-gray-500 dark:text-gray-400 min-w-[30px]"
                            >
                              {day}
                            </div>
                          ),
                        )
                      : weeks[0]?.map((_, i) =>
                          i % 7 === 0 ? (
                            <div
                              key={i}
                              className="flex-1 text-center text-xs text-gray-500 dark:text-gray-400 min-w-[12px]"
                            >
                              {/* Month markers */}
                            </div>
                          ) : null,
                        )}
                  </div>
                </div>

                {/* Heatmap grid */}
                <div className="space-y-1">
                  {weeks
                    .slice(selectedView === "week" ? -1 : 0)
                    .map((week, weekIdx) => (
                      <div key={weekIdx} className="flex gap-1">
                        <div className="w-12 text-xs text-gray-500 dark:text-gray-400 flex items-center">
                          {weekIdx === 0 && selectedView === "month"
                            ? "Week"
                            : ""}
                        </div>
                        <div className="flex gap-1 flex-1">
                          {week.map((day, dayIdx) => {
                            const percentage = getCompletionForDay(day);
                            const dateKey = day.toDateString();
                            const isToday =
                              dateKey === new Date().toDateString();

                            return (
                              <div
                                key={dayIdx}
                                className="flex-1 min-w-[30px] sm:min-w-[40px]"
                                onMouseEnter={() => setHoveredDay(dateKey)}
                                onMouseLeave={() => setHoveredDay(null)}
                              >
                                <div
                                  className={`aspect-square rounded-lg ${getHeatColor(percentage)} 
                                           transition-all duration-200 hover:scale-110 hover:shadow-lg
                                           flex items-center justify-center text-xs sm:text-sm
                                           ${isToday ? "ring-2 ring-yellow-400 ring-offset-2 dark:ring-offset-neutral-800" : ""}
                                           cursor-pointer relative`}
                                >
                                  {selectedView === "week" && (
                                    <span className="text-white font-bold drop-shadow">
                                      {getEmoji(percentage)}
                                    </span>
                                  )}

                                  {/* Tooltip */}
                                  {hoveredDay === dateKey && (
                                    <div
                                      className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 
                                                bg-gray-900 text-white text-xs rounded-lg px-3 py-2 
                                                whitespace-nowrap z-50 shadow-xl"
                                    >
                                      <div className="font-semibold">
                                        {day.toLocaleDateString("en-US", {
                                          month: "short",
                                          day: "numeric",
                                        })}
                                      </div>
                                      <div>
                                        {Math.round(
                                          (percentage / 100) * habits.length,
                                        )}
                                        /{habits.length} habits
                                      </div>
                                      <div className="text-gray-300">
                                        {percentage}% complete
                                      </div>
                                      <div
                                        className="absolute top-full left-1/2 transform -translate-x-1/2 
                                                  border-4 border-transparent border-t-gray-900"
                                      ></div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-600 dark:text-gray-400">
              <span>Less</span>
              <div className="flex gap-1">
                <div className={`w-4 h-4 rounded ${getHeatColor(0)}`}></div>
                <div className={`w-4 h-4 rounded ${getHeatColor(25)}`}></div>
                <div className={`w-4 h-4 rounded ${getHeatColor(50)}`}></div>
                <div className={`w-4 h-4 rounded ${getHeatColor(75)}`}></div>
                <div className={`w-4 h-4 rounded ${getHeatColor(100)}`}></div>
              </div>
              <span>More</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
