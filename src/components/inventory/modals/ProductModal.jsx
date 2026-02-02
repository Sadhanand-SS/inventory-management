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
const ProductModal = ({ onClose, onSubmit }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">Add Product</h2>
        </div>

        <div className="modal-body">
          {/* ProductForm receives product for prefill */}
          <ProductForm onSubmit={onSubmit} />
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
