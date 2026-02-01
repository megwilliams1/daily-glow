import { useState, useEffect } from 'react'
import Header from './components/Header'
import Card from './components/Card'
import './index.css'
import Modal from './components/Modal'
import FloatingHearts from './components/FloatingHeart'

function App() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const [showModal, setShowModal] = useState(false)
 
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem('habits');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: "Drink Water", emoji: "💧" },
      { id: 2, title: "Pray", emoji: "🙏" },
      { id: 3, title: "Journal", emoji: "📓" },
      { id: 4, title: "Read", emoji: "📖" },
      { id: 5, title: "Walk", emoji: "🚶" },
      { id: 6, title: "Meditate", emoji: "🧘" },
      { id: 7, title: "Rest", emoji: "💤" },
      { id: 8, title: "Stretch", emoji: "🤸" },
    ];
  });

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(dark));
  }, [dark]);

  // Save habits to localStorage
  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  return (
    <div className={dark ? "dark" : ""}>
      <FloatingHearts />
      <div className="min-h-screen bg-pink-50 dark:bg-neutral-900 flex justify-center items-center">
        <div className="w-full max-w-4xl p-6">
          <Header />

          <button
            onClick={() => setDark(!dark)}
            className="mb-4 px-4 py-2 rounded-full
                       bg-gradient-to-r from-pink-300 to-purple-300 
                       dark:bg-gradient-to-r dark:from-pink-700 dark:to-purple-700
                       text-white font-semibold shadow-lg hover:scale-105 transition"
          >
            {dark ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {habits.map((habit) => (
              <Card
                key={habit.id}
                title={habit.title}
                emoji={habit.emoji}
              />
            ))}
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="fixed bottom-6 right-6 bg-gradient-to-r from-pink-500 to-purple-500
                       text-white w-16 h-16 rounded-full shadow-2xl hover:scale-110 
                       transition text-3xl font-bold hover:rotate-90 duration-300"
          >
            +
          </button> 

          {showModal && (
            <Modal
              onClose={() => setShowModal(false)}
              onAdd={(newHabit) => {
                setHabits((prev) => [...prev, { id: Date.now(), ...newHabit }]);
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default App