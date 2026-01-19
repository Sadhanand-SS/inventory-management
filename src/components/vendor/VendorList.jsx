import VendorItem from "./VendorItem";

const VendorList = ({ vendors, onEdit, onDelete }) => {
  if (vendors.length === 0) return <p>No Vendors available.</p>;

  return (
    <ul>
      {vendors.map((vendor) => (
        <VendorItem
          key={vendor.vendorId}
          vendor={vendor}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default VendorList;
