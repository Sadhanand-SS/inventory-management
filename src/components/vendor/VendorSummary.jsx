import { useOutletContext } from "react-router-dom";
import { Box, Typography, Paper, Stack, Chip, Divider } from "@mui/material";

const VendorSummary = () => {
  const { overview } = useOutletContext();

  const { vendor } = overview;
  if (!vendor) {
    return <Typography>Loading vendor details...</Typography>;
  }

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString("en-IN");
  };

  const {
    vendorId: id,
    name,
    email,
    status,
    isActive,
    adminNotes,
    createdAt,
    updatedAt,
  } = vendor;

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
    <Paper elevation={2} sx={{ p: 3, mt: 4 }}>
      {/* Header */}
      <Box mb={2}>
        <Typography variant="h6">Vendor Information</Typography>
      </Box>

      {/* Info Grid */}
      <Stack spacing={1.5}>
        <Stack direction="row" spacing={1}>
          <Typography fontWeight={600}>Vendor ID:</Typography>
          <Typography>{id}</Typography>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Typography fontWeight={600}>Name:</Typography>
          <Typography>{name}</Typography>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Typography fontWeight={600}>Email:</Typography>
          <Typography>{email}</Typography>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <Typography fontWeight={600}>Status:</Typography>
          <Chip label={status} color={getStatusColor(status)} size="small" />
        </Stack>

        <Stack direction="row" spacing={1}>
          <Typography fontWeight={600}>Active:</Typography>
          <Typography>{isActive ? "Yes" : "No"}</Typography>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Typography fontWeight={600}>Created At:</Typography>
          <Typography>{formatDate(createdAt)}</Typography>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Typography fontWeight={600}>Last Updated:</Typography>
          <Typography>{formatDate(updatedAt)}</Typography>
        </Stack>
      </Stack>

      {typeof adminNotes === "string" && adminNotes.trim() !== "" && (
        <>
          <Divider sx={{ my: 2 }} />
          <Stack direction="row" spacing={1}>
            <Typography fontWeight={600}>Notes:</Typography>
            <Typography>{adminNotes}</Typography>
          </Stack>
        </>
      )}
    </Paper>
  );
};

export default VendorSummary;
