import { useEffect, useRef, useState } from "react";
// Importing the pieces we learned
import {
  Button,
  TextField,
  Stack,
  Typography,
  Container,
  Paper,
  Box,
} from "@mui/material";

const VendorForm = ({ onSubmit, onClose }) => {
  const isSubmittingRef = useRef(false);
  const nameInputRef = useRef(null);

  // ---------- STATE (Logic stays exactly as you wrote it) ----------
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;

    const newVendor = {
      name: name.trim(),
      email: email.trim(),
      adminNotes: notes.trim(),
    };

    onSubmit(newVendor);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "24px" }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Typography variant="h5" gutterBottom fontWeight="bold">
            Vendor Details
          </Typography>

          <Stack spacing={3}>
            <TextField
              label="Vendor Name"
              placeholder="Enter vendor name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              inputRef={nameInputRef}
              required
              fullWidth
            />
            <TextField
              label="Email Address"
              type="email"
              placeholder="vendor@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
            />

            <TextField
              label="Notes"
              placeholder="Add any internal admin notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              multiline
              rows={3}
              fullWidth
            />

            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button onClick={onClose} variant="outlined" color="inherit">
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Save Vendor Details
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default VendorForm;
