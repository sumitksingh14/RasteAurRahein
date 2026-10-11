"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "dark" | "light" | "outdoor";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  setTheme: () => {},
  toggleTheme: () => {},
});

function applyThemeToDocument(theme: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  if (theme === "dark") {
    root.classList.add("dark");
    root.classList.remove("outdoor");
  } else if (theme === "outdoor") {
    root.classList.add("dark", "outdoor");
  } else {
    root.classList.remove("dark", "outdoor");
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Default to dark theme per site design specifications
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = (localStorage.getItem("rar_theme") || localStorage.getItem("theme")) as Theme | null;
      if (stored === "light" || stored === "dark" || stored === "outdoor") {
        setThemeState(stored);
        applyThemeToDocument(stored);
      } else {
        setThemeState("dark");
        applyThemeToDocument("dark");
      }
    } catch {
      setThemeState("dark");
      applyThemeToDocument("dark");
    }
  }, []);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    try {
      localStorage.setItem("rar_theme", next);
      localStorage.setItem("theme", next);
    } catch {
      // Ignore quota/private browsing issues
    }
    applyThemeToDocument(next);
  };

  const toggleTheme = () => {
    // Cycles: dark -> outdoor -> light -> dark
    const next: Theme = theme === "dark" ? "outdoor" : theme === "outdoor" ? "light" : "dark";
    setTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
