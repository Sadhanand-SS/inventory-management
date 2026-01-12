import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Notification from "../components/ui/Notification";

const LoginPage = () => {
  // Hooks and states

  const { login } = useAuth();

  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.notification) {
      setNotification(location.state.notification);

      // CLEAR route state after consuming it
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location, navigate]);

  // Event Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const onLogin = async (e) => {
    e.preventDefault();
    const result = await login(userCredentials);
    if (result.success) {
      navigate("/inventory", {
        state: {
          notification: {
            type: "success",
            message: "Logged in successfully",
          },
        },
      });
    } else { 
      setError(result.error);
      setNotification({
        type: "error",
        message: "Invalid Credentials",
      });  
    }
  };

  return (
    <>
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
      <h1>Login Page</h1>
      <form onSubmit={onLogin}>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={userCredentials.username}
            onChange={handleChange}
          />
        </div>
        <br />
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={userCredentials.password}
            onChange={handleChange}
          />
        </div>
        <br />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginPage;
