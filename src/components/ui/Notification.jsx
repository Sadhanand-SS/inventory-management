import { useEffect } from "react";
// import "./Notification.css";

/**
 * Notification
 * ------------
 * Displays a dismissible success or error message.
 *
 * Props:
 * - type: "success" | "error"
 * - message: string
 * - onClose: function
 */
const Notification = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`notification-toast notification-${type}`}>
      <div className="notification-wrapper">
        <div className="notification-main">
          <div className="notification-icon-container">
            {/* Placeholder for a dynamic icon based on type */}
            <span className="status-icon" aria-hidden="true"></span>
          </div>

          <div className="notification-body">
            <span className="notification-content">{message}</span>
          </div>
        </div>

        <div className="notification-actions">
          <button
            className="close-button"
            onClick={onClose}
            aria-label="Close notification"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Visual countdown bar */}
      <div className="progress-bar-container">
        <div className="progress-bar" />
      </div>
    </div>
  );
};

export default Notification;
