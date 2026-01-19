import { useParams } from "react-router-dom";
import VendorSummary from "../components/vendor/VendorSummary";
import { useContext, useState } from "react";
import { VendorContext } from "../contexts/VendorContext";
import Notification from "../components/ui/Notification";
import InventoryPage from "./InventoryPage";

const VendorDetailPage = () => {
  const { vendorId } = useParams();
  const { vendors, updateVendor } = useContext(VendorContext);

  const [notification, setNotification] = useState(null);

  const handleVendorUpdate = (updatedVendor) => {
    const result = updateVendor(updatedVendor);

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
  };

  const currentVendor = vendors.find((vendor) => vendor.vendorId === vendorId);

  return (
    <div className="vendor-detail-page">
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
      <VendorSummary vendor={currentVendor} onEdit={handleVendorUpdate} />
      <InventoryPage vendorId={vendorId} />
    </div>
  );
};

export default VendorDetailPage;
