import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const ProductSettings = () => {
  const { settings } = useOutletContext();
  const { product, onUpdate } = settings;

  const [isEditOpen, setEditOpen] = useState(false);
  const [productDraft, setProductDraft] = useState({ ...product });

  useEffect(() => {
    setProductDraft({ ...product });
  }, [product]);

  const handleEditClick = (e) => {
    e.preventDefault();
    setEditOpen(true);
  };

  const closeModal = () => {
    setEditOpen(false);
    setProductDraft({ ...product });
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Handle nested objects: pricing.mrp, stock.quantity, identifiers.sku
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setProductDraft((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === "number" ? parseFloat(value) || 0 : value,
        },
      }));
    } else {
      // Handle top-level fields and radio booleans
      setProductDraft((prev) => ({
        ...prev,
        [name]: type === "radio" && name === "isActive" ? value === "true" : value,
      }));
    }
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    const result = await onUpdate(productDraft);
    if (result?.success) {
      setEditOpen(false);
    }
  };

  return (
    <div className="detail-page-container">
      <header className="page-header">
        <div className="header-text">
          <h2 className="page-title">Product Settings</h2>
          <p className="page-description">
            Manage product identification, pricing, and inventory levels
          </p>
        </div>

        <div className="header-actions">
          {!isEditOpen ? (
            <button
              type="button"
              className="btn-edit"
              onClick={handleEditClick}
            >
              Edit Product
            </button>
          ) : (
            <div className="button-group">
              <button type="button" className="btn-cancel" onClick={closeModal}>
                Cancel
              </button>
              <button
                type="submit"
                form="product-settings-form"
                className="btn-save-vendor"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="summary-card">
        <form
          id="product-settings-form"
          onSubmit={handleSubmitProduct}
          className="vendor-form"
        >
          {/* Section: Basic Info & SKU */}
          <div className="form-section">
            <div className="form-group">
              <label className="form-label">Product Name</label>
              <input
                type="text"
                name="name"
                value={productDraft.name || ""}
                onChange={handleChange}
                readOnly={!isEditOpen}
                className={`form-input ${!isEditOpen ? "input-readonly" : ""}`}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">SKU</label>
                <input
                  type="text"
                  name="identifiers.sku"
                  value={productDraft.identifiers?.sku || ""}
                  onChange={handleChange}
                  readOnly={!isEditOpen}
                  className={`form-input ${!isEditOpen ? "input-readonly" : ""}`}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <input
                  type="text"
                  name="category"
                  value={productDraft.category || ""}
                  onChange={handleChange}
                  readOnly={!isEditOpen}
                  className={`form-input ${!isEditOpen ? "input-readonly" : ""}`}
                />
              </div>
            </div>
          </div>

          <hr className="form-divider" />

          {/* Section: Pricing */}
          <div className="form-section">
            <h3 className="section-subtitle">Pricing & Financials</h3>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">MRP (INR)</label>
                <input
                  type="number"
                  name="pricing.mrp"
                  value={productDraft.pricing?.mrp || 0}
                  onChange={handleChange}
                  readOnly={!isEditOpen}
                  className={`form-input ${!isEditOpen ? "input-readonly" : ""}`}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Selling Price (INR)</label>
                <input
                  type="number"
                  name="pricing.sellingPrice"
                  value={productDraft.pricing?.sellingPrice || 0}
                  onChange={handleChange}
                  readOnly={!isEditOpen}
                  className={`form-input ${!isEditOpen ? "input-readonly" : ""}`}
                />
              </div>
            </div>
          </div>

          <hr className="form-divider" />

          {/* Section: Inventory */}
          <div className="form-section">
            <h3 className="section-subtitle">Inventory Management</h3>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Current Stock</label>
                <input
                  type="number"
                  name="stock.quantity"
                  value={productDraft.stock?.quantity || 0}
                  onChange={handleChange}
                  readOnly={!isEditOpen}
                  className={`form-input ${!isEditOpen ? "input-readonly" : ""}`}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Low Stock Threshold</label>
                <input
                  type="number"
                  name="stock.lowStockThreshold"
                  value={productDraft.stock?.lowStockThreshold || 0}
                  onChange={handleChange}
                  readOnly={!isEditOpen}
                  className={`form-input ${!isEditOpen ? "input-readonly" : ""}`}
                />
              </div>
            </div>
          </div>

          {/* Status Radio Group */}
          <div className="form-group">
            <label className="form-label">Product Visibility</label>
            <div className="radio-group">
              <label className={`radio-label ${!isEditOpen ? "radio-disabled" : ""}`}>
                <input
                  type="radio"
                  name="isActive"
                  value="true"
                  checked={productDraft.isActive === true}
                  onChange={handleChange}
                  disabled={!isEditOpen}
                />
                Active
              </label>
              <label className={`radio-label ${!isEditOpen ? "radio-disabled" : ""}`}>
                <input
                  type="radio"
                  name="isActive"
                  value="false"
                  checked={productDraft.isActive === false}
                  onChange={handleChange}
                  disabled={!isEditOpen}
                />
                Inactive
              </label>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={productDraft.description || ""}
              onChange={handleChange}
              readOnly={!isEditOpen}
              className={`form-input textarea-field ${!isEditOpen ? "input-readonly" : ""}`}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductSettings;