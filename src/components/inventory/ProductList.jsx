import React from "react";
import ProductItem from "./ProductItem";

/**
 * ProductList
 * -----------
 * Presentation + delegation unit.
 *
 * Responsibilities:
 * - Render list
 * - Forward edit intent upward
 */
const ProductList = React.memo(({ products, onEdit, onDelete, onSelectProduct }) => {
  if (products.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <div className="product-list-container">
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.productId} className="product-list-item">
            <div className="product-item-wrapper">
              <ProductItem
                product={product}
                onEdit={onEdit}
                onDelete={onDelete}
                onSelect = {onSelectProduct}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default ProductList;
