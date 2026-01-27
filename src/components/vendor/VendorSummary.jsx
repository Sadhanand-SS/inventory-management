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

  const handleSubmitVendor = async (vendorDraft) => {
    const result = await onEdit(vendorDraft);

    if (result.success) {
      closeModal();
    }
  };

  if (!vendor) {
    return <p>Loading vendor details...</p>;
  }

  const { vendorId: id, name, email, status } = vendor;

  return (
    <div className="vendor-summary-card">
      <div className="vendor-details-header">
        <h3 className="vendor-title">Vendor Information</h3>
        <button className="btn-edit-vendor" onClick={handleEditClick}>
          Edit Profile
        </button>
      </div>

      <div className="vendor-info-grid">
        <div className="info-item">
          <span className="info-label">Vendor ID:</span>
          <span className="info-value">{id}</span>
        </div>

        <div className="info-item">
          <span className="info-label">Name:</span>
          <span className="info-value">{name}</span>
        </div>

        <div className="info-item">
          <span className="info-label">Email:</span>
          <span className="info-value">{email}</span>
        </div>

        <div className="info-item">
          <span className="info-label">Status:</span>
          <span className={`status-badge status-${status.toLowerCase()}`}>
            {status}
          </span>
        </div>
      </div>

      {isEditOpen && (
        <div className="vendor-modal-overlay">
          <VendorModal
            vendor={vendor}
            onClose={closeModal}
            onSubmit={handleSubmitVendor}
          />
        </div>
      )}
    </div>
  );
};

export default VendorSummary;
