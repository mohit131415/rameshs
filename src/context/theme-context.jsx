"use client"

import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  // Always use light theme
  const [theme] = useState("light")

  useEffect(() => {
    // Update document class
    const root = window.document.documentElement
    root.classList.remove("dark")
    root.classList.add("light")
    localStorage.setItem("theme", "light")
  }, [])

  // Provide a dummy toggleTheme function that does nothing
  const toggleTheme = () => {
    // This function is kept for compatibility but does nothing
    console.log("Theme toggling is disabled")
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

