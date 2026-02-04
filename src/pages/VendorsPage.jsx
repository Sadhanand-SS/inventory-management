import { useCallback, useContext, useEffect, useState } from "react";
import { VendorContext } from "../contexts/VendorContext";
import { useLocation, useNavigate } from "react-router-dom";
import Notification from "../components/ui/Notification";
import VendorList from "../components/vendor/VendorList";
import VendorModal from "../components/vendor/modals/VendorModal";
import {
  Box,
  Container,
  Stack,
  Typography,
  Button,
  Paper,
} from "@mui/material";

const VendorsPage = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const { vendors, addVendor, deleteVendor } = useContext(VendorContext);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.notification) {
      setNotification(location.state.notification);
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.state, navigate]);

  const handleAddClick = () => {
    setIsAddOpen(true);
  };

  const handleDeleteVendor = useCallback(
    async (vendorId) => {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this vendor?",
      );

      if (!isConfirmed) return;

      const result = await deleteVendor(vendorId);

      if (result.success) {
        setNotification({
          type: "success",
          message: "Vendor deleted successfully",
        });
      } else {
        setNotification({
          type: "error",
          message: result.error,
        });
      }
    },
    [deleteVendor],
  );

  const closeModal = useCallback(() => {
    setIsAddOpen(false);
  }, []);

  const handleSubmitVendor = useCallback(
    async (vendorDraft) => {
      const result = await addVendor(vendorDraft);

      if (result.success) {
        setNotification({
          type: "success",
          message: "Vendor added successfully",
        });
        closeModal();
      } else {
        setNotification({
          type: "error",
          message: result.error,
        });
      }
    },
    [addVendor, closeModal],
  );

  return (
    <Container maxWidth="lg" disableGutters>
      <Box sx={{ px: 3, py: 4 }}>
        {notification && (
          <Notification
            type={notification.type}
            message={notification.message}
            onClose={() => setNotification(null)}
          />
        )}

        <Paper elevation={1} sx={{ px: 3, py: 2, mb: 3 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap={2}
          >
            <Stack spacing={0.5}>
              <Typography variant="h5">Vendor Directory</Typography>
              <Typography variant="subtitle2" color="text.secondary">
                Manage and monitor all registered product vendors.
              </Typography>
            </Stack>

            <Button variant="contained" onClick={handleAddClick}>
              Add New Vendor
            </Button>
          </Stack>
        </Paper>

        <VendorList vendors={vendors} onDelete={handleDeleteVendor} />

        <VendorModal
          open={isAddOpen}
          onClose={closeModal}
          onSubmit={handleSubmitVendor}
        />
      </Box>
    </Container>
  );
};

export default VendorsPage;
