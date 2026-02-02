import { useState, useEffect } from "react";
import Header from "./components/Header";
import Card from "./components/Card";
import ProgressBar from "./components/ProgressBar";
import MotivationalQuote from "./components/MotivationalQuote";
import CelebrationPopup from "./components/CelebrationPopup";
import ThemePicker, { THEMES } from "./components/ThemePicker";
import HeatmapView from "./components/HeatmapView";
import "./index.css";
import Modal from "./components/Modal";
import FloatingHearts from "./components/FloatingHearts";

function App() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  const [currentTheme, setCurrentTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved || "pink";
  });

  const [showModal, setShowModal] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [hasShownCelebrationToday, setHasShownCelebrationToday] = useState(
    () => {
      const today = new Date().toDateString();
      const savedDate = localStorage.getItem("celebrationDate");
      return savedDate === today;
    },
  );

  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("habits");
    return saved
      ? JSON.parse(saved)
      : [
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

  const theme = THEMES.find((t) => t.id === currentTheme) || THEMES[0];

  const getCompletedCount = () => {
    const today = new Date().toDateString();
    return habits.filter((habit) => {
      const doneDate = localStorage.getItem(`doneDate-${habit.title}`);
      const isDone = localStorage.getItem(`done-${habit.title}`) === "true";
      return isDone && doneDate === today;
    }).length;
  };

  const [completedCount, setCompletedCount] = useState(getCompletedCount());

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(dark));
  }, [dark]);

  useEffect(() => {
    localStorage.setItem("theme", currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newCompletedCount = getCompletedCount();
      const previousCount = completedCount;
      setCompletedCount(newCompletedCount);

      if (
        habits.length > 0 &&
        newCompletedCount === habits.length &&
        previousCount < habits.length &&
        !hasShownCelebrationToday
      ) {
        setShowCelebration(true);
        const today = new Date().toDateString();
        localStorage.setItem("celebrationDate", today);
        setHasShownCelebrationToday(true);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [habits, completedCount, hasShownCelebrationToday]);

  const handleDeleteHabit = (id) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  const handleEditHabit = (habit) => {
    setEditingHabit(habit);
    setShowModal(true);
  };

  const handleSaveHabit = (updatedHabit) => {
    if (editingHabit) {
      setHabits((prev) =>
        prev.map((h) =>
          h.id === editingHabit.id ? { ...h, ...updatedHabit } : h,
        ),
      );
      setEditingHabit(null);
    } else {
      setHabits((prev) => [...prev, { id: Date.now(), ...updatedHabit }]);
    }
  };

  const handleThemeChange = (newTheme) => {
    setCurrentTheme(newTheme.id);
  };

  return (
    <div className={dark ? "dark" : ""}>
      <FloatingHearts />
      <div
        className={`min-h-screen bg-gradient-to-br ${dark ? theme.bgDark : theme.bgLight} flex justify-center items-center transition-colors duration-500`}
      >
        <div className="w-full max-w-4xl p-6">
          <Header />

          <div className="flex gap-2 mb-4 flex-wrap">
            <ThemePicker
              currentTheme={currentTheme}
              onThemeChange={handleThemeChange}
            />

            <button
              onClick={() => setDark(!dark)}
              className={`px-4 py-2 rounded-full bg-gradient-to-r ${dark ? theme.darkGradient : theme.gradient}
                         text-white font-semibold shadow-lg hover:scale-105 transition`}
            >
              {dark ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </button>
          </div>

          <MotivationalQuote />

          <ProgressBar
            completed={completedCount}
            total={habits.length}
            theme={theme}
          />

          <HeatmapView habits={habits} theme={theme} />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {habits.map((habit) => (
              <Card
                key={habit.id}
                title={habit.title}
                emoji={habit.emoji}
                onDelete={() => handleDeleteHabit(habit.id)}
                onEdit={() => handleEditHabit(habit)}
                theme={theme}
              />
            ))}
          </div>

          <button
            onClick={() => {
              setEditingHabit(null);
              setShowModal(true);
            }}
            className={`fixed bottom-6 right-6 bg-gradient-to-r ${theme.gradient}
                       text-white w-16 h-16 rounded-full shadow-2xl hover:scale-110 
                       transition text-3xl font-bold hover:rotate-90 duration-300`}
          >
            +
          </button>

          {showModal && (
            <Modal
              onClose={() => {
                setShowModal(false);
                setEditingHabit(null);
              }}
              onAdd={handleSaveHabit}
              editingHabit={editingHabit}
            />
          )}

          {showCelebration && (
            <CelebrationPopup onClose={() => setShowCelebration(false)} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
