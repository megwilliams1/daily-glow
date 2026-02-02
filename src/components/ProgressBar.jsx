export default function ProgressBar({ completed, total, theme }) {
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Today's Progress
        </p>
        <p
          className={`text-sm font-semibold text-${theme.accent}-600 dark:text-${theme.accent}-400`}
        >
          {completed} / {total} completed
        </p>
      </div>

      <div className="relative w-full h-6 bg-gray-200 dark:bg-neutral-700 rounded-full overflow-hidden shadow-inner">
        <div
          className={`h-full bg-gradient-to-r ${theme.gradient} 
                     rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-2`}
          style={{ width: `${percentage}%` }}
        >
          {percentage > 10 && (
            <span className="text-white text-xs font-bold drop-shadow">
              {Math.round(percentage)}%
            </span>
          )}
        </div>

        {/* Sparkle animation when complete */}
        {percentage === 100 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-2xl animate-bounce">✨</span>
          </div>
        )}
      </div>

      {/* Motivational message */}
      {percentage === 100 && (
        <p
          className={`text-center mt-2 text-sm font-medium text-${theme.accent}-600 dark:text-${theme.accent}-400 animate-pulse`}
        >
          🎉 Amazing! You completed all your habits today! 🎉
        </p>
      )}
      {percentage > 0 && percentage < 100 && (
        <p className="text-center mt-2 text-xs text-gray-500 dark:text-gray-400">
          Keep going! You're doing great! 💪
        </p>
      )}
      {percentage === 0 && total > 0 && (
        <p className="text-center mt-2 text-xs text-gray-500 dark:text-gray-400">
          Start your day strong! ☀️
        </p>
      )}
    </div>
  );
}
