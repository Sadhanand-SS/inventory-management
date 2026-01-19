import { useContext } from "react";
import { VendorContext } from "../../contexts/VendorContext";

const VendorSummary = ({ vendorId }) => {
  const { vendors, updateVendor } = useContext(VendorContext);
  const currentVendor = vendors.find(
    (vendor) => vendor.vendorId === vendorId
  );

  if (!currentVendor) {
    return <p>Loading vendor details...</p>;
  }

  const { vendorId: id, name, email, status } = currentVendor;

  return (
    <div>
      <p>Vendor ID: {id}</p>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      <p>Status: {status}</p>
    </div>
  );
};

export default VendorSummary;
