import React from "react";

import { formatPrice, formatQuantity } from "../../utils/formatters";

const ProductItem = React.memo(({ product, onEdit, onDelete }) => {
  return (
    <li className="product-item">
      <span>{product.name}</span>
      <span>{formatPrice(product.price)}</span>
      <span>{formatQuantity(product.quantity)}</span>
      <span>{product.category}</span>
      <button onClick={() => onEdit(product)}>Edit</button>
      <button onClick={() => onDelete(product.id)}>Delete</button>
    </li>
  );
});

export default ProductItem;
