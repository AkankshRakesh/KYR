import React, { useState, useEffect } from "react";

const DarkModeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Check for stored theme preference in localStorage on component mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    // Use stored theme if available, otherwise use system preference
    const initialDarkMode = storedTheme 
      ? storedTheme === "dark" 
      : prefersDark;
      
    setIsDarkMode(initialDarkMode);
    setIsMounted(true);
    
    if (initialDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);

    // Save the theme to localStorage
    if (newDarkMode) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }

    setTimeout(() => setIsAnimating(false), 300);
  };

  // Don't render until mounted to avoid flash of incorrect theme
  if (!isMounted) {
    return null;
  }

  return (
    <button
      onClick={toggleDarkMode}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      className="relative w-16 h-8 rounded-full focus:outline-none focus:ring-2  focus:ring-purple-800  transition-colors duration-200"
    >
      {/* Track with gradient background */}
      <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-r from-indigo-800 to-purple-800' 
          : 'bg-gradient-to-r from-yellow-300 to-orange-400'
      }`}></div>
      
      {/* Thumb with sun/moon emoji and shine effect */}
      <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-lg transform transition-all duration-300 flex items-center justify-center ${
        isDarkMode ? 'translate-x-7 rotate-0' : 'translate-x-0 rotate-90'
      }`}>
        <span className={`text-lg transition-opacity duration-200 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          {isDarkMode ? '🌙' : '☀️'}
        </span>
      </div>
      
      {/* Stars that appear in dark mode */}
      
    </button>
  );
};

export default DarkModeToggle;