import { useOutletContext } from "react-router-dom";

const VendorSummary = () => {
  const { overview } = useOutletContext();

  const { vendor } = overview;
  if (!vendor) {
    return <p>Loading vendor details...</p>;
  }

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString("en-IN");
  };
  const {
    vendorId: id,
    name,
    email,
    status,
    isActive,
    adminNotes,
    createdAt,
    updatedAt,
  } = vendor;

  return (
    <div className="vendor-summary-card">
      <div className="vendor-details-header">
        <h3 className="vendor-title">Vendor Information</h3>
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

        <div className="info-item">
          <span className="info-label">Active:</span>
          <span className="info-value">{isActive ? "Yes" : "No"}</span>
        </div>

        <div className="info-item">
          <span className="info-label">Created At:</span>
          <span className="info-value">{formatDate(createdAt)}</span>
        </div>

        <div className="info-item">
          <span className="info-label">Last Updated:</span>
          <span className="info-value">{formatDate(updatedAt)}</span>
        </div>
      </div>

      {typeof adminNotes === "string" &&
        adminNotes.trim() !== "" && (
          <div className="info-item">
            <span className="info-label">Notes:</span>
            <span className="info-value">{adminNotes}</span>
          </div>
        )}
    </div>
  );
};

export default VendorSummary;
