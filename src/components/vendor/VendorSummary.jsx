import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import VendorModal from "./modals/VendorModal";

const VendorSummary = () => {
  const { overview } = useOutletContext();

  const { vendor } = overview;
  if (!vendor) {
    return <p>Loading vendor details...</p>;
  }

  const { vendorId: id, name, email, status } = vendor;

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
      </div>
    </div>
  );
};

export default VendorSummary;
