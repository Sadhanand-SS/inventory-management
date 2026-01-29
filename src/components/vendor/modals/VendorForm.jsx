import { useEffect, useRef, useState } from "react";

const VendorForm = ({ onSubmit }) => {
  const isSubmittingRef = useRef(false);
  const nameInputRef = useRef(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    const newVendor = {
      name: name.trim(),
      email: email.trim(),
      adminNotes : notes.trim()
    };

    onSubmit(newVendor);
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

        <div className="form-group">
          <label className="form-label" htmlFor="vendor-notes">
            Notes
          </label>
          <input
            id="vendor-notes"
            className="form-input"
            type="text"
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
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
