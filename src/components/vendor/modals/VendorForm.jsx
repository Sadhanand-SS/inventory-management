import { useEffect, useRef, useState } from "react";

const VendorForm = ({ vendor, onSubmit }) => {
  const isSubmittingRef = useRef(false);
  const nameInputRef = useRef(null);

  const safeVendor = vendor || {};

  const [name, setName] = useState(safeVendor.name || "");
  const [email, setEmail] = useState(safeVendor.email || "");
  const [status, setStatus] = useState(
    safeVendor.vendorId ? safeVendor.status : "active",
  );

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    const updatedVendor = {
      ...vendor, // preserves id during EDIT
      name: name.trim(),
      email: email.trim(),
      status: status.trim(),
    };

    onSubmit(updatedVendor);
  };

  return (
    <form className="vendor-form" onSubmit={handleSubmit}>
      <div className="form-sections">
        {/* Text Inputs Section */}
        <div className="form-group">
          <label className="form-label" htmlFor="vendor-name">
            Vendor Name
          </label>
          <input
            id="vendor-name"
            className="form-input"
            ref={nameInputRef}
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="vendor-email">
            Email Address
          </label>
          <input
            id="vendor-email"
            className="form-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Radio Group Section */}
        <div className="form-group status-selection">
          <span className="form-label">Vendor Status</span>
          <div className="radio-group">
            <label className="radio-label">
              <input
                className="radio-input"
                type="radio"
                name="status"
                value="active"
                checked={status === "active"}
                onChange={(e) => setStatus(e.target.value)}
              />
              <span className="radio-text">Active</span>
            </label>

            <label className="radio-label">
              <input
                className="radio-input"
                type="radio"
                name="status"
                value="inactive"
                checked={status === "inactive"}
                onChange={(e) => setStatus(e.target.value)}
              />
              <span className="radio-text">Inactive</span>
            </label>
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button className="btn-save-vendor" type="submit">
          Save Vendor Details
        </button>
      </div>
    </form>
  );
};
export default VendorForm;
