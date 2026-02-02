import { useEffect, useState } from 'react';

const CELEBRATION_MESSAGES = [
  "You're absolutely crushing it! 💪✨",
  "Look at you go, superstar! 🌟💖",
  "All habits complete! You're amazing! 🎉",
  "What a productive day! So proud! 💕",
  "You did it! You're unstoppable! 🦋✨",
  "Incredible work today! Keep shining! 💫",
];

export default function CelebrationPopup({ onClose }) {
  const [confetti, setConfetti] = useState([]);
  const [message] = useState(
    CELEBRATION_MESSAGES[Math.floor(Math.random() * CELEBRATION_MESSAGES.length)]
  );

  useEffect(() => {
    // Generate confetti
    const particles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 2,
      emoji: ['✨', '💖', '🌸', '⭐', '💕', '🎉', '🦋', '💫'][Math.floor(Math.random() * 8)],
    }));
    setConfetti(particles);

    // Auto close after 5 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in duration-300"
    >
      {/* Confetti */}
      {confetti.map((particle) => (
        <div
          key={particle.id}
          className="absolute text-2xl pointer-events-none"
          style={{
            left: `${particle.left}%`,
            top: '-50px',
            animation: `fall-down ${particle.duration}s linear forwards`,
            animationDelay: `${particle.delay}s`,
          }}
        >
          {particle.emoji}
        </div>
      ))}

      {/* Popup card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-pink-100 to-purple-100 
                   dark:from-pink-900 dark:to-purple-900
                   rounded-3xl p-8 max-w-md mx-4 shadow-2xl 
                   border-4 border-pink-300 dark:border-pink-700
                   animate-in zoom-in duration-500"
      >
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">
            🎉
          </div>
          
          <h2 className="text-3xl font-bold text-transparent bg-clip-text 
                         bg-gradient-to-r from-pink-600 to-purple-600 
                         dark:from-pink-300 dark:to-purple-300 mb-3">
            All Done!
          </h2>
          
          <p className="text-lg text-gray-800 dark:text-gray-100 mb-6 font-medium">
            {message}
          </p>

          <div className="flex gap-2 justify-center mb-4 text-4xl">
            <span className="animate-bounce" style={{ animationDelay: '0s' }}>💖</span>
            <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>✨</span>
            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🌸</span>
            <span className="animate-bounce" style={{ animationDelay: '0.3s' }}>💫</span>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500
                       text-white font-semibold rounded-full shadow-lg
                       hover:scale-105 transition duration-300"
          >
            Continue Glowing ✨
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fall-down {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}