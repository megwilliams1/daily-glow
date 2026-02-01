import { useState } from "react";

export default function Modal({ onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [emoji, setEmoji] = useState("✨");
  const emojis = ["✨", "💧", "🌸", "🧘‍♀️", "📓", "💖"];

  return (
    <div onClick={onClose} className="fixed inset-0 bg-black/40 flex items-center justify-center">


      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-neutral-800 rounded-2xl p-6 w-80 shadow-lg
               animate-in zoom-in duration-200"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          ✨ Add a Habit
        </h2>
        <input
          type="text"
          placeholder="Habit name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-lg p-2 mb-4 focus:outline-none bg-white dark:bg-neutral-700 text-gray-800 dark:text-gray-100"
        />
        <div className="flex gap-2 mb-4">
          {emojis.map((e) => (
            <button
              key={e}
              onClick={() => setEmoji(e)}
              className={`text-xl p-2 rounded-lg
        ${emoji === e ? "bg-pink-100 dark:bg-pink-900" : "hover:bg-pink-50 dark:hover:bg-neutral-700"}`}
            >
              {e}
            </button>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
             className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-neutral-600">
          
            Cancel
          </button>

          <button
            onClick={() => {
              onAdd({ title, emoji });
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-pink-500 dark:bg-pink-700 text-white">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
