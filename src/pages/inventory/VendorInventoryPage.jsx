import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { VendorContext } from "../../contexts/VendorContext";
import { InventoryContext } from "../../contexts/InventoryContext";
import InventorySummary from "../../components/inventory/InventorySummary";
import ProductList from "../../components/inventory/ProductList";
import ProductModal from "../../components/inventory/modals/ProductModal";
import Notification from "../../components/ui/Notification";
import {
  Box,
  Button,
  Stack,
  Typography,
  Paper,
  Container,
} from "@mui/material";

const VendorInventoryPage = () => {
  const { vendorId: activeVendorId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { vendors } = useContext(VendorContext);
  const { products, addProduct, updateProduct, deleteProduct } =
    useContext(InventoryContext);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (location.state?.notification) {
      setNotification(location.state.notification);
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.pathname, navigate]);

  const activeVendor = useMemo(() => {
    return vendors.find((vendor) => vendor.vendorId === activeVendorId);
  }, [vendors, activeVendorId]);

  const isVendorActive =
    activeVendor?.status === "approved" && activeVendor?.isActive === true;

  const vendorsLoaded = vendors.length > 0;
  const isAllowed = vendorsLoaded && !!activeVendor && isVendorActive;

  const vendorProducts = useMemo(() => {
    return products.filter((p) => p.vendorId === activeVendorId);
  }, [products, activeVendorId]);

  useEffect(() => {
    if (!vendorsLoaded) return;
    if (!isAllowed) {
      navigate("/unauthorized", { replace: true });
    }
  }, [isAllowed, vendorsLoaded, navigate]);

  const handleAddClick = () => {
    setIsAddOpen(true);
  };

  const closeModal = useCallback(() => {
    setIsAddOpen(false);
  }, []);

  const handleDeleteProduct = useCallback(
    async (productId) => {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this product ?",
      );

      if (!isConfirmed) return;

      const result = await deleteProduct(productId);

      if (result.success) {
        setNotification({
          type: "success",
          message: "Product deleted successfully",
        });
      } else {
        setNotification({
          type: "error",
          message: result.error,
        });
      }
    },
    [deleteProduct],
  );

  const handleSubmitProduct = useCallback(
    async (productDraft) => {
      const result = await addProduct({
        ...productDraft,
        vendorId: activeVendorId,
      });

      if (result.success) {
        setNotification({
          type: "success",
          message: "Product saved Successfully",
        });
        closeModal();
      } else {
        setNotification({
          type: "error",
          message: result.error,
        });
      }
    },
    [addProduct, closeModal],
  );

  const handleSelectProduct = useCallback(
    (productId) => {
      navigate(`/inventory/${activeVendorId}/${productId}`, {
        state: {
          from: `/inventory/${activeVendorId}`,
        },
      });
    },
    [navigate, activeVendorId],
  );

  if (vendorsLoaded && !isAllowed) {
    return null;
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {notification && (
          <div className="admin-notification-layer">
            <Notification
              type={notification.type}
              message={notification.message}
              onClose={() => setNotification(null)}
            />
          </div>
        )}

        <Stack spacing={3}>
          {/* Header */}
          <Paper elevation={1} sx={{ p: 2 }}>
            <Stack spacing={1.5}>
              <Typography variant="h5">Inventory Management</Typography>

              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                gap={2}
              >
                <Typography variant="subtitle2" color="text.secondary">
                  Monitor and update your product stock levels.
                </Typography>

                <Button variant="contained" onClick={handleAddClick}>
                  Add Product
                </Button>
              </Stack>
            </Stack>
          </Paper>

          {/* Summary */}
          <InventorySummary products={vendorProducts} />

          {/* Product List */}
          <ProductList
            products={vendorProducts}
            onDelete={handleDeleteProduct}
            onSelectProduct={handleSelectProduct}
          />
        </Stack>

        {/* Modal */}
        <ProductModal
          open={isAddOpen}
          onClose={closeModal}
          onSubmit={handleSubmitProduct}
        />
      </Box>
    </Container>
  );
};

export default VendorInventoryPage;
