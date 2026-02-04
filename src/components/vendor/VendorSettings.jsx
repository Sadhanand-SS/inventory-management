import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Stack,
  Typography,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  Switch,
  FormLabel,
} from "@mui/material";

const VendorSettings = () => {
  const { settings } = useOutletContext();
  const { vendor, onEdit } = settings;

  const [isEditOpen, setEditOpen] = useState(false);
  const [vendorDraft, setVendorDraft] = useState({ ...vendor });

  useEffect(() => {
    setVendorDraft({ ...vendor });
  }, [vendor]);

  const handleEditClick = (e) => {
    e.preventDefault();
    setEditOpen(true);
  };

  const closeModal = () => {
    setEditOpen(false);
    setVendorDraft({ ...vendor });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setVendorDraft((prev) => ({
      ...prev,
      [name]:
        type === "radio" && name === "isActive"
          ? value === "true"
          : type === "checkbox"
            ? checked
            : value,
    }));
  };

  const handleSubmitVendor = async (e) => {
    e.preventDefault();
    const result = await onEdit(vendorDraft);
    if (result?.success) {
      setEditOpen(false);
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mt: 4 }}>
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box>
          <Typography variant="h5">Vendor Settings</Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your profile and account status
          </Typography>
        </Box>

        {!isEditOpen ? (
          <Button variant="contained" onClick={handleEditClick}>
            Edit Settings
          </Button>
        ) : (
          <Stack direction="row" spacing={2}>
            <Button onClick={closeModal} color="inherit">
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              form="vendor-settings-form"
            >
              Save Changes
            </Button>
          </Stack>
        )}
      </Stack>

      <form id="vendor-settings-form" onSubmit={handleSubmitVendor}>
        <Stack spacing={3}>
          {/* BASIC INFO */}
          <Typography variant="subtitle2" color="text.secondary">
            BASIC INFO
          </Typography>

          <TextField
            label="Vendor Name"
            name="name"
            value={vendorDraft.name || ""}
            onChange={handleChange}
            fullWidth
            InputProps={{ readOnly: !isEditOpen }}
          />

          <TextField
            label="Email Address"
            type="email"
            name="email"
            value={vendorDraft.email || ""}
            onChange={handleChange}
            fullWidth
            InputProps={{ readOnly: !isEditOpen }}
          />

          {/* STATUS */}
          <Typography variant="subtitle2" color="text.secondary">
            STATUS
          </Typography>

          <Box>
            <FormLabel>Account Status</FormLabel>
            <RadioGroup
              row
              name="status"
              value={vendorDraft.status || ""}
              onChange={handleChange}
            >
              <FormControlLabel
                value="approved"
                control={<Radio disabled={!isEditOpen} />}
                label="Approved"
              />
              <FormControlLabel
                value="pending"
                control={<Radio disabled={!isEditOpen} />}
                label="Pending"
              />
              <FormControlLabel
                value="rejected"
                control={<Radio disabled={!isEditOpen} />}
                label="Rejected"
              />
            </RadioGroup>
          </Box>

          {/* VISIBILITY */}
          <Typography variant="subtitle2" color="text.secondary">
            VISIBILITY
          </Typography>

          <FormControlLabel
            control={
              <Switch
                name="isActive"
                checked={!!vendorDraft.isActive}
                onChange={handleChange}
                disabled={!isEditOpen}
              />
            }
            label={vendorDraft.isActive ? "Active" : "Inactive"}
          />

          {/* NOTES */}
          <Typography variant="subtitle2" color="text.secondary">
            NOTES
          </Typography>

          <TextField
            label="Admin Notes"
            name="adminNotes"
            value={vendorDraft.adminNotes || ""}
            onChange={handleChange}
            fullWidth
            multiline
            rows={2}
            InputProps={{ readOnly: !isEditOpen }}
          />
        </Stack>
      </form>
    </Paper>
  );
};

export default VendorSettings;
