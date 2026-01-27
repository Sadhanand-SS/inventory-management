import React from "react";
import { useNavigate } from "react-router-dom";

const VendorItem = React.memo(({ vendor, onDelete }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/vendors/${vendor.vendorId}`);
  };

  return (
    <div className="vendor-item">
      <div className="vendor-item-content">
        <div className="vendor-primary-info">
          <span
            className="vendor-clickable-name"
            onClick={handleClick}
            style={{ cursor: "pointer" }}
          >
            {vendor.name}
          </span>
        </div>

        <div className="vendor-secondary-info">
          <span
            className={`vendor-status-pill status-${vendor.status.toLowerCase()}`}
          >
            {vendor.status}
          </span>
        </div>
      </div>

      <div className="vendor-item-actions">
        <button
          className="btn-delete-vendor"
          onClick={() => onDelete(vendor.vendorId)}
          aria-label={`Delete ${vendor.name}`}
        >
          Delete
        </button>
      </div>
    </div>
  );
});

export default VendorItem;
