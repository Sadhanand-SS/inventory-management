import { useCallback, useContext, useMemo, useState } from "react";
import { NavLink, Outlet, useParams, useLocation } from "react-router-dom";
import { VendorContext } from "../contexts/VendorContext";
import Notification from "../components/ui/Notification";
import { Box, Container, Stack, Typography, Tabs, Tab } from "@mui/material";

const VendorDetailPage = () => {
  const location = useLocation();

  const tabValue = useMemo(() => {
    if (location.pathname.endsWith("/overview")) return 0;
    if (location.pathname.endsWith("/inventory")) return 1;
    if (location.pathname.endsWith("/settings")) return 2;
    return 0;
  }, [location.pathname]);

  const { vendorId } = useParams();
  const { vendors, updateVendor } = useContext(VendorContext);

  const [notification, setNotification] = useState(null);

  const handleVendorUpdate = useCallback(
    async (updatedVendor) => {
      const result = await updateVendor(updatedVendor);

      if (result.success) {
        setNotification({
          type: "success",
          message: "Vendor updated successfully",
        });
      } else {
        setNotification({
          type: "error",
          message: result.error,
        });
      }

      return result;
    },
    [updateVendor],
  );

  const currentVendor = useMemo(() => {
    return vendors.find((vendor) => vendor.vendorId === vendorId);
  }, [vendors, vendorId]);

  const overviewCtx = useMemo(
    () => ({
      vendor: currentVendor,
    }),
    [currentVendor],
  );

  const inventoryCtx = useMemo(
    () => ({
      vendorId: vendorId,
    }),
    [vendorId],
  );

  const settingsCtx = useMemo(
    () => ({
      vendor: currentVendor,
      onEdit: handleVendorUpdate,
    }),
    [currentVendor, handleVendorUpdate],
  );

  if (!currentVendor) return null;

  return (
    <Container maxWidth="lg">
      <Box sx={{ pt: 4, pb: 4 }}>
        <Stack gap={2}>
          <Typography variant="h5">{currentVendor.name}</Typography>
          <Stack direction="row" gap={2}>
            <Typography variant="subtitle2">
              Vendor ID : {currentVendor.vendorId}
            </Typography>
            <Typography variant="subtitle2">{currentVendor.status}</Typography>
          </Stack>
        </Stack>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabValue} aria-label="Vendor detail tabs">
          <Tab label="Overview" component={NavLink} to="overview" />
          <Tab label="Inventory" component={NavLink} to="inventory" />
          <Tab label="Settings" component={NavLink} to="settings" />
        </Tabs>
      </Box>

      {/* 3. Notification Handling */}
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
      <Outlet
        context={{
          overview: overviewCtx,
          inventory: inventoryCtx,
          settings: settingsCtx,
        }}
      />
    </Container>
  );
};

export default VendorDetailPage;
