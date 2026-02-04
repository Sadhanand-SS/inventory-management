import React from "react";

import { formatPrice, formatQuantity } from "../../utils/formatters";
import { Stack, Button, Typography, Paper } from "@mui/material";

const ProductItem = React.memo(({ product, onDelete, onSelect }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 3,
        width: "100%",
        borderRadius: 2,
        cursor: "pointer",
        transition: "background-color 0.2s ease",
        "&:hover": {
          backgroundColor: "action.hover",
        },
      }}
      onClick={() => onSelect(product.productId)}
    >
      <Stack>
        <Typography variant="subtitle1" sx={{ cursor: "pointer" }}>
          {product.name}
        </Typography>
        <Typography variant="subtitle2">{product.category}</Typography>
        <Typography variant="subtitle2">
          Qty:{" "}
          {Number.isNaN(product.stock.quantity)
            ? "--"
            : formatQuantity(product.stock.quantity)}
        </Typography>
        <Typography variant="subtitle2">
          {Number.isNaN(product.pricing.sellingPrice)
            ? "--"
            : formatPrice(product.pricing.sellingPrice)}
        </Typography>
      </Stack>
      <Button
        variant="outlined"
        size="small"
        color="error"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(product.productId);
        }}
      >
        Delete
      </Button>
    </Paper>
  );
});

export default ProductItem;
