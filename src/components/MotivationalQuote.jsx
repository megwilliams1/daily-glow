import { useState, useEffect } from "react";

const QUOTES = [
  { text: "You are capable of amazing things!", emoji: "✨" },
  { text: "Small steps every day lead to big changes!", emoji: "🌸" },
  { text: "Believe in yourself and magic happens!", emoji: "💖" },
  { text: "Your future self will thank you!", emoji: "🦋" },
  { text: "Progress, not perfection!", emoji: "🌟" },
  { text: "You've got this, beautiful soul!", emoji: "💕" },
  { text: "Every day is a fresh start!", emoji: "🌅" },
  { text: "Self-care isn't selfish, it's essential!", emoji: "🌺" },
  { text: "You are worthy of all good things!", emoji: "👑" },
  { text: "Keep blooming, you're doing great!", emoji: "🌷" },
  { text: "Your vibe attracts your tribe!", emoji: "✨" },
  { text: "Dream big, sparkle more, shine bright!", emoji: "💫" },
  { text: "Be the energy you want to attract!", emoji: "🌈" },
  { text: "You are stronger than you think!", emoji: "💪" },
  { text: "Embrace the glorious mess that you are!", emoji: "🎀" },
];

export default function MotivationalQuote() {
  const [quote, setQuote] = useState({ text: "", emoji: "" });

  useEffect(() => {
    // Get quote based on the day (changes daily)
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem("quoteDate");
    const savedQuoteIndex = localStorage.getItem("quoteIndex");

    if (savedDate === today && savedQuoteIndex !== null) {
      // Use saved quote for today
      setQuote(QUOTES[parseInt(savedQuoteIndex)]);
    } else {
      // Generate new quote for new day
      const dayOfYear = Math.floor(
        (new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000,
      );
      const quoteIndex = dayOfYear % QUOTES.length;

      setQuote(QUOTES[quoteIndex]);
      localStorage.setItem("quoteDate", today);
      localStorage.setItem("quoteIndex", quoteIndex.toString());
    }
  }, []);

  return (
    <div className="mb-6 text-center">
      <div
        className="bg-gradient-to-r from-pink-100 to-purple-100 
                      dark:from-pink-900/30 dark:to-purple-900/30 
                      rounded-2xl p-4 shadow-lg border-2 border-pink-200 
                      dark:border-pink-800 transition-all hover:scale-105 duration-300"
      >
        <p className="text-lg font-medium text-gray-800 dark:text-gray-100 italic">
          "{quote.text}"
        </p>
        <p className="text-3xl mt-2">{quote.emoji}</p>
      </div>
    </div>
  );
}
