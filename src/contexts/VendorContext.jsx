import { createContext, useState } from "react";

export const VendorContext = createContext(null);

const VendorProvider = ({children}) => {
    const [vendors, setVendors] = useState([]);

    const addVendor = (credentials) =>{

    };

    const updateVendor = (credentials) => {

    };

    const deleteVendor = (credentials) => {

    };


    const value = {};
    return (
        <VendorContext.Provider value={value}>
          {children}
        </VendorContext.Provider>
      );
}