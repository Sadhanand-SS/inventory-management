import VendorForm from "./VendorForm";

const VendorModal = ({ onClose, onSubmit }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container vendor-modal">
        <div className="modal-header">
          <h2 className="modal-title">
            Add Vendor
          </h2>
        </div>

        <div className="modal-body">
          {/* VendorForm receives vendor for prefill */}
          <VendorForm onSubmit={onSubmit} />
        </div>

        <div className="modal-footer">
          <button className="btn-modal-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default VendorModal;
