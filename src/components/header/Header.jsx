import { useContext } from "react";
import useAuth from "../../hooks/useAuth";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";

const Header = () => {
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
    <>
      <Box sx={{background: "#535434", p: 1.5}}>
        <Stack direction="row" gap={2} display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" color="white">Product Inventory</Typography>
          <Stack direction="row" gap={2}>
            <Button variant="contained" onClick={toggleTheme}>
              {theme === "light" ? "Dark" : "Light"}
            </Button>
            {isAuthenticated ? (
              <Stack direction="row" gap={2}>
                <Avatar>A</Avatar>
                <Button variant="contained" onClick={handleLogout}>
                  Logout
                </Button>
              </Stack>
            ) : (
              <Button variant="contained" onClick={handleLogin}>
                Login
              </Button>
            )}
          </Stack>
        </Stack>
      </Box>
      {/* <header className="app-header">
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
      </header> */}
    </>
  );
};

export default Header;
