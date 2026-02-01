import { useState, useCallback } from "react"

const CONFETTI_COLORS = [
  '#ff6b9d', // pink
  '#ffd93d', // yellow
  '#6bcb77', // green
  '#4d96ff', // blue
  '#ff8e53', // orange
  '#a855f7', // purple
]

const PARTICLE_COUNT = 20

function createParticle(index) {
  const angle = (index / PARTICLE_COUNT) * 360 + Math.random() * 30
  const velocity = 60 + Math.random() * 80
  const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)]
  const size = 6 + Math.random() * 6
  const rotation = Math.random() * 360

  return {
    id: index,
    angle,
    velocity,
    color,
    size,
    rotation,
    shape: Math.random() > 0.5 ? 'circle' : 'rect'
  }
}

export default function Card({ title, emoji }) {
  const [done, setDone] = useState(false)
  const [particles, setParticles] = useState([])
  const [animating, setAnimating] = useState(false)

  const handleClick = useCallback(() => {
    const wasNotDone = !done
    setDone(!done)

    // Only burst confetti when marking as complete (not when uncompleting)
    if (wasNotDone) {
      const newParticles = Array.from({ length: PARTICLE_COUNT }, (_, i) => createParticle(i))
      setParticles(newParticles)
      setAnimating(true)

      // Clean up particles after animation
      setTimeout(() => {
        setParticles([])
        setAnimating(false)
      }, 800)
    }
  }, [done])

  return (
    <div
      onClick={handleClick}
      className={`relative overflow-visible rounded-2xl p-4 shadow-md cursor-pointer transition
        ${done
          ? "bg-pink-100 dark:bg-pink-900 scale-105"
          : "bg-white dark:bg-neutral-800 hover:-translate-y-1"}`}
    >
      <h2 className="text-xl text-gray-800 dark:text-gray-200">
        {emoji} {title}
      </h2>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        {done ? "Completed!" : "Not yet"}
      </p>
      {done && (
        <span className="block mt-2 animate-pulse text-yellow-400">
          ✨✨✨
        </span>
      )}

      {/* Confetti particles */}
      {animating && particles.map((particle) => {
        const rad = (particle.angle * Math.PI) / 180
        const x = Math.cos(rad) * particle.velocity
        const y = Math.sin(rad) * particle.velocity

        return (
          <span
            key={particle.id}
            className="pointer-events-none absolute left-1/2 top-1/2"
            style={{
              width: particle.size,
              height: particle.shape === 'circle' ? particle.size : particle.size * 0.6,
              backgroundColor: particle.color,
              borderRadius: particle.shape === 'circle' ? '50%' : '2px',
              transform: `rotate(${particle.rotation}deg)`,
              animation: 'confetti-burst 0.8s ease-out forwards',
              '--x': `${x}px`,
              '--y': `${y}px`,
            }}
          />
        )
      })}

      <style>{`
        @keyframes confetti-burst {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y) - 40px)) scale(0.5) rotate(180deg);
          }
        }
      `}</style>
    </div>
  )
}
