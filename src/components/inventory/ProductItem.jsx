import React from "react";

import { formatPrice, formatQuantity } from "../../utils/formatters";

const ProductItem = React.memo(({ product, onEdit, onDelete }) => {
  return (
    <li className="product-item">
      <div className="product-info-group">
        <div className="product-main-details">
          <span className="product-name">{product.name}</span>
          <span className="product-category-badge">{product.category}</span>
        </div>

        <div className="product-stats">
          <span className="product-price">{formatPrice(product.price)}</span>
          <span className="product-quantity">
            {formatQuantity(product.quantity)}
          </span>
        </div>
      </div>

      <div className="product-actions">
        <button className="btn-edit" onClick={() => onEdit(product)}>
          Edit
        </button>
        <button className="btn-delete" onClick={() => onDelete(product.id)}>
          Delete
        </button>
      </div>
    </li>
  );
});

export default ProductItem;
