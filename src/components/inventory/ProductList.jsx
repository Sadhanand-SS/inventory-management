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
const ProductList = ({ products, onEdit, onDelete }) => {
  if (products.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <ul className="product-list">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default ProductList;
