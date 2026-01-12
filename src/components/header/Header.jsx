import { useContext } from "react";
import useAuth from "../../hooks/useAuth";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./Header.css";
import { useNavigate } from "react-router-dom";

/**
 * Header
 * ------
 * Represents the top section of the application.
 *
 * Responsibilities:
 * - Display application title
 * - Allow user to toggle theme
 *
 * It does NOT:
 * - Manage layout
 * - Manage business data
 * - Apply global structure
 */
const Header = () => {
  /**
   * Consume theme-related data.
   * Header only needs to READ theme
   * and TRIGGER theme changes.
   */

  const { user, isAuthenticated, logout } = useAuth();

  const { theme, toggleTheme } = useContext(ThemeContext);
  
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  }

  const handleLogout = () => {
    logout();
    navigate("/login", {
        state: {
          notification: {
            type: "success",
            message: "Logged out successfully",
          },
        },
      });
  }

  return (
    <header className="app-header">
      <h1>Product Inventory</h1>

      <button onClick={toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
      {isAuthenticated ? (
        <div>
          <span>{user.name}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button
          onClick={handleLogin}
        >
          Login
        </button>
      )}
    </header>
  );
};

export default Header; 
