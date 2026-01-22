import React from "react";
import { useNavigate } from "react-router-dom";

const VendorItem = React.memo(({ vendor, onDelete }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/vendors/${vendor.vendorId}`);
  };

  return (
    <li className="vendor-item">
      <span onClick={handleClick} style={{ cursor: "pointer" }}>
        {vendor.name}
      </span>
      <span>{vendor.status}</span>
      <button onClick={() => onDelete(vendor.vendorId)}>Delete</button>
    </li>
  );
});

export default VendorItem;
