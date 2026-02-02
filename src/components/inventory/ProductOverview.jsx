import React from "react";
import { useOutletContext } from "react-router-dom";

const ProductOverview = () => {
  const { overview } = useOutletContext();
  const { product } = overview;

  if (!product) {
    return (
      <div className="product-loading">
        <p>Loading product details...</p>
      </div>
    );
  }

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString("en-IN");
  };

  return (
    <div className="product-overview-container">
      <div className="product-header">
        <h2 className="product-main-title">{product.name}</h2>
        <span
          className={`status-badge ${product.isActive ? "active" : "inactive"}`}
        >
          {product.isActive ? "Active" : "Inactive"}
        </span>
      </div>

      <div className="product-content-grid">
        {/* Section 1: Core Identification */}
        <section className="info-group identity-section">
          <h3 className="group-title">Identification</h3>
          <div className="group-content">
            <div className="data-row">
              <span className="label">Product ID</span>
              <span className="value">{product.productId}</span>
            </div>
            <div className="data-row">
              <span className="label">Vendor ID</span>
              <span className="value">{product.vendorId}</span>
            </div>
            <div className="data-row">
              <span className="label">SKU</span>
              <span className="value highlight">
                {product.identifiers?.sku || "N/A"}
              </span>
            </div>
          </div>
        </section>

        {/* Section 2: Product Categorization */}
        <section className="info-group categorization-section">
          <h3 className="group-title">Categorization</h3>
          <div className="group-content">
            <div className="data-row">
              <span className="label">Category</span>
              <span className="value">{product.category}</span>
            </div>
            <div className="data-row">
              <span className="label">Sub Category</span>
              <span className="value">{product.subCategory || "N/A"}</span>
            </div>
            <div className="data-row">
              <span className="label">Brand</span>
              <span className="value">{product.brand || "N/A"}</span>
            </div>
          </div>
        </section>

        {/* Section 3: Pricing Details */}
        <section className="info-group pricing-section">
          <h3 className="group-title">Pricing (INR)</h3>
          <div className="group-content">
            <div className="data-row">
              <span className="label">MRP</span>
              <span className="value strikethrough">
                {product.pricing?.mrp}
              </span>
            </div>
            <div className="data-row">
              <span className="label">Selling Price</span>
              <span className="value price-tag">
                {product.pricing?.sellingPrice}
              </span>
            </div>
            <div className="data-row">
              <span className="label">Tax Included</span>
              <span className="value">
                {product.pricing?.taxIncluded ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </section>

        {/* Section 4: Inventory & Stock */}
        <section className="info-group stock-section">
          <h3 className="group-title">Inventory</h3>
          <div className="group-content">
            <div className="data-row">
              <span className="label">Current Stock</span>
              <span
                className={`value ${product.stock?.quantity <= product.stock?.lowStockThreshold ? "low-stock" : ""}`}
              >
                {product.stock?.quantity}
              </span>
            </div>
            <div className="data-row">
              <span className="label">Threshold</span>
              <span className="value">{product.stock?.lowStockThreshold}</span>
            </div>
          </div>
        </section>

        {/* Section 5: Description (Full Width) */}
        <section className="info-group description-section full-width">
          <h3 className="group-title">Description</h3>
          <p className="description-text">{product.description}</p>
        </section>

        {/* Section 6: Metadata/Timestamps */}
        <section className="info-group metadata-section full-width">
          <div className="timestamp-wrapper">
            <div className="timestamp-item">
              <span className="label">Created:</span>
              <span className="value">{formatDate(product.createdAt)}</span>
            </div>
            <div className="timestamp-item">
              <span className="label">Last Updated:</span>
              <span className="value">{formatDate(product.updatedAt)}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductOverview;
