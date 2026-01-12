import ProductForm from "./ProductForm";

/**
 * ProductModal
 * ------------
 * UI-only shell.
 *
 * Responsibilities:
 * - Render modal UI
 * - Host ProductForm
 * - Forward submit/close events
 */
const ProductModal = ({ product, onClose, onSubmit }) => {

  return (
    <div className="modal-overlay">
      <div className="modal-container">

        <h2>
          {product.id ? "Edit Product" : "Add Product"}
        </h2>

        {/* ProductForm receives product for prefill */}
        <ProductForm
          product={product}
          onSubmit={onSubmit}
        />

        <button onClick={onClose}>
          Cancel
        </button>

      </div>
    </div>
  );
};

export default ProductModal;
