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
    if(isSubmittingRef.current)
      return;
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
    <form onSubmit={handleSubmit}>
      <input
        ref={nameInputRef}
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <div>
        <label>
          <input
            type="radio"
            name="status"
            value="active"
            checked={status === "active"}
            onChange={(e) => setStatus(e.target.value)}
          />
          Active
        </label>

        <label>
          <input
            type="radio"
            name="status"
            value="inactive"
            checked={status === "inactive"}
            onChange={(e) => setStatus(e.target.value)}
          />
          Inactive
        </label>
      </div>

      <button type="submit">Save</button>
    </form>
  );
};
export default VendorForm;
