import { Snackbar, Alert } from "@mui/material";

const Notification = ({ type = "info", message, onClose }) => {
  return (
    <Snackbar
      open={Boolean(message)}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }} // or "top"
    >
      <Alert
        onClose={onClose}
        severity={type} // "success" | "error" | "warning" | "info"
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
