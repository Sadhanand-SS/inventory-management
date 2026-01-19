import { useState } from "react";

const VendorForm = ({ vendor, onSubmit }) => {
  const safeVendor = vendor || {};

  const [name, setName] = useState(safeVendor.name || "");
  const [email, setEmail] = useState(safeVendor.email || "");
  const [status, setStatus] = useState(
    safeVendor.vendorId ? safeVendor.status : "active"
  );

  const handleSubmit = (e) => {
    e.preventDefault();

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
