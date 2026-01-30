import React from "react";

import { formatPrice, formatQuantity } from "../../utils/formatters";
import { useNavigate, useParams } from "react-router-dom";

const ProductItem = React.memo(({ product, onEdit, onDelete, onSelect }) => {
  return (
    <div className="product-item">
      <div className="product-info-group">
        <div className="product-main-details">
          <span
            className="product-name"
            onClick={() => onSelect(product.productId)}
            style={{ cursor: "pointer" }}
          >
            {product.name}
          </span>
          <span className="product-category-badge">{product.category}</span>
        </div>

        <div className="product-stats">
          <span className="product-price">
            {Number.isNaN(product.pricing.sellingPrice)
              ? "--"
              : formatPrice(product.pricing.sellingPrice)}
          </span>
          <span className="product-quantity">
            {Number.isNaN(product.stock.quantity)
              ? "--"
              : formatQuantity(product.stock.quantity)}
          </span>
        </div>
      </div>

      <div className="product-actions">
        <button className="btn-edit" onClick={() => onEdit(product)}>
          Edit
        </button>
        <button
          className="btn-delete"
          onClick={() => onDelete(product.productId)}
        >
          Delete
        </button>
      </div>
    </div>
  );
});

export default ProductItem;
