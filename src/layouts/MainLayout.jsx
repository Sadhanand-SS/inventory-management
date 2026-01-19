import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import Header from "../components/header/Header";

/**
 * MainLayout
 * ----------
 * This component defines the global page structure of the app.
 *
 * Responsibilities:
 * 1. Consume the ThemeContext (UI preference)
 * 2. Apply the theme to a root wrapper
 * 3. Provide a consistent layout structure (header + main content)
 *
 * What it does NOT do:
 * - It does NOT handle inventory logic
 * - It does NOT open modals
 * - It does NOT contain business rules
 */
const MainLayout = ({ children }) => {
  /**
   * Consume theme-related data from ThemeContext.
   *
   * - theme: current theme value ("light" or "dark")
   * - toggleTheme: function to switch themes
   */
  const { theme } = useContext(ThemeContext);

  return (
    /**
     * Root wrapper for the entire UI.
     *
     * Applying the theme as a class allows CSS to
     * style the application globally based on theme.
     */
    <div className={`layout-${theme}`}>
      {/*
        Header section:
        - Displays app title
        - Provides a button to toggle theme
        - This is UI structure, not business logic
      */}
      <Header />

      {/*
        Main content area:
        - This is where feature components will be rendered
        - children represents whatever is passed inside MainLayout
        - Keeps layout reusable and flexible
      */}
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
