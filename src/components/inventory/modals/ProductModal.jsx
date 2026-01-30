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
        <div className="modal-header">
          <h2 className="modal-title">
            {product.productId ? "Edit Product" : "Add Product"}
          </h2>
        </div>

        <div className="modal-body">
          {/* ProductForm receives product for prefill */}
          <ProductForm product={product} onSubmit={onSubmit} />
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
