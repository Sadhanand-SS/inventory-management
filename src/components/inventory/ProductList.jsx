import React from "react";
import ProductItem from "./ProductItem";
import { List, ListItem, Paper, Stack, Box, Typography } from "@mui/material";

const ProductList = React.memo(
  ({ products, onEdit, onDelete, onSelectProduct }) => {
    if (products.length === 0) {
      return (
        <Box sx={{p:2}}>
          <Paper elevation={1} sx={{ p: 4 }}>
          No Products Available.
        </Paper>
        </Box>
        
      );
    }

    return (
      <Box>
        <Typography variant="h5" sx={{p:2}}>Products</Typography>
        <List>
        {products.map((product) => (
          <ListItem sx={{ p: 2 }} key={product.productId}>
            <ProductItem
              product={product}
              onEdit={onEdit}
              onDelete={onDelete}
              onSelect={onSelectProduct}
            />
          </ListItem>
        ))}
      </List>
      </Box>
    );
  },
);

export default ProductList;
