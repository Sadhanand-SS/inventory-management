import { useState, useContext, useEffect } from "react";
import { InventoryContext } from "../contexts/InventoryContext";
import ProductList from "../components/inventory/ProductList";
import ProductModal from "../components/inventory/modals/ProductModal";
import InventorySummary from "../components/inventory/InventorySummary";
import Notification from "../components/ui/Notification";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * InventoryPage
 * -------------
 * Page-level orchestration component.
 *
 * Responsibilities:
 * - Control modal visibility
 * - Decide between ADD and EDIT flows
 * - Delegate business actions to InventoryContext
 *
 * This component does NOT:
 * - Own inventory state
 * - Validate business rules
 * - Generate product identity
 *
 * Single source of truth for UI flow:
 * `editorState`
 */
const InventoryPage = () => {
  /**
   * editorState
   * -----------
   * Explicit UI state model for the product editor.
   *
   * - open: controls modal visibility
   * - initialProduct:
   *     - null  -> modal closed
   *     - {}    -> ADD mode (ProductDraft seed)
   *     - obj   -> EDIT mode (existing Product)
   *
   * NOTE:
   * initialProduct is used ONLY to:
   * - prefill the form
   * - decide ADD vs EDIT
   *
   * It is NOT the submitted data.
   */
  const [editorState, setEditorState] = useState({
    open: false,
    initialProduct: null,
  });

  const [notification, setNotification] = useState(null);

  /**
   * Consume business operations from InventoryContext.
   *
   * InventoryPage is allowed to:
   * - invoke business actions
   *
   * InventoryPage is NOT allowed to:
   * - implement validation
   * - manipulate inventory state
   */
  const { products, addProduct, updateProduct, deleteProduct } =
    useContext(InventoryContext);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.notification) {
      setNotification(location.state.notification);

      // CLEAR route state after consuming it
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.state, navigate]);

  /**
   * Opens the modal in ADD mode.
   */
  const handleAddClick = () => {
    setEditorState({
      open: true,
      initialProduct: {},
    });
  };

  /**
   * Opens the modal in EDIT mode.
   *
   * @param {Object} product
   * Existing Product to be edited.
   */
  const handleEditClick = (product) => {
    setEditorState({
      open: true,
      initialProduct: product,
    });
  };

  /**
   * Closes the modal and resets editor state.
   */
  const closeModal = () => {
    setEditorState({
      open: false,
      initialProduct: null,
    });
  };

  /**
   * Handles form submission.
   *
   * @param {Object} productDraft
   * Data submitted from ProductForm.
   *
   * IMPORTANT:
   * - productDraft is the authoritative submitted data
   * - initialProduct is used ONLY to determine ADD vs EDIT
   */
  const handleSubmitProduct = async (productDraft) => {
    const result = editorState.initialProduct?.id
      ? await updateProduct(productDraft)
      : await addProduct(productDraft);

    if (result.success) {
      setNotification({
        type: "success",
        message: "Product Saved Successfully",
      });

      closeModal();
    } else {
      setNotification({
        type: "error",
        message: result.error,
      });
    }
  };

  /**
   * Handles deletion of a product.
   *
   * @param {number} productId
   * Identifier of product to remove.
   */
  const handleDeleteProduct = async (productId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!isConfirmed) return;

    const result = await deleteProduct(productId);

    if (result.success) {
      setNotification({
        type: "success",
        message: "Product deleted successfully",
      });
    } else {
      setNotification({
        type: "error",
        message: result.error,
      });
    }
  };

  return (
    <div className="inventory-page">
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <InventorySummary products={products} />
      {/* Page-level ADD action */}
      <button onClick={handleAddClick}>Add Product</button>

      {/* Inventory list delegates edit/delete actions upward */}
      <ProductList
        products={products}
        onEdit={handleEditClick}
        onDelete={handleDeleteProduct}
      />

      {/* Modal visibility is explicitly controlled by editorState */}
      {editorState.open && (
        <ProductModal
          product={editorState.initialProduct}
          onClose={closeModal}
          onSubmit={handleSubmitProduct}
        />
      )}
    </div>
  );
};

export default InventoryPage;
