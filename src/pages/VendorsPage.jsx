import { useContext, useEffect, useState } from "react";
import { VendorContext } from "../contexts/VendorContext";
import { useLocation, useNavigate } from "react-router-dom";
import Notification from "../components/ui/Notification";
import VendorList from "../components/vendor/VendorList";
import VendorModal from "../components/vendor/modals/VendorModal";

const VendorsPage = () => {
  const [editorState, setEditorState] = useState({
    open: false,
    initialVendor: null,
  });

  const [notification, setNotification] = useState(null);

  const { vendors, addVendor, updateVendor, deleteVendor } =
    useContext(VendorContext);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.notification) {
      setNotification(location.state.notification);
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.state, navigate]);

  const handleAddClick = () => {
    setEditorState({
      open: true,
      initialVendor: {},
    });
  };

  const handleEditClick = (vendor) => {
    setEditorState({
      open: true,
      initialVendor: vendor,
    });
  };

  const handleDeleteVendor = async (vendorId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this vendor?"
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
  };

  const closeModal = () => {
    setEditorState({
      open: false,
      initialVendor: null,
    });
  };

  const handleSubmitVendor = async (vendorDraft) => {
    const result = editorState.initialVendor?.vendorId
      ? await updateVendor(vendorDraft)
      : await addVendor(vendorDraft);

    if (result.success) {
      setNotification({
        type: "success",
        message: "Vendor Details Saved Successfully",
      });

      closeModal();
    } else {
      setNotification({
        type: "error",
        message: result.error,
      });
    }
  };

  return (
    <div className="vendors-page">
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <button onClick={handleAddClick}>Add</button>
      <VendorList
        vendors={vendors}
        onEdit={handleEditClick}
        onDelete={handleDeleteVendor}
      />
      {editorState.open && (
        <VendorModal
          vendor={editorState.initialVendor}
          onClose={closeModal}
          onSubmit={handleSubmitVendor}
        />
      )}
    </div>
  );
};

export default VendorsPage;
