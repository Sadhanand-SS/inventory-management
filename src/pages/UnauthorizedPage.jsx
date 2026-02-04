import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Stack,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const UnauthorizedPage = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper elevation={2} sx={{ p: 4, width: "100%", textAlign: "center" }}>
          <Stack spacing={2} alignItems="center">
            <WarningAmberIcon color="warning" sx={{ fontSize: 48 }} />

            <Typography variant="h5">Unauthorized</Typography>

            <Typography variant="body2" color="text.secondary">
              You do not have permission to access this page.
            </Typography>

            <Button
              component={Link}
              to="/login"
              variant="contained"
              sx={{ mt: 1 }}
            >
              Go to Login
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
};

export default UnauthorizedPage;
