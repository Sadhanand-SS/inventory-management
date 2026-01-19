import VendorForm from "./VendorForm";

const VendorModal = ({ vendor, onClose, onSubmit }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>{vendor.vendorId ? "Edit Vendor" : "Add Vendor"}</h2>

        <VendorForm vendor={vendor} onSubmit={onSubmit} />

        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};
export default VendorModal;
