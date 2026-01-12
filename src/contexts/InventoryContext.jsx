import { createContext, useState } from "react";
import {
  isValidObject,
  REQUIRED_FIELDS_ADD,
  REQUIRED_FIELDS_UPDATE,
} from "../utils/helper.js";

/**
 * InventoryContext
 * ----------------
 * Business-layer context for inventory management.
 *
 * This context exposes:
 * - inventory data (products)
 * - controlled business operations (add / update / delete)
 *
 * IMPORTANT:
 * - UI components must NOT mutate state directly
 * - UI components must NOT implement business rules
 *
 * All validation, identity generation, and mutation
 * happens here.
 */
export const InventoryContext = createContext(null);

/**
 * InventoryProvider
 * -----------------
 * Owns:
 * - inventory state
 * - validation rules
 * - identity generation
 * - controlled mutations
 *
 * Consumers interact only through the exposed API.
 */
const InventoryProvider = ({ children }) => {
  /**
   * Single source of truth for inventory data.
   *
   * Every object in this array is a valid Product:
   * { id, name, price, quantity, category }
   */
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Wireless Mouse",
      price: 799,
      quantity: 25,
      category: "Electronics",
    },
    {
      id: 2,
      name: "Mechanical Keyboard",
      price: 2499,
      quantity: 15,
      category: "Electronics",
    },
    {
      id: 3,
      name: "Notebook",
      price: 120,
      quantity: 100,
      category: "Stationery",
    },
    {
      id: 4,
      name: "Water Bottle",
      price: 349,
      quantity: 40,
      category: "Accessories",
    },
    {
      id: 5,
      name: "Backpack",
      price: 1999,
      quantity: 10,
      category: "Bags",
    },
  ]);

  /**
   * addProduct
   * ----------
   * Creates a new Product from a ProductDraft.
   *
   * Responsibilities:
   * - Validate draft data
   * - Generate product identity
   * - Append product immutably
   *
   * @param {Object} productDraft
   * Draft data collected from UI (no id).
   *
   * @returns {Object}
   * { success: true }
   * { success: false, error: "INVALID_PRODUCT_DATA" }
   */
  const addProduct = (productDraft) => {
    if (!isValidObject(productDraft, REQUIRED_FIELDS_ADD)) {
      return {
        success: false,
        error: "INVALID_PRODUCT_DATA",
      };
    }

    setProducts((prevProducts) => [
      ...prevProducts,
      { ...productDraft, id: Date.now() },
    ]);

    return { success: true };
  };

  /**
   * updateProduct
   * -------------
   * Updates an existing Product.
   *
   * Responsibilities:
   * - Validate full product data (must include id)
   * - Apply immutable update
   *
   * @param {Object} product
   * Existing Product with updated fields.
   *
   * @returns {Object}
   * { success: true }
   * { success: false, error: "INVALID_PRODUCT_DATA" }
   */
  const updateProduct = (product) => {
    if (!isValidObject(product, REQUIRED_FIELDS_UPDATE)) {
      return {
        success: false,
        error: "INVALID_PRODUCT_DATA",
      };
    }

    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === product.id ? { ...p, ...product } : p))
    );

    return { success: true };
  };

  /**
   * deleteProduct
   * -------------
   * Removes a Product by id.
   *
   * Responsibilities:
   * - Verify existence
   * - Apply atomic removal
   *
   * @param {number} id
   * Product identifier.
   *
   * @returns {Object}
   * { success: true }
   * { success: false, error: "PRODUCT_NOT_FOUND" }
   */
  const deleteProduct = (id) => {
    return new Promise((resolve) => {
      setProducts((prevProducts) => {
        const exists = prevProducts.some((p) => p.id === id);

        if (!exists) {
          resolve({ success: false, error: "PRODUCT_NOT_FOUND" });
          return prevProducts;
        }

        resolve({ success: true });
        return prevProducts.filter((p) => p.id !== id);
      });
    });
  };

  /**
   * Public API exposed to consumers.
   *
   * Consumers can:
   * - read inventory data
   * - request controlled mutations
   *
   * Consumers cannot:
   * - directly modify state
   * - bypass validation or identity rules
   */
  const value = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};

export default InventoryProvider;
