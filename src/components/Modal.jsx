import { useState, useEffect } from "react";

export default function Modal({ onClose, onAdd, editingHabit }) {
  const [title, setTitle] = useState("");
  const [emoji, setEmoji] = useState("✨");
  const emojis = ["✨", "💧", "🌸", "🧘", "📓", "💖", "🎀", "🌙", "🦋", "🍃"];

  // Load existing habit data when editing
  useEffect(() => {
    if (editingHabit) {
      setTitle(editingHabit.title);
      setEmoji(editingHabit.emoji);
    }
  }, [editingHabit]);

  const handleAdd = () => {
    if (title.trim()) {
      onAdd({ title, emoji });
      onClose();
    }
  };

  return (
    <div onClick={onClose} className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-neutral-800 rounded-2xl p-6 w-80 shadow-lg
               animate-in zoom-in duration-200"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          {editingHabit ? "✏️ Edit Habit" : "✨ Add a Habit"}
        </h2>
        <input
          type="text"
          placeholder="Habit name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
          className="w-full border rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white dark:bg-neutral-700 text-gray-800 dark:text-gray-100"
        />
        <div className="grid grid-cols-5 gap-2 mb-4">
          {emojis.map((e) => (
            <button
              key={e}
              onClick={() => setEmoji(e)}
              className={`text-2xl p-2 rounded-lg transition
                ${emoji === e ? "bg-pink-100 dark:bg-pink-900 scale-110" : "hover:bg-pink-50 dark:hover:bg-neutral-700"}`}
            >
              {e}
            </button>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-neutral-600 hover:bg-gray-300 dark:hover:bg-neutral-500 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleAdd}
            disabled={!title.trim()}
            className="px-4 py-2 rounded-lg bg-pink-500 dark:bg-pink-700 text-white hover:bg-pink-600 dark:hover:bg-pink-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {editingHabit ? "Save" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}