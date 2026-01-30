import { createContext, useState } from "react";
import {
  isValidObject,
  REQUIRED_FIELDS_ADD,
  REQUIRED_FIELDS_UPDATE,
} from "../utils/inventoryHelper.js";

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
   * { productId, name, price, quantity, category }
   */
  const [products, setProducts] = useState([
    {
      productId: "PROD-001",
      vendorId: "VEND-001",
      name: "AULA F2088 Mechanical Keyboard",
      description:
        "Full-size mechanical keyboard with RGB backlighting and durable switches.",
      category: "Keyboards",
      subCategory: "Mechanical",
      pricing: {
        mrp: 5999,
        sellingPrice: 4499,
        taxIncluded: true,
      },
      stock: {
        quantity: 120,
        lowStockThreshold: 10,
      },
      identifiers: {
        sku: "AULA-F2088",
      },
      isActive: true,
      createdAt: Date.parse("2025-01-10T10:00:00Z"),
      updatedAt: Date.parse("2025-01-20T10:00:00Z"),
    },

    {
      productId: "PROD-002",
      vendorId: "VEND-001",
      name: "AULA F3061 60% Mechanical Keyboard",
      description:
        "Compact 60% layout mechanical keyboard for gaming and portability.",
      category: "Keyboards",
      subCategory: "Compact",
      pricing: {
        mrp: 4999,
        sellingPrice: 3799,
        taxIncluded: true,
      },
      stock: {
        quantity: 85,
        lowStockThreshold: 10,
      },
      identifiers: {
        sku: "AULA-F3061",
      },
      isActive: true,
      createdAt: Date.parse("2025-01-11T09:30:00Z"),
      updatedAt: Date.parse("2025-01-18T12:00:00Z"),
    },

    {
      productId: "PROD-003",
      vendorId: "VEND-002",
      name: "Epomaker TH80 Pro",
      description:
        "75% wireless mechanical keyboard with hot-swappable switches.",
      category: "Keyboards",
      subCategory: "Wireless",
      pricing: {
        mrp: 11999,
        sellingPrice: 9999,
        taxIncluded: true,
      },
      stock: {
        quantity: 60,
        lowStockThreshold: 10,
      },
      identifiers: {
        sku: "EPO-TH80-PRO",
      },
      isActive: true,
      createdAt: Date.parse("2025-01-09T14:20:00Z"),
      updatedAt: Date.parse("2025-01-21T16:40:00Z"),
    },

    {
      productId: "PROD-004",
      vendorId: "VEND-002",
      name: "Epomaker EK68",
      description:
        "65% compact mechanical keyboard with Bluetooth and RGB lighting.",
      category: "Keyboards",
      subCategory: "Compact",
      pricing: {
        mrp: 8999,
        sellingPrice: 7499,
        taxIncluded: true,
      },
      stock: {
        quantity: 95,
        lowStockThreshold: 10,
      },
      identifiers: {
        sku: "EPO-EK68",
      },
      isActive: true,
      createdAt: Date.parse("2025-01-08T11:10:00Z"),
      updatedAt: Date.parse("2025-01-19T13:00:00Z"),
    },

    {
      productId: "PROD-005",
      vendorId: "VEND-004",
      name: "Royal Kludge RK84",
      description:
        "84-key wireless mechanical keyboard with triple-mode connectivity.",
      category: "Keyboards",
      subCategory: "Wireless",
      pricing: {
        mrp: 8999,
        sellingPrice: 6999,
        taxIncluded: true,
      },
      stock: {
        quantity: 110,
        lowStockThreshold: 10,
      },
      identifiers: {
        sku: "RK-RK84",
      },
      isActive: true,
      createdAt: Date.parse("2025-01-05T10:00:00Z"),
      updatedAt: Date.parse("2025-01-22T14:25:00Z"),
    },

    {
      productId: "PROD-006",
      vendorId: "VEND-004",
      name: "Royal Kludge RK61",
      description: "Popular 60% wireless mechanical keyboard with RGB support.",
      category: "Keyboards",
      subCategory: "Compact",
      pricing: {
        mrp: 5999,
        sellingPrice: 4799,
        taxIncluded: true,
      },
      stock: {
        quantity: 150,
        lowStockThreshold: 10,
      },
      identifiers: {
        sku: "RK-RK61",
      },
      isActive: true,
      createdAt: Date.parse("2025-01-06T09:15:00Z"),
      updatedAt: Date.parse("2025-01-18T11:00:00Z"),
    },

    {
      productId: "PROD-007",
      vendorId: "VEND-006",
      name: "Keychron K2 Pro",
      description:
        "75% hot-swappable mechanical keyboard with Mac and Windows support.",
      category: "Keyboards",
      subCategory: "Wireless",
      pricing: {
        mrp: 12999,
        sellingPrice: 10999,
        taxIncluded: true,
      },
      stock: {
        quantity: 70,
        lowStockThreshold: 10,
      },
      identifiers: {
        sku: "KEY-K2-PRO",
      },
      isActive: true,
      createdAt: Date.parse("2025-01-03T09:00:00Z"),
      updatedAt: Date.parse("2025-01-21T18:10:00Z"),
    },

    {
      productId: "PROD-008",
      vendorId: "VEND-006",
      name: "Keychron K6",
      description:
        "65% compact wireless mechanical keyboard with aluminum frame.",
      category: "Keyboards",
      subCategory: "Compact",
      pricing: {
        mrp: 9999,
        sellingPrice: 8499,
        taxIncluded: true,
      },
      stock: {
        quantity: 90,
        lowStockThreshold: 10,
      },
      identifiers: {
        sku: "KEY-K6",
      },
      isActive: true,
      createdAt: Date.parse("2025-01-04T10:30:00Z"),
      updatedAt: Date.parse("2025-01-20T15:45:00Z"),
    },
    {
      productId: "PROD-009",
      vendorId: "VEND-007",
      name: "Akko 3068B Plus",
      description:
        "65% wireless mechanical keyboard with hot-swappable Akko switches.",
      category: "Keyboards",
      subCategory: "Wireless",
      pricing: {
        mrp: 10999,
        sellingPrice: 9299,
        taxIncluded: true,
      },
      stock: {
        quantity: 75,
        lowStockThreshold: 10,
      },
      identifiers: {
        sku: "AKKO-3068B-PLUS",
      },
      isActive: true,
      createdAt: Date.parse("2025-01-06T12:00:00Z"),
      updatedAt: Date.parse("2025-01-19T13:55:00Z"),
    },

    {
      productId: "PROD-010",
      vendorId: "VEND-007",
      name: "Akko 5087B",
      description:
        "Tenkeyless mechanical keyboard with Bluetooth and RGB lighting.",
      category: "Keyboards",
      subCategory: "Tenkeyless",
      pricing: {
        mrp: 11999,
        sellingPrice: 9999,
        taxIncluded: true,
      },
      stock: {
        quantity: 65,
        lowStockThreshold: 10,
      },
      identifiers: {
        sku: "AKKO-5087B",
      },
      isActive: true,
      createdAt: Date.parse("2025-01-07T10:40:00Z"),
      updatedAt: Date.parse("2025-01-20T14:20:00Z"),
    },

    {
      productId: "PROD-011",
      vendorId: "VEND-008",
      name: "Ducky One 2 Mini",
      description:
        "60% enthusiast mechanical keyboard with high-quality PBT keycaps.",
      category: "Keyboards",
      subCategory: "Compact",
      pricing: {
        mrp: 10999,
        sellingPrice: 9499,
        taxIncluded: true,
      },
      stock: {
        quantity: 55,
        lowStockThreshold: 10,
      },
      identifiers: {
        sku: "DUCKY-O2-MINI",
      },
      isActive: true,
      createdAt: Date.parse("2025-01-02T14:20:00Z"),
      updatedAt: Date.parse("2025-01-17T10:05:00Z"),
    },

    {
      productId: "PROD-012",
      vendorId: "VEND-008",
      name: "Ducky One 3 TKL",
      description:
        "Tenkeyless mechanical keyboard with improved acoustics and RGB.",
      category: "Keyboards",
      subCategory: "Tenkeyless",
      pricing: {
        mrp: 14999,
        sellingPrice: 12999,
        taxIncluded: true,
      },
      stock: {
        quantity: 40,
        lowStockThreshold: 10,
      },
      identifiers: {
        sku: "DUCKY-O3-TKL",
      },
      isActive: true,
      createdAt: Date.parse("2025-01-03T11:00:00Z"),
      updatedAt: Date.parse("2025-01-18T09:30:00Z"),
    },

    {
      productId: "PROD-013",
      vendorId: "VEND-010",
      name: "Varmilo VA87M",
      description: "Premium TKL mechanical keyboard with dye-sub PBT keycaps.",
      category: "Keyboards",
      subCategory: "Tenkeyless",
      pricing: {
        mrp: 17999,
        sellingPrice: 15499,
        taxIncluded: true,
      },
      stock: {
        quantity: 35,
        lowStockThreshold: 10,
      },
      identifiers: {
        sku: "VAR-VA87M",
      },
      isActive: true,
      createdAt: Date.parse("2025-01-07T10:50:00Z"),
      updatedAt: Date.parse("2025-01-23T12:00:00Z"),
    },

    {
      productId: "PROD-014",
      vendorId: "VEND-010",
      name: "Varmilo VA108M",
      description: "Full-size premium mechanical keyboard with custom themes.",
      category: "Keyboards",
      subCategory: "Full Size",
      pricing: {
        mrp: 19999,
        sellingPrice: 17499,
        taxIncluded: true,
      },
      stock: {
        quantity: 30,
        lowStockThreshold: 10,
      },
      identifiers: {
        sku: "VAR-VA108M",
      },
      isActive: true,
      createdAt: Date.parse("2025-01-08T09:40:00Z"),
      updatedAt: Date.parse("2025-01-22T16:10:00Z"),
    },

    {
      productId: "PROD-015",
      vendorId: "VEND-003",
      name: "Skyloong GK61",
      description:
        "Entry-level 60% mechanical keyboard with hot-swappable switches.",
      category: "Keyboards",
      subCategory: "Compact",
      pricing: {
        mrp: 5499,
        sellingPrice: 4299,
        taxIncluded: true,
      },
      stock: {
        quantity: 0,
        lowStockThreshold: 10,
      },
      identifiers: {
        sku: "SKY-GK61",
      },
      isActive: false,
      createdAt: Date.parse("2025-01-12T08:45:00Z"),
      updatedAt: Date.parse("2025-01-12T08:45:00Z"),
    },

    {
      productId: "PROD-016",
      vendorId: "VEND-005",
      name: "MCHOSE K87",
      description:
        "Affordable TKL mechanical keyboard focused on productivity.",
      category: "Keyboards",
      subCategory: "Tenkeyless",
      pricing: {
        mrp: 6999,
        sellingPrice: 5599,
        taxIncluded: true,
      },
      stock: {
        quantity: 0,
        lowStockThreshold: 10,
      },
      identifiers: {
        sku: "MCH-K87",
      },
      isActive: false,
      createdAt: Date.parse("2025-01-14T15:30:00Z"),
      updatedAt: Date.parse("2025-01-14T15:30:00Z"),
    },
    {
      productId: "PROD-017",
      vendorId: "VEND-006",
      name: "Keychron Q1",
      description:
        "Premium 75% custom mechanical keyboard with full aluminum body.",
      category: "Keyboards",
      subCategory: "Custom",
      pricing: {
        mrp: 18999,
        sellingPrice: 16499,
        taxIncluded: true,
      },
      stock: {
        quantity: 45,
        lowStockThreshold: 10,
      },
      identifiers: {
        sku: "KEY-Q1",
      },
      isActive: true,
      createdAt: Date.parse("2025-01-05T09:30:00Z"),
      updatedAt: Date.parse("2025-01-22T18:30:00Z"),
    },

    {
      productId: "PROD-018",
      vendorId: "VEND-006",
      name: "Keychron V1",
      description:
        "Budget-friendly 75% mechanical keyboard with hot-swappable switches.",
      category: "Keyboards",
      subCategory: "Custom",
      pricing: {
        mrp: 9999,
        sellingPrice: 8499,
        taxIncluded: true,
      },
      stock: {
        quantity: 95,
        lowStockThreshold: 10,
      },
      identifiers: {
        sku: "KEY-V1",
      },
      isActive: true,
      createdAt: Date.parse("2025-01-06T10:15:00Z"),
      updatedAt: Date.parse("2025-01-21T17:40:00Z"),
    },

    {
      productId: "PROD-019",
      vendorId: "VEND-007",
      name: "Akko MOD 007",
      description:
        "Aluminum gasket-mounted mechanical keyboard for enthusiasts.",
      category: "Keyboards",
      subCategory: "Custom",
      pricing: {
        mrp: 20999,
        sellingPrice: 18999,
        taxIncluded: true,
      },
      stock: {
        quantity: 28,
        lowStockThreshold: 10,
      },
      identifiers: {
        sku: "AKKO-MOD007",
      },
      isActive: true,
      createdAt: Date.parse("2025-01-08T11:10:00Z"),
      updatedAt: Date.parse("2025-01-23T13:10:00Z"),
    },

    {
      productId: "PROD-020",
      vendorId: "VEND-008",
      name: "Ducky Shine 7",
      description:
        "Full-size RGB mechanical keyboard with zinc alloy top case.",
      category: "Keyboards",
      subCategory: "Full Size",
      pricing: {
        mrp: 18999,
        sellingPrice: 16999,
        taxIncluded: true,
      },
      stock: {
        quantity: 42,
        lowStockThreshold: 10,
      },
      identifiers: {
        sku: "DUCKY-SHINE7",
      },
      isActive: true,
      createdAt: Date.parse("2025-01-04T13:20:00Z"),
      updatedAt: Date.parse("2025-01-19T11:30:00Z"),
    },

    {
      productId: "PROD-021",
      vendorId: "VEND-010",
      name: "Varmilo MA87M Summit",
      description:
        "High-end TKL mechanical keyboard with mountain-themed design.",
      category: "Keyboards",
      subCategory: "Tenkeyless",
      pricing: {
        mrp: 20999,
        sellingPrice: 18999,
        taxIncluded: true,
      },
      stock: {
        quantity: 25,
        lowStockThreshold: 10,
      },
      identifiers: {
        sku: "VAR-MA87M",
      },
      isActive: true,
      createdAt: Date.parse("2025-01-09T10:50:00Z"),
      updatedAt: Date.parse("2025-01-23T12:45:00Z"),
    },

    {
      productId: "PROD-022",
      vendorId: "VEND-001",
      name: "AULA Hero 68",
      description:
        "65% mechanical keyboard designed for esports and fast response.",
      category: "Keyboards",
      subCategory: "Compact",
      pricing: {
        mrp: 5499,
        sellingPrice: 4299,
        taxIncluded: true,
      },
      stock: {
        quantity: 140,
        lowStockThreshold: 10,
      },
      identifiers: {
        sku: "AULA-H68",
      },
      isActive: true,
      createdAt: Date.parse("2025-01-12T09:10:00Z"),
      updatedAt: Date.parse("2025-01-20T10:55:00Z"),
    },

    {
      productId: "PROD-023",
      vendorId: "VEND-002",
      name: "Epomaker RT100",
      description: "Retro-style mechanical keyboard with LCD screen and knob.",
      category: "Keyboards",
      subCategory: "Custom",
      pricing: {
        mrp: 15999,
        sellingPrice: 13999,
        taxIncluded: true,
      },
      stock: {
        quantity: 50,
        lowStockThreshold: 10,
      },
      identifiers: {
        sku: "EPO-RT100",
      },
      isActive: true,
      createdAt: Date.parse("2025-01-10T12:30:00Z"),
      updatedAt: Date.parse("2025-01-22T15:20:00Z"),
    },

    {
      productId: "PROD-024",
      vendorId: "VEND-009",
      name: "Redragon K552 Kumara",
      description: "Budget mechanical keyboard with durable metal frame.",
      category: "Keyboards",
      subCategory: "Tenkeyless",
      pricing: {
        mrp: 3999,
        sellingPrice: 2999,
        taxIncluded: true,
      },
      stock: {
        quantity: 0,
        lowStockThreshold: 10,
      },
      identifiers: {
        sku: "RED-K552",
      },
      isActive: false,
      createdAt: Date.parse("2025-01-04T16:10:00Z"),
      updatedAt: Date.parse("2025-01-08T09:35:00Z"),
    },

    {
      productId: "PROD-025",
      vendorId: "VEND-009",
      name: "Redragon K617 Fizz",
      description: "Compact 60% mechanical keyboard with vibrant RGB lighting.",
      category: "Keyboards",
      subCategory: "Compact",
      pricing: {
        mrp: 3499,
        sellingPrice: 2699,
        taxIncluded: true,
      },
      stock: {
        quantity: 0,
        lowStockThreshold: 10,
      },
      identifiers: {
        sku: "RED-K617",
      },
      isActive: false,
      createdAt: Date.parse("2025-01-05T10:00:00Z"),
      updatedAt: Date.parse("2025-01-08T09:35:00Z"),
    },

    {
      productId: "PROD-026",
      vendorId: "VEND-005",
      name: "MCHOSE GX87",
      description:
        "Hot-swappable TKL mechanical keyboard with minimalist design.",
      category: "Keyboards",
      subCategory: "Tenkeyless",
      pricing: {
        mrp: 7999,
        sellingPrice: 6499,
        taxIncluded: true,
      },
      stock: {
        quantity: 0,
        lowStockThreshold: 10,
      },
      identifiers: {
        sku: "MCH-GX87",
      },
      isActive: false,
      createdAt: Date.parse("2025-01-15T09:00:00Z"),
      updatedAt: Date.parse("2025-01-15T09:00:00Z"),
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
   * Draft data collected from UI (no productId).
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

    const timestamp = Date.now();

    const newProduct = {
      productId: `PROD-${timestamp}`,
      vendorId: productDraft.vendorId,

      name: productDraft.name,
      description: productDraft.description,
      category: productDraft.category,
      subCategory: productDraft.subCategory,
      brand: productDraft.brand,

      pricing: {
        mrp: Number(productDraft.pricing.mrp),
        sellingPrice: Number(productDraft.pricing.sellingPrice),
        taxIncluded: productDraft.pricing.taxIncluded,
      },

      stock: {
        quantity: Number(productDraft.stock.quantity),
        lowStockThreshold: 10,
      },

      identifiers: {
        sku: productDraft.identifiers?.sku,
      },

      isActive: false,

      createdAt: timestamp,
      updatedAt: timestamp,
    };

    setProducts((prevProducts) => [...prevProducts, newProduct]);

    return { success: true };
  };

  /**
   * updateProduct
   * -------------
   * Updates an existing Product.
   *
   * Responsibilities:
   * - Validate full product data (must include productId)
   * - Apply immutable update
   *
   * @param {Object} product
   * Existing Product with updated fields.
   *
   * @returns {Object}
   * { success: true }
   * { success: false, error: "INVALID_PRODUCT_DATA" }
   */
  const updateProduct = (updatedProduct) => {
    if (!isValidObject(updatedProduct, REQUIRED_FIELDS_UPDATE)) {
      return {
        success: false,
        error: "INVALID_PRODUCT_DATA",
      };
    }

    const timestamp = Date.now();

    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.productId === updatedProduct.productId
          ? {
              ...p,
              name: updatedProduct.name,
              description: updatedProduct.description,
              category: updatedProduct.category,
              subCategory: updatedProduct.subCategory,
              brand: updatedProduct.brand,
              pricing: {
                mrp: Number(updatedProduct.pricing.mrp),
                sellingPrice: Number(updatedProduct.pricing.sellingPrice),
                taxIncluded: updatedProduct.pricing.taxIncluded,
              },
              stock: {
                quantity: Number(updatedProduct.stock.quantity),
                lowStockThreshold: Number(
                  updatedProduct.stock.lowStockThreshold,
                ),
              },
              isActive: updatedProduct.isActive,
              identifiers: {
                sku: updatedProduct.identifiers?.sku,
              },
              updatedAt: timestamp,
            }
          : p,
      ),
    );

    return { success: true };
  };

  /**
   * deleteProduct
   * -------------
   * Removes a Product by productId.
   *
   * Responsibilities:
   * - Verify existence
   * - Apply atomic removal
   *
   * @param {number} productId
   * Product identifier.
   *
   * @returns {Object}
   * { success: true }
   * { success: false, error: "PRODUCT_NOT_FOUND" }
   */
  const deleteProduct = (productId) => {
    return new Promise((resolve) => {
      setProducts((prevProducts) => {
        const exists = prevProducts.some((p) => p.productId === productId);

        if (!exists) {
          resolve({ success: false, error: "PRODUCT_NOT_FOUND" });
          return prevProducts;
        }

        resolve({ success: true });
        return prevProducts.filter((p) => p.productId !== productId);
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
