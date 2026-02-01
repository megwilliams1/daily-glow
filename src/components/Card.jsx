import { useState } from "react"

export default function Card({ title, emoji }) {
  const [done, setDone] = useState(false)

  return (
    <div
  onClick={() => setDone(!done)}
  className={`rounded-2xl p-4 shadow-md cursor-pointer transition
    ${done
      ? "bg-pink-100 dark:bg-pink-900 scale-105"
      : "bg-white dark:bg-neutral-800 hover:-translate-y-1"}`}
>
  <h2 className="text-xl text-gray-800 dark:text-gray-200">
    {emoji} {title}
  </h2>
  <p className="mt-2 text-gray-600 dark:text-gray-300">
    {done ? "💖 Completed!" : "🤍 Not yet"}
  </p>
  {done && (
    <span className="block mt-2 animate-in fade-in text-yellow-300">
      ✨✨✨
    </span>
  )}
</div>

  )
}
