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
      vendorId: "VEND-001",
      name: "AULA",
      email: "business@aula-keyboards.com",
      status: "approved",
      isActive: true,
      adminNotes: "Mass-market mechanical keyboard manufacturer",
      createdAt: Date.parse("2025-01-05T09:30:00Z"),
      updatedAt: Date.parse("2025-01-18T11:15:00Z"),
    },
    {
      vendorId: "VEND-002",
      name: "Epomaker",
      email: "partners@epomaker.com",
      status: "approved",
      isActive: true,
      adminNotes: "Popular custom and enthusiast keyboards",
      createdAt: Date.parse("2025-01-03T12:10:00Z"),
      updatedAt: Date.parse("2025-01-20T16:40:00Z"),
    },
    {
      vendorId: "VEND-003",
      name: "Skyloong",
      email: "support@skyloong-keyboards.com",
      status: "pending",
      isActive: false,
      createdAt: Date.parse("2025-01-12T08:45:00Z"),
      updatedAt: Date.parse("2025-01-12T08:45:00Z"),
    },
    {
      vendorId: "VEND-004",
      name: "Royal Kludge",
      email: "sales@royalkludge.com",
      status: "approved",
      isActive: true,
      adminNotes: "Well-known wireless mechanical keyboards",
      createdAt: Date.parse("2025-01-01T10:00:00Z"),
      updatedAt: Date.parse("2025-01-22T14:25:00Z"),
    },
    {
      vendorId: "VEND-005",
      name: "MCHOSE",
      email: "contact@mchose-keyboards.com",
      status: "pending",
      isActive: false,
      createdAt: Date.parse("2025-01-14T15:30:00Z"),
      updatedAt: Date.parse("2025-01-14T15:30:00Z"),
    },
    {
      vendorId: "VEND-006",
      name: "Keychron",
      email: "business@keychron.com",
      status: "approved",
      isActive: true,
      adminNotes: "Strong presence in Mac & wireless keyboard market",
      createdAt: Date.parse("2024-12-28T09:00:00Z"),
      updatedAt: Date.parse("2025-01-21T18:10:00Z"),
    },
    {
      vendorId: "VEND-007",
      name: "Akko",
      email: "partners@akkogear.com",
      status: "approved",
      isActive: true,
      adminNotes: "Known for themed keyboards and switches",
      createdAt: Date.parse("2025-01-06T11:40:00Z"),
      updatedAt: Date.parse("2025-01-19T13:55:00Z"),
    },
    {
      vendorId: "VEND-008",
      name: "Ducky",
      email: "info@duckykeyboard.com",
      status: "approved",
      isActive: true,
      adminNotes: "High-quality enthusiast mechanical keyboards",
      createdAt: Date.parse("2025-01-02T14:20:00Z"),
      updatedAt: Date.parse("2025-01-17T10:05:00Z"),
    },
    {
      vendorId: "VEND-009",
      name: "Redragon",
      email: "vendor@redragonzone.com",
      status: "rejected",
      isActive: false,
      adminNotes: "Brand verification pending",
      createdAt: Date.parse("2025-01-04T16:10:00Z"),
      updatedAt: Date.parse("2025-01-08T09:35:00Z"),
    },
    {
      vendorId: "VEND-010",
      name: "Varmilo",
      email: "sales@varmilo.com",
      status: "approved",
      isActive: true,
      adminNotes: "Premium custom keyboard manufacturer",
      createdAt: Date.parse("2025-01-07T10:50:00Z"),
      updatedAt: Date.parse("2025-01-23T12:00:00Z"),
    },
  ]);

  const addVendor = (vendorDraft) => {
    if (!isValidObject(vendorDraft, REQUIRED_FIELDS_ADD)) {
      return {
        success: false,
        error: "INVALID_VENDOR_DETAILS",
      };
    }

    const timestamp = Date.now();

    const newVendor = {
      vendorId: `VEND-${timestamp}`,
      name: vendorDraft.name,
      email: vendorDraft.email,
      adminNotes: vendorDraft.adminNotes ?? "",
      status: "pending",
      isActive: false,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    setVendors((prevVendors) => [...prevVendors, newVendor]);

    return { success: true };
  };

  const updateVendor = (vendor) => {
    if (!isValidObject(vendor, REQUIRED_FIELDS_UPDATE))
      return {
        success: false,
        error: "INVALID_VENDOR_DETAILS",
      };
    const timestamp = Date.now();

    setVendors((prevVendors) =>
      prevVendors.map((p) =>
        p.vendorId === vendor.vendorId
          ? {
              ...p,
              name: vendor.name,
              email: vendor.email,
              status: vendor.status,
              isActive: vendor.isActive,
              adminNotes : vendor.adminNotes ?? "",
              updatedAt: timestamp,
            }
          : p,
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
