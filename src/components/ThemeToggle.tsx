"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = saved ? saved === "dark" : prefersDark;
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  const toggle = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle("dark", newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      title="Toggle theme"
      aria-label="Toggle theme"
      className="text-foreground cursor-pointer hover:opacity-70 transition-opacity"
      style={{ "--duration": "500ms" } as React.CSSProperties}
    >
      <svg
width="1.75em"
height="1.75em"
        viewBox="0 0 32 32"
        aria-hidden="true"
        fill="currentColor"
      >
        <path
          d="M27.5 11.5v-7h-7L16 0l-4.5 4.5h-7v7L0 16l4.5 4.5v7h7L16 32l4.5-4.5h7v-7L32 16l-4.5-4.5zM16 25.4a9.39 9.39 0 1 1 0-18.8 9.39 9.39 0 1 1 0 18.8z"
          className={`origin-center transition-transform duration-500 ${
            isDark ? "rotate-180" : "rotate-0"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0,0,0.15,1.25)" }}
        />
        <circle
          cx="16"
          cy="16"
          r="7.6"
          className={`origin-center transition-transform duration-300 ${
            isDark ? "translate-x-[15%]" : "translate-x-0"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)" }}
        />
      </svg>
    </button>
  );
}