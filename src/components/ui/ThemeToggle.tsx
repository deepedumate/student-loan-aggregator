import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../chat-journey/ThemeProvider";
import { cn } from "../../lib/utils";

/**
 * Reusable Theme Toggle Component
 * Provides a pill-style button to switch between light and dark themes
 */
const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDarkMode ? "light" : "dark")}
      className="relative w-14 h-8 rounded-full p-1 transition-all duration-300 bg-muted border border-border"
      aria-label="Toggle theme"
    >
      {/* Track icons */}
      <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
        <Sun className={cn(
          "w-4 h-4 transition-opacity duration-300",
          isDarkMode ? "opacity-40 text-muted-foreground" : "opacity-0"
        )} />
        <Moon className={cn(
          "w-4 h-4 transition-opacity duration-300",
          isDarkMode ? "opacity-0" : "opacity-40 text-muted-foreground"
        )} />
      </div>
      {/* Sliding knob */}
      <div className={cn(
        "relative w-6 h-6 bg-card rounded-full shadow-md flex items-center justify-center transition-all duration-300 border border-border/50",
        isDarkMode ? "translate-x-6" : "translate-x-0"
      )}>
        {isDarkMode ? (
          <Moon className="w-3.5 h-3.5 text-primary" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-accent" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
