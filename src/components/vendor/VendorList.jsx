import React from "react";
import VendorItem from "./VendorItem";

const VendorList = React.memo(({ vendors, onDelete }) => {
  if (vendors.length === 0) return <p>No Vendors available.</p>;

  return (
    <ul>
      {vendors.map((vendor) => (
        <VendorItem key={vendor.vendorId} vendor={vendor} onDelete={onDelete} />
      ))}
    </ul>
  );
});

export default VendorList;
