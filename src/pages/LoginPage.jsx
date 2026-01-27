import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Notification from "../components/ui/Notification";

/**
 * LoginPage
 * ---------
 * Entry point for authentication.
 *
 * Responsibilities:
 * - Collect user credentials
 * - Trigger login action
 * - Decide post-login navigation based on role
 * - Display one-time notifications via route state
 *
 * This page is allowed to:
 * - Read auth results
 * - Control navigation flow after login
 *
 * This page does NOT:
 * - Own authentication state
 * - Contain business logic
 */
const LoginPage = () => {
  /**
   * Consume only the login action from AuthContext.
   * Auth state itself is NOT read here to avoid timing issues.
   */
  const { login } = useAuth();

  /**
   * Local state for controlled form inputs.
   */
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
  });

  /**
   * Local UI state for notifications.
   */
  const [notification, setNotification] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const usernameRef = useRef(null);

  /**
   * Consume route-scoped notification (flash message).
   * Clears route state after displaying once.
   */
  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (location.state?.notification) {
      setNotification(location.state.notification);

      // Clear route state after consumption
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.state, navigate]);

  /**
   * Handles controlled input updates.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Handles login form submission.
   *
   * Flow:
   * - Trigger login
   * - On success:
   *     - Admin  → /vendors
   *     - Vendor → /inventory/:vendorId
   * - On failure:
   *     - Show error notification
   */
  const onLogin = async (e) => {
    e.preventDefault();

    const result = await login(userCredentials);

    if (result.success) {
      result.user.role === "admin"
        ? navigate("/vendors", {
            state: {
              notification: {
                type: "success",
                message: "Logged in successfully",
              },
            },
          })
        : navigate(`/inventory/${result.user.vendorId}`, {
            state: {
              notification: {
                type: "success",
                message: "Logged in successfully",
              },
            },
          });
    } else {
      setNotification({
        type: "error",
        message: "Invalid credentials",
      });
    }
  };

  return (
    <div className="login-page-container">
      {notification && (
        <div className="notification-wrapper">
          <Notification
            type={notification.type}
            message={notification.message}
            onClose={() => setNotification(null)}
          />
        </div>
      )}

      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">Login Page</h1>
          <p className="login-subtitle">
            Please enter your credentials to continue
          </p>
        </div>

        <form className="login-form" onSubmit={onLogin}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              className="form-input"
              type="text"
              name="username"
              value={userCredentials.username}
              ref={usernameRef}
              onChange={handleChange}
              placeholder="Enter your username"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              name="password"
              value={userCredentials.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>

          <div className="form-actions">
            <button className="btn-login-submit" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
