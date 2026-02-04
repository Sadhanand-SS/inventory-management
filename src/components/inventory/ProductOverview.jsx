import React from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Typography, Stack, Paper, Chip, Divider } from "@mui/material";
import { formatPrice, formatQuantity } from "../../utils/formatters";

const ProductOverview = () => {
  const { overview } = useOutletContext();
  const { product } = overview;

  if (!product) {
    return <Typography sx={{ py: 2 }}>Loading product details...</Typography>;
  }

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString("en-IN");
  };

  const InfoRow = ({ label, value, bold, strike }) => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontWeight: bold ? 600 : 400,
          textDecoration: strike ? "line-through" : "none",
        }}
      >
        {value}
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ py: 3 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Stack spacing={0.5}>
          <Typography variant="h5">{product.name}</Typography>
          <Typography variant="caption" color="text.secondary">
            SKU: {product.identifiers?.sku || product.productId}
          </Typography>
        </Stack>

        <Chip
          label={product.isActive ? "Active" : "Inactive"}
          color={product.isActive ? "success" : "default"}
          size="small"
        />
      </Box>

      {/* Top Row */}
      <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
        <Paper variant="outlined" sx={{ p: 2, minWidth: 220, flex: 1 }}>
          <Typography variant="subtitle2" gutterBottom>
            Identification
          </Typography>
          <Divider sx={{ mb: 1 }} />
          <Stack spacing={1}>
            <InfoRow label="Product ID" value={product.productId} />
            <InfoRow label="Vendor ID" value={product.vendorId} />
            <InfoRow
              label="SKU"
              value={product.identifiers?.sku || "N/A"}
              bold
            />
          </Stack>
        </Paper>

        <Paper variant="outlined" sx={{ p: 2, minWidth: 220, flex: 1 }}>
          <Typography variant="subtitle2" gutterBottom>
            Categorization
          </Typography>
          <Divider sx={{ mb: 1 }} />
          <Stack spacing={1}>
            <InfoRow label="Category" value={product.category} />
            <InfoRow
              label="Sub Category"
              value={product.subCategory || "N/A"}
            />
            <InfoRow label="Brand" value={product.brand || "N/A"} />
          </Stack>
        </Paper>

        <Paper variant="outlined" sx={{ p: 2, minWidth: 220, flex: 1 }}>
          <Typography variant="subtitle2" gutterBottom>
            Pricing (INR)
          </Typography>
          <Divider sx={{ mb: 1 }} />
          <Stack spacing={1}>
            <InfoRow label="MRP" value={formatPrice(product.pricing?.mrp)} />
            <InfoRow
              label="Selling Price"
              value={formatPrice(product.pricing?.sellingPrice)}
              bold
            />
            <InfoRow
              label="Tax Included"
              value={product.pricing?.taxIncluded ? "Yes" : "No"}
            />
          </Stack>
        </Paper>

        <Paper variant="outlined" sx={{ p: 2, minWidth: 220, flex: 1 }}>
          <Typography variant="subtitle2" gutterBottom>
            Inventory
          </Typography>
          <Divider sx={{ mb: 1 }} />
          <Stack spacing={1}>
            <InfoRow
              label="Current Stock"
              value={formatQuantity(product.stock?.quantity)}
              bold
            />
            <InfoRow
              label="Threshold"
              value={formatQuantity(product.stock?.lowStockThreshold)}
            />
          </Stack>
        </Paper>
      </Box>

      {/* Bottom Row */}
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Paper variant="outlined" sx={{ p: 2, flex: 2, minWidth: 300 }}>
          <Typography variant="subtitle2" gutterBottom>
            Description
          </Typography>
          <Divider sx={{ mb: 1 }} />
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
        </Paper>

        <Paper variant="outlined" sx={{ p: 2, flex: 1, minWidth: 220 }}>
          <Typography variant="subtitle2" gutterBottom>
            Metadata
          </Typography>
          <Divider sx={{ mb: 1 }} />
          <Stack spacing={1}>
            <InfoRow label="Created" value={formatDate(product.createdAt)} />
            <InfoRow
              label="Last Updated"
              value={formatDate(product.updatedAt)}
            />
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

export default ProductOverview;
