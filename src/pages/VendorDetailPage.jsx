import { useParams } from "react-router-dom";
import VendorSummary from "../components/vendor/VendorSummary";
import { useCallback, useContext, useMemo, useState } from "react";
import { VendorContext } from "../contexts/VendorContext";
import Notification from "../components/ui/Notification";
import AdminVendorInventoryPage from "./inventory/AdminVendorInventoryPage";

const VendorDetailPage = () => {
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

  return (
    <div className="vendor-detail-page">
      <div className="detail-page-container">
        {notification && (
          <div className="notification-overlay">
            <Notification
              type={notification.type}
              message={notification.message}
              onClose={() => setNotification(null)}
            />
          </div>
        )}

        <header className="page-header">
          <h1 className="page-title">Vendor Management</h1>
        </header>

        <main className="detail-content">
          <section className="summary-section">
            <VendorSummary vendor={currentVendor} onEdit={handleVendorUpdate} />
          </section>

          <section className="inventory-section">
            <div className="section-header">
              <h2 className="section-title">Vendor Inventory</h2>
            </div>
            <AdminVendorInventoryPage vendorId={vendorId} />
          </section>
        </main>
      </div>
    </div>
  );
};

export default VendorDetailPage;
