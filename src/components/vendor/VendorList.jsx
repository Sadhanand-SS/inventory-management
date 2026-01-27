import React from "react";
import VendorItem from "./VendorItem";

const VendorList = React.memo(({ vendors, onDelete }) => {
  if (vendors.length === 0) return <p>No Vendors available.</p>;

  return (
    <div className="vendor-list-container">
      <div className="vendor-list-header">
        <h2 className="list-title">Registered Vendors</h2>
        <span className="list-count">Total: {vendors.length}</span>
      </div>

      <ul className="vendor-list">
        {vendors.map((vendor) => (
          <li key={vendor.vendorId} className="vendor-list-item">
            <div className="vendor-item-card-wrapper">
              <VendorItem vendor={vendor} onDelete={onDelete} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default VendorList;
