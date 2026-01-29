import { useCallback, useContext, useMemo, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { VendorContext } from "../contexts/VendorContext";
import Notification from "../components/ui/Notification";

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
    <div className="detail-page-container">
      {/* 1. Header Section */}
      <header className="vendor-details-header">
        <div className="view-title-group">
          <h2 className="page-title">{currentVendor.name}</h2>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginTop: "4px",
            }}
          >
            <span className="page-description">Vendor ID: {vendorId}</span>
            <span className={`status-badge status-${currentVendor.status}`}>
              {currentVendor.status}
            </span>
          </div>
        </div>
      </header>

      {/* 2. Navigation Tab Bar */}
      <nav className="tab-navigation">
        <NavLink
          end
          to=""
          className={({ isActive }) =>
            isActive ? "tab-link active" : "tab-link"
          }
        >
          Overview
        </NavLink>
        <NavLink
          to="inventory"
          className={({ isActive }) =>
            isActive ? "tab-link active" : "tab-link"
          }
        >
          Inventory
        </NavLink>
        <NavLink
          to="settings"
          className={({ isActive }) =>
            isActive ? "tab-link active" : "tab-link"
          }
        >
          Settings
        </NavLink>
      </nav>

      {/* 3. Notification Handling */}
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      {/* 4. Sub-route Content */}
      <div className="tab-content-wrapper">
        <Outlet
          context={{
            overview: overviewCtx,
            inventory: inventoryCtx,
            settings: settingsCtx,
          }}
        />
      </div>
    </div>
  );
};

export default VendorDetailPage;
