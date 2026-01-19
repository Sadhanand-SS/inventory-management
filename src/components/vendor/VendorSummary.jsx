import { useState } from "react";
import VendorModal from "./modals/VendorModal";

const VendorSummary = ({ vendor, onEdit }) => {
  const [isEditOpen, setEditOpen] = useState(false);

  const handleEditClick = () => {
    setEditOpen(true);
  };

  const closeModal = () => {
    setEditOpen(false);
  };

  const handleSubmitVendor = (vendorDraft) => {
    const result = onEdit(vendorDraft);

    if (result.success) {
      closeModal();
    }
  };

  if (!vendor) {
    return <p>Loading vendor details...</p>;
  }

  const { vendorId: id, name, email, status } = vendor;

  return (
    <div>
      <p>Vendor ID: {id}</p>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      <p>Status: {status}</p>

      <button onClick={handleEditClick}>Edit</button>

      {isEditOpen && (
        <VendorModal
          vendor={vendor}
          onClose={closeModal}
          onSubmit={handleSubmitVendor}
        />
      )}
    </div>
  );
};

export default VendorSummary;
