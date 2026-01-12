import { useEffect } from "react";
import "./Notification.css";

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
    <div className={`notification notification-${type}`}>
      <span className="notification-content">{message}</span>
      <button className="close-button" onClick={onClose}>
        ✕
      </button>
      {/* Visual countdown bar */}
      <div className="progress-bar" />
    </div>
  );
};

export default Notification;
