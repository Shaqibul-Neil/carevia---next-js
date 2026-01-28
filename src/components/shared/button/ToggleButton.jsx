"use client";
import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react";
import React from "react";

const ToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  console.log(theme);
  return (
    <button
      onClick={toggleTheme}
      className="text-slate-600 dark:text-slate-200 cursor-pointer"
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </button>
  );
};

export default ToggleButton;
