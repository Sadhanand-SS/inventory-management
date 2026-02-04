import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Notification from "../components/ui/Notification";
import {
  Box,
  Container,
  Stack,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";

const LoginPage = () => {
  const { login } = useAuth();

  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
  });

  const [notification, setNotification] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const usernameRef = useRef(null);

  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (location.state?.notification) {
      setNotification(location.state.notification);
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.state, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
    <Container maxWidth="sm">
      <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
        <Stack spacing={3} width="100%">
          {notification && (
            <Notification
              type={notification.type}
              message={notification.message}
              onClose={() => setNotification(null)}
            />
          )}

          <Paper elevation={2} sx={{ p: 4 }}>
            <Stack spacing={2}>
              <Stack spacing={0.5}>
                <Typography variant="h5">Login</Typography>
                <Typography variant="body2" color="text.secondary">
                  Please enter your credentials to continue
                </Typography>
              </Stack>

              <Box component="form" onSubmit={onLogin}>
                <Stack spacing={2}>
                  <TextField
                    label="Username"
                    name="username"
                    value={userCredentials.username}
                    onChange={handleChange}
                    inputRef={usernameRef}
                    placeholder="Enter your username"
                    fullWidth
                  />

                  <TextField
                    label="Password"
                    type="password"
                    name="password"
                    value={userCredentials.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    fullWidth
                  />

                  <Box
                    sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}
                  >
                    <Button variant="contained" type="submit">
                      Login
                    </Button>
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </Paper>
        </Stack>
      </Box>
    </Container>
  );
};

export default LoginPage;
