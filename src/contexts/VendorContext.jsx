import { createContext, useState } from "react";

import {
  isValidObject,
  REQUIRED_FIELDS_ADD,
  REQUIRED_FIELDS_UPDATE,
} from "../utils/vendorHelper.js";

export const VendorContext = createContext(null);

const VendorProvider = ({ children }) => {
  const [vendors, setVendors] = useState([
    {
      vendorId: "V-101",
      name: "Vendor One",
      email: "vendor1@example.com",
      status: "active",
    },
    {
      vendorId: "V-102",
      name: "Vendor Two",
      email: "vendor2@example.com",
      status: "active",
    },
    {
      vendorId: "V-103",
      name: "Vendor Three",
      email: "vendor3@example.com",
      status: "inactive",
    },
  ]);

  const addVendor = (vendorDraft) => {
    if (!isValidObject(vendorDraft, REQUIRED_FIELDS_ADD))
      return {
        success: false,
        error: "INVALID_VENDOR_DETAILS",
      };

    setVendors((prevVendors) => [
      ...prevVendors,
      { ...vendorDraft, vendorId: `V-${Date.now()}` },
    ]);
    return { success: true };
  };

  const updateVendor = (vendor) => {
    if (!isValidObject(vendor, REQUIRED_FIELDS_UPDATE))
      return {
        success: false,
        error: "INVALID_VENDOR_DETAILS",
      };

    setVendors((prevVendors) =>
      prevVendors.map((p) =>
        p.vendorId === vendor.vendorId ? { ...p, ...vendor } : p,
      ),
    );
    return { success: true };
  };

  const deleteVendor = (vendorId) => {
    return new Promise((resolve) => {
      setVendors((prevVendors) => {
        const exists = prevVendors.some(
          (vendor) => vendor.vendorId === vendorId,
        );

        if (!exists) {
          resolve({ success: false, error: "VENDOR_NOT_FOUND" });
          return prevVendors;
        }

        resolve({ success: true });
        return prevVendors.filter((vendor) => vendor.vendorId !== vendorId);
      });
    });
  };

  const value = {
    vendors,
    addVendor,
    updateVendor,
    deleteVendor,
  };

  return (
    <VendorContext.Provider value={value}> {children}</VendorContext.Provider>
  );
};

export default VendorProvider;
