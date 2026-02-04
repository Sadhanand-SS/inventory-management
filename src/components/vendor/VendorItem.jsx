import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Paper,
  Chip,
  Avatar,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const VendorItem = React.memo(({ vendor, onDelete }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/vendors/${vendor.vendorId}`);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "success";
      case "pending":
        return "warning";
      case "rejected":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2, // internal padding only
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Left: Avatar + Info */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar
          variant="rounded"
          sx={{
            width: 44,
            height: 44,
            bgcolor: "grey.100",
            color: "text.secondary",
          }}
        >
          <PersonIcon />
        </Avatar>

        <Stack spacing={0.3}>
          <Typography
            variant="subtitle1"
            sx={{ cursor: "pointer", fontWeight: 600 }}
            onClick={handleClick}
          >
            {vendor.name}
          </Typography>

          <Chip
            label={vendor.status}
            color={getStatusColor(vendor.status)}
            size="small"
          />
        </Stack>
      </Box>

      {/* Right: Actions */}
      <IconButton
        size="small"
        color="error"
        onClick={() => onDelete(vendor.vendorId)}
        aria-label={`Delete ${vendor.name}`}
      >
        <DeleteOutlineIcon />
      </IconButton>
    </Paper>
  );
});

export default VendorItem;
