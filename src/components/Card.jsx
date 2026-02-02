import { useState, useCallback, useEffect } from "react";

const CONFETTI_COLORS = [
  "#ff6b9d",
  "#ffd93d",
  "#6bcb77",
  "#4d96ff",
  "#ff8e53",
  "#a855f7",
];

const PARTICLE_COUNT = 20;

function createParticle(index) {
  const angle = (index / PARTICLE_COUNT) * 360 + Math.random() * 30;
  const velocity = 60 + Math.random() * 80;
  const color =
    CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
  const size = 6 + Math.random() * 6;
  const rotation = Math.random() * 360;

  return {
    id: index,
    angle,
    velocity,
    color,
    size,
    rotation,
    shape: Math.random() > 0.5 ? "circle" : "rect",
  };
}

export default function Card({ title, emoji, onDelete, onEdit, theme }) {
  const [done, setDone] = useState(() => {
    const saved = localStorage.getItem(`done-${title}`);
    const savedDate = localStorage.getItem(`doneDate-${title}`);
    const today = new Date().toDateString();
    
    // Reset done if it's a new day
    if (savedDate !== today) {
      return false;
    }
    return saved === "true";
  });

  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem(`streak-${title}`);
    return saved ? Number(saved) : 0;
  });

  const [lastCompleted, setLastCompleted] = useState(() => {
    const saved = localStorage.getItem(`lastCompleted-${title}`);
    return saved || null;
  });

  const [particles, setParticles] = useState([]);
  const [animating, setAnimating] = useState(false);
  const [showActions, setShowActions] = useState(false);

  // Save done state AND the date
  useEffect(() => {
    localStorage.setItem(`done-${title}`, done);
    if (done) {
      const today = new Date().toDateString();
      localStorage.setItem(`doneDate-${title}`, today);
    }
  }, [done, title]);

  // Save streak
  useEffect(() => {
    localStorage.setItem(`streak-${title}`, streak);
  }, [streak, title]);

  // Save lastCompleted date
  useEffect(() => {
    if (lastCompleted) {
      localStorage.setItem(`lastCompleted-${title}`, lastCompleted);
    }
  }, [lastCompleted, title]);

  const handleClick = useCallback(() => {
    const newDoneState = !done;
    setDone(newDoneState);

    if (newDoneState) {
      const today = new Date().toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString();

      // Only update streak once per day
      if (lastCompleted === today) {
        // Already completed today, just show animation
      } else if (lastCompleted === yesterday || lastCompleted === null) {
        // Consecutive day or first time - increase streak
        setStreak((prev) => prev + 1);
      } else {
        // Missed a day - reset to 1
        setStreak(1);
      }

      setLastCompleted(today);

      // Show confetti animation
      const newParticles = Array.from({ length: PARTICLE_COUNT }, (_, i) =>
        createParticle(i),
      );
      setParticles(newParticles);
      setAnimating(true);

      setTimeout(() => {
        setParticles([]);
        setAnimating(false);
      }, 800);
    }
  }, [done, lastCompleted]);

  // Get completed background based on theme
  const getCompletedBg = () => {
    const themeColors = {
      pink: 'bg-pink-100 dark:bg-pink-900',
      blue: 'bg-blue-100 dark:bg-blue-900',
      mint: 'bg-emerald-100 dark:bg-emerald-900',
      sunset: 'bg-orange-100 dark:bg-orange-900',
      lavender: 'bg-purple-100 dark:bg-purple-900',
      peach: 'bg-rose-100 dark:bg-rose-900'
    };
    return themeColors[theme?.id] || themeColors.pink;
  };

  return (
    <div
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      className={`relative overflow-visible rounded-2xl p-4 shadow-md cursor-pointer transition
        ${
          done
            ? `${getCompletedBg()} scale-105`
            : "bg-white dark:bg-neutral-800 hover:-translate-y-1"
        }`}
    >
      {/* Action buttons - show on hover */}
      {showActions && (
        <div className="absolute top-2 left-2 flex gap-1 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.();
            }}
            className="bg-blue-400 hover:bg-blue-500 text-white w-7 h-7 rounded-full 
                       flex items-center justify-center text-sm shadow-lg transition"
            title="Edit habit"
          >
            ✏️
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (window.confirm(`Delete "${title}"?`)) {
                onDelete?.();
              }
            }}
            className="bg-red-400 hover:bg-red-500 text-white w-7 h-7 rounded-full 
                       flex items-center justify-center text-sm shadow-lg transition"
            title="Delete habit"
          >
            🗑️
          </button>
        </div>
      )}

      {/* Streak badge */}
      {streak > 0 && (
        <div
          className="absolute top-3 right-3
                        bg-orange-400 text-white
                        text-xs px-2 py-1 rounded-full shadow"
        >
          🔥 {streak}
        </div>
      )}

      <div onClick={handleClick}>
        <h2 className="text-xl text-gray-800 dark:text-gray-200">
          {emoji} {title}
        </h2>

        <p className="mt-2 text-gray-600 dark:text-gray-300">
          {done ? "Completed!" : "Not yet"}
        </p>

        {streak > 0 && (
          <div
            className="mt-2 inline-flex items-center gap-1
                        bg-orange-100 dark:bg-orange-900
                        text-orange-600 dark:text-orange-300
                        px-3 py-1 rounded-full text-sm"
          >
            🔥 {streak} day streak
          </div>
        )}
      </div>

      {animating &&
        particles.map((particle) => {
          const rad = (particle.angle * Math.PI) / 180;
          const x = Math.cos(rad) * particle.velocity;
          const y = Math.sin(rad) * particle.velocity;

          return (
            <span
              key={particle.id}
              className="pointer-events-none absolute left-1/2 top-1/2"
              style={{
                width: particle.size,
                height:
                  particle.shape === "circle"
                    ? particle.size
                    : particle.size * 0.6,
                backgroundColor: particle.color,
                borderRadius: particle.shape === "circle" ? "50%" : "2px",
                transform: `rotate(${particle.rotation}deg)`,
                animation: "confetti 0.8s ease-out forwards",
                "--x": `${Math.cos((particle.angle * Math.PI) / 180) * particle.velocity}px`,
                "--y": `${Math.sin((particle.angle * Math.PI) / 180) * particle.velocity}px`,
              }}
            />
          );
        })}

      <style>{`
        @keyframes confetti {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y))) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}