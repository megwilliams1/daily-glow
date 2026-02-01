import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './components/Header'
import Card from './components/Card'
import './index.css'
import Modal from './components/Modal'

function App() {
  const [dark, setDark] = useState(false);

  const [showModal, setShowModal] = useState(false)
 
  const [habits, setHabits] = useState([
    { id: 1, title: "Drink Water", emoji: "💧" },
    { id: 2, title: "Pray", emoji: "🙏" },
    { id: 3, title: "Journal", emoji: "📓" },
    { id: 4, title: "Read", emoji: "📖" },
    { id: 5, title: "Walk", emoji: "🚶♀️" },
    { id: 6, title: "Meditate", emoji: "🧘" },
  ])

  return (
    <div className={dark ? "dark" : ""}>
    <div className="min-h-screen bg-pink-50 dark:bg-neutral-900 flex justify-center items-center">
      <div className="w-full max-w-4xl p-6">
        <Header />

        <button
  onClick={() => setDark(!dark)}
  className="mb-4 px-3 py-1 rounded-lg
             bg-pink-200 dark:bg-neutral-700"
>
  {dark ? "🌙 Dark" : "☀️ Light"}

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
  className="fixed bottom-6 right-6 bg-pink-500 dark:bg-pink-700
                   text-white w-14 h-14 rounded-full shadow-lg hover:scale-110 transition">
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