import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const VendorSettings = () => {
  const { settings } = useOutletContext();
  const { vendor, onEdit } = settings;

  const [isEditOpen, setEditOpen] = useState(false);
  const [vendorDraft, setVendorDraft] = useState({ ...vendor });

  useEffect(() => {
    setVendorDraft({ ...vendor });
  }, [vendor]);

  const handleEditClick = (e) => {
    e.preventDefault();
    setEditOpen(true);
  };

  const closeModal = () => {
    setEditOpen(false);
    setVendorDraft({ ...vendor });
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setVendorDraft((prev) => ({
      ...prev,
      [name]:
        type === "radio" && name === "isActive" ? value === "true" : value,
    }));
  };

  const handleSubmitVendor = async (e) => {
    e.preventDefault();
    const result = await onEdit(vendorDraft);
    if (result?.success) {
      setEditOpen(false);
    }
  };

  return (
    <div className="detail-page-container">
      <header className="page-header">
        <div className="header-text">
          <h2 className="page-title">Vendor Settings</h2>
          <p className="page-description">
            Manage your profile and account status
          </p>
        </div>

        <div className="header-actions">
          {!isEditOpen ? (
            <button
              type="button"
              className="btn-edit"
              onClick={handleEditClick}
            >
              Edit Settings
            </button>
          ) : (
            <div style={{ display: "flex", gap: "12px" }}>
              <button type="button" className="btn-cancel" onClick={closeModal}>
                Cancel
              </button>
              <button
                type="submit"
                form="vendor-settings-form"
                className="btn-save-vendor"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="summary-card">
        <form
          id="vendor-settings-form"
          onSubmit={handleSubmitVendor}
          className="vendor-form"
        >
          {/* Name Field */}
          <div className="form-group">
            <label className="form-label">Vendor Name</label>
            <input
              type="text"
              name="name"
              value={vendorDraft.name || ""}
              onChange={handleChange}
              readOnly={!isEditOpen}
              className={`form-input ${!isEditOpen ? "input-readonly" : ""}`}
            />
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              value={vendorDraft.email || ""}
              onChange={handleChange}
              readOnly={!isEditOpen}
              className={`form-input ${!isEditOpen ? "input-readonly" : ""}`}
            />
          </div>

          {/* Status Radio Group */}
          <div className="form-group">
            <label className="form-label">Account Status</label>
            <div className="radio-group">
              <label
                className={`radio-label ${!isEditOpen ? "radio-disabled" : ""}`}
              >
                <input
                  type="radio"
                  name="status"
                  value="approved"
                  checked={vendorDraft.status === "approved"}
                  onChange={handleChange}
                  disabled={!isEditOpen}
                />
                Approved
              </label>
              <label
                className={`radio-label ${!isEditOpen ? "radio-disabled" : ""}`}
              >
                <input
                  type="radio"
                  name="status"
                  value="pending"
                  checked={vendorDraft.status === "pending"}
                  onChange={handleChange}
                  disabled={!isEditOpen}
                />
                Pending
              </label>
              <label
                className={`radio-label ${!isEditOpen ? "radio-disabled" : ""}`}
              >
                <input
                  type="radio"
                  name="status"
                  value="rejected"
                  checked={vendorDraft.status === "rejected"}
                  onChange={handleChange}
                  disabled={!isEditOpen}
                />
                Rejected
              </label>
            </div>
          </div>

          {/* isActive Radio Group */}
          <div className="form-group">
            <label className="form-label">Active</label>

            <div className="radio-group">
              <label
                className={`radio-label ${!isEditOpen ? "radio-disabled" : ""}`}
              >
                <input
                  type="radio"
                  name="isActive"
                  value="true"
                  checked={vendorDraft.isActive === true}
                  onChange={handleChange}
                  disabled={!isEditOpen}
                />
                Yes
              </label>

              <label
                className={`radio-label ${!isEditOpen ? "radio-disabled" : ""}`}
              >
                <input
                  type="radio"
                  name="isActive"
                  value="false"
                  checked={vendorDraft.isActive === false}
                  onChange={handleChange}
                  disabled={!isEditOpen}
                />
                No
              </label>
            </div>
          </div>

          {/* Notes Field */}
          <div className="form-group">
            <label className="form-label">Notes</label>
            <input
              type="text"
              name="adminNotes"
              value={vendorDraft.adminNotes || ""}
              onChange={handleChange}
              readOnly={!isEditOpen}
              className={`form-input ${!isEditOpen ? "input-readonly" : ""}`}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default VendorSettings;
