import { useCallback, useContext, useState, useMemo } from "react";
import {
  useParams,
  NavLink,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { InventoryContext } from "../contexts/InventoryContext";
import Notification from "../components/ui/Notification";
import {
  Box,
  Container,
  Stack,
  Typography,
  Tabs,
  Tab,
  Button,
} from "@mui/material";

const ProductPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { vendorId, productId } = useParams();
  const { products, updateProduct } = useContext(InventoryContext);

  const [notification, setNotification] = useState(null);

  const tabValue = useMemo(() => {
    if (location.pathname.endsWith("/settings")) return 1;
    return 0; // overview (default /product/:id)
  }, [location.pathname]);

  const currentProduct = useMemo(() => {
    return products.find(
      (product) =>
        product.vendorId === vendorId && product.productId === productId,
    );
  }, [products, vendorId, productId]);

  const handleProductUpdate = useCallback(
    async (updatedProduct) => {
      const result = await updateProduct(updatedProduct);

      if (result.success) {
        setNotification({
          type: "success",
          message: "Product updated successfully",
        });
      } else {
        setNotification({
          type: "error",
          message: result.error,
        });
      }
      return result;
    },
    [updateProduct],
  );

  const handleBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate(-1);
    }
  };

  const overviewCtx = useMemo(
    () => ({ product: currentProduct }),
    [currentProduct],
  );

  const settingsCtx = useMemo(
    () => ({
      product: currentProduct,
      onUpdate: handleProductUpdate,
    }),
    [currentProduct, handleProductUpdate],
  );

  if (!currentProduct) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Typography variant="h6">Product not found</Typography>
          <Button onClick={handleBack} sx={{ mt: 2 }}>
            Back to Inventory
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      {/* Back Button */}
      <Box sx={{ pt: 2 }}>
        <Button onClick={handleBack}>← Back</Button>
      </Box>

      {/* Header */}
      <Box sx={{ pt: 2, pb: 4 }}>
        <Stack gap={2}>
          <Typography variant="h5">{currentProduct.name}</Typography>
          <Typography variant="subtitle2" color="text.secondary">
            SKU: {currentProduct.identifiers?.sku || productId}
          </Typography>
        </Stack>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabValue} aria-label="Product detail tabs">
          <Tab label="Overview" component={NavLink} to="" end />
          <Tab label="Settings" component={NavLink} to="settings" />
        </Tabs>
      </Box>

      {/* Notifications */}
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Nested Routes */}
      <Outlet context={{ overview: overviewCtx, settings: settingsCtx }} />
    </Container>
  );
};

export default ProductPage;
