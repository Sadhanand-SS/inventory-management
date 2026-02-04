import React from "react";
import VendorItem from "./VendorItem";
import { Box, Stack, Typography } from "@mui/material";

const VendorList = React.memo(({ vendors, onDelete }) => {
  if (vendors.length === 0) {
    return <Typography>No Vendors available.</Typography>;
  }

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6">Registered Vendors</Typography>
        <Typography variant="body2" color="text.secondary">
          Total: {vendors.length}
        </Typography>
      </Box>

      {/* Flex Grid */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          alignItems: "stretch",
        }}
      >
        {vendors.map((vendor) => (
          <Box
            key={vendor.vendorId}
            sx={{
              flex: "1 1 280px", // fixed-width feel, responsive wrap
              maxWidth: "320px", // prevents cards from stretching too wide
            }}
          >
            <VendorItem vendor={vendor} onDelete={onDelete} />
          </Box>
        ))}
      </Box>
    </Box>
  );
});

export default VendorList;
