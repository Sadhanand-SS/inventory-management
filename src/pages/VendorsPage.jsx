import { useCallback, useContext, useEffect, useState } from "react";
import { VendorContext } from "../contexts/VendorContext";
import { useLocation, useNavigate } from "react-router-dom";
import Notification from "../components/ui/Notification";
import VendorList from "../components/vendor/VendorList";
import VendorModal from "../components/vendor/modals/VendorModal";

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
    <div className="vendors-page">
      <div className="page-container">
        {notification && (
          <div className="notification-container">
            <Notification
              type={notification.type}
              message={notification.message}
              onClose={() => setNotification(null)}
            />
          </div>
        )}

        <div className="page-header">
          <div className="header-text">
            <h1 className="page-title">Vendor Directory</h1>
            <p className="page-description">
              Manage and monitor all registered product vendors.
            </p>
          </div>

          <div className="header-actions">
            <button className="btn-add-primary" onClick={handleAddClick}>
              <span className="icon">+</span> Add New Vendor
            </button>
          </div>
        </div>

        <main className="page-content">
          <div className="list-card-view">
            <VendorList vendors={vendors} onDelete={handleDeleteVendor} />
          </div>
        </main>

        {isAddOpen && (
          <div className="modal-layer">
            <VendorModal
              vendor={{}}
              onClose={closeModal}
              onSubmit={handleSubmitVendor}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorsPage;
