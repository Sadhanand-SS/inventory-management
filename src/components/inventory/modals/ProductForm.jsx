import {
  Button,
  TextField,
  FormControlLabel,
  Switch,
  Stack,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";

const ProductForm = ({ onSubmit, onClose }) => {
  const nameInputRef = useRef(null);
  const isSubmittingRef = useRef(false);

  // ---------- STATE (Exactly as you had it) ----------
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [mrp, setMrp] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [taxIncluded, setTaxIncluded] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [sku, setSku] = useState("");

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;

    const formProduct = {
      name: name.trim(),
      description: description.trim(),
      category: category.trim(),
      subCategory: subCategory.trim(),
      pricing: { mrp, sellingPrice, taxIncluded },
      stock: { quantity },
      identifiers: { sku },
    };
    onSubmit(formProduct);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "24px" }}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h5" gutterBottom>
            Create Product
          </Typography>

          <Stack spacing={3}>
            <Typography variant="subtitle2" color="textSecondary">
              BASIC DETAILS
            </Typography>
            <Stack direction="row" spacing={2}>
              <TextField
                label="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                fullWidth
                inputRef={nameInputRef}
              />
              <TextField
                label="Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
                fullWidth
              />
            </Stack>
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              fullWidth
              multiline
              rows={2}
            />

            <Typography variant="subtitle2" color="textSecondary">
              CATEGORY
            </Typography>
            <Stack direction="row" spacing={2}>
              <TextField
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                fullWidth
              />
              <TextField
                label="Sub Category"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                required
                fullWidth
              />
            </Stack>

            <Typography variant="subtitle2" color="textSecondary">
              PRICING
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <TextField
                label="MRP"
                type="number"
                value={mrp}
                onChange={(e) => setMrp(Number(e.target.value))}
                required
                fullWidth
              />
              <TextField
                label="Selling Price"
                type="number"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(Number(e.target.value))}
                required
                fullWidth
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={taxIncluded}
                    onChange={(e) => setTaxIncluded(e.target.checked)}
                  />
                }
                label="Tax"
              />
            </Stack>

            <Typography variant="subtitle2" color="textSecondary">
              INVENTORY
            </Typography>
            <Stack direction="row" spacing={2}>
              <TextField
                label="Quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                required
                fullWidth
              />
              <TextField
                label="SKU"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                required
                fullWidth
              />
            </Stack>

            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button onClick={onClose} color="inherit">
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Save Product
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default ProductForm;
