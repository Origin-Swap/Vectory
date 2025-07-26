import React, { useEffect, useState } from "react";
import DarkIcon from '../assets/dark';
import LightIcon from '../assets/light';

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <button
      onClick={toggleDarkMode}
      className="flex bg-gray-100 dark:bg-transparent md:bg-transparent p-2 rounded-full items-center gap-2 text-black dark:text-white px-2 py-2 md:mt-4 transition-all duration-300"
    >
      {isDarkMode ? <DarkIcon className="w-6 h-6" /> : <LightIcon className="w-6 h-6" />}
      {/* Teks hanya muncul di layar md ke atas */}
      <span className="hidden md:inline text-sm">
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </span>
    </button>
  );
};

export default DarkModeToggle;
