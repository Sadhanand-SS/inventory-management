import { createContext, useState } from "react";

/**
 * ThemeContext
 * ------------
 * This context represents global UI theme state.
 *
 * It does NOT handle:
 * - CSS
 * - styling logic
 * - component-specific UI
 *
 * It only answers:
 * - What is the current theme?
 * - How can it be changed?
 */
export const ThemeContext = createContext(null);

/**
 * ThemeProvider
 * -------------
 * Owns the theme state and exposes
 * controlled actions to update it.
 */
const ThemeProvider = ({ children }) => {

  /**
   * Single source of truth for theme.
   * Possible values: "light" | "dark"
   *
   * Default is "light".
   */
  const [theme, setTheme] = useState("light");

  /**
   * toggleTheme
   * -----------
   * Switches between light and dark mode.
   *
   * This function contains NO UI logic.
   * It only updates state.
   */
  const toggleTheme = () => {
    setTheme(prevTheme =>
      prevTheme === "light" ? "dark" : "light"
    );
  };

  /**
   * Public API of ThemeContext.
   *
   * Consumers can:
   * - read current theme
   * - request a theme change
   *
   * Consumers cannot:
   * - mutate theme directly
   */
  const value = {
    theme,
    toggleTheme,
  };

  /**
   * Provide theme capabilities
   * to the entire application.
   */
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
