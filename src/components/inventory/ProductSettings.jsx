import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Stack,
  Typography,
  Paper,
  Switch,
  FormControlLabel,
} from "@mui/material";

const ProductSettings = () => {
  const { settings } = useOutletContext();
  const { product, onUpdate } = settings;

  const [isEditOpen, setEditOpen] = useState(false);
  const [productDraft, setProductDraft] = useState({ ...product });

  useEffect(() => {
    setProductDraft({ ...product });
  }, [product]);

  const handleEditClick = (e) => {
    e.preventDefault();
    setEditOpen(true);
  };

  const closeModal = () => {
    setEditOpen(false);
    setProductDraft({ ...product });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setProductDraft((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]:
            type === "number"
              ? parseFloat(value) || 0
              : type === "checkbox"
                ? checked
                : value,
        },
      }));
    } else {
      setProductDraft((prev) => ({
        ...prev,
        [name]:
          type === "checkbox"
            ? checked
            : type === "number"
              ? parseFloat(value) || 0
              : value,
      }));
    }
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    const result = await onUpdate(productDraft);
    if (result?.success) {
      setEditOpen(false);
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box>
          <Typography variant="h5">Product Settings</Typography>
          <Typography variant="body2" color="text.secondary">
            Manage product identification, pricing, and inventory levels
          </Typography>
        </Box>

        {!isEditOpen ? (
          <Button variant="contained" onClick={handleEditClick}>
            Edit Product
          </Button>
        ) : (
          <Stack direction="row" spacing={2}>
            <Button onClick={closeModal} color="inherit">
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              form="product-settings-form"
            >
              Save Changes
            </Button>
          </Stack>
        )}
      </Stack>

      <form id="product-settings-form" onSubmit={handleSubmitProduct}>
        <Stack spacing={3}>
          {/* BASIC DETAILS */}
          <Typography variant="subtitle2" color="text.secondary">
            BASIC DETAILS
          </Typography>

          <Stack direction="row" spacing={2}>
            <TextField
              label="Product Name"
              name="name"
              value={productDraft.name || ""}
              onChange={handleChange}
              fullWidth
              InputProps={{ readOnly: !isEditOpen }}
            />
            <TextField
              label="Brand"
              name="brand"
              value={productDraft.brand || ""}
              onChange={handleChange}
              fullWidth
              InputProps={{ readOnly: !isEditOpen }}
            />
          </Stack>

          <TextField
            label="Description"
            name="description"
            value={productDraft.description || ""}
            onChange={handleChange}
            fullWidth
            multiline
            rows={2}
            InputProps={{ readOnly: !isEditOpen }}
          />

          {/* CATEGORY */}
          <Typography variant="subtitle2" color="text.secondary">
            CATEGORY
          </Typography>

          <Stack direction="row" spacing={2}>
            <TextField
              label="Category"
              name="category"
              value={productDraft.category || ""}
              onChange={handleChange}
              fullWidth
              InputProps={{ readOnly: !isEditOpen }}
            />
            <TextField
              label="Sub Category"
              name="subCategory"
              value={productDraft.subCategory || ""}
              onChange={handleChange}
              fullWidth
              InputProps={{ readOnly: !isEditOpen }}
            />
          </Stack>

          {/* PRICING */}
          <Typography variant="subtitle2" color="text.secondary">
            PRICING
          </Typography>

          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              label="MRP (INR)"
              type="number"
              name="pricing.mrp"
              value={productDraft.pricing?.mrp || 0}
              onChange={handleChange}
              fullWidth
              InputProps={{ readOnly: !isEditOpen }}
            />
            <TextField
              label="Selling Price (INR)"
              type="number"
              name="pricing.sellingPrice"
              value={productDraft.pricing?.sellingPrice || 0}
              onChange={handleChange}
              fullWidth
              InputProps={{ readOnly: !isEditOpen }}
            />
            <FormControlLabel
              control={
                <Switch
                  name="pricing.taxIncluded"
                  checked={productDraft.pricing?.taxIncluded || false}
                  onChange={handleChange}
                  disabled={!isEditOpen}
                />
              }
              label="Tax Included"
            />
          </Stack>

          {/* INVENTORY */}
          <Typography variant="subtitle2" color="text.secondary">
            INVENTORY
          </Typography>

          <Stack direction="row" spacing={2}>
            <TextField
              label="Quantity"
              type="number"
              name="stock.quantity"
              value={productDraft.stock?.quantity || 0}
              onChange={handleChange}
              fullWidth
              InputProps={{ readOnly: !isEditOpen }}
            />
            <TextField
              label="Low Stock Threshold"
              type="number"
              name="stock.lowStockThreshold"
              value={productDraft.stock?.lowStockThreshold || 0}
              onChange={handleChange}
              fullWidth
              InputProps={{ readOnly: !isEditOpen }}
            />
          </Stack>

          {/* VISIBILITY */}
          <Typography variant="subtitle2" color="text.secondary">
            VISIBILITY
          </Typography>

          <FormControlLabel
            control={
              <Switch
                name="isActive"
                checked={!!productDraft.isActive}
                onChange={handleChange}
                disabled={!isEditOpen}
              />
            }
            label={productDraft.isActive ? "Active" : "Inactive"}
          />
        </Stack>
      </form>
    </Paper>
  );
};

export default ProductSettings;
