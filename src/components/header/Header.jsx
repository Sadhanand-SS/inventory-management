import { useContext } from "react";
import useAuth from "../../hooks/useAuth";
import { ThemeContext } from "../../contexts/ThemeContext";
// import "./Header.css";
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
    navigate("/login");
  };

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
  };

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-branding">
          <h1 className="header-title">Product Inventory</h1>
        </div>

        <div className="header-actions">
          <button className="btn-theme-toggle" onClick={toggleTheme}>
            Switch to {theme === "light" ? "Dark" : "Light"} Mode
          </button>

          {isAuthenticated ? (
            <div className="user-profile">
              <span className="user-name">{user.name}</span>
              <button className="btn-logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <button className="btn-login" onClick={handleLogin}>
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
