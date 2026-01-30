import { useContext, useState, useEffect, useMemo, useCallback } from "react";
import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { VendorContext } from "../../contexts/VendorContext";
import { InventoryContext } from "../../contexts/InventoryContext";
import InventorySummary from "../../components/inventory/InventorySummary";
import ProductList from "../../components/inventory/ProductList";
import ProductModal from "../../components/inventory/modals/ProductModal";
import Notification from "../../components/ui/Notification";

const AdminVendorInventoryPage = () => {
  const { inventory } = useOutletContext();
  const { vendorId: outletVendorId } = inventory;
  const { vendorId: routeVendorId } = useParams;

  const activeVendorId = outletVendorId || routeVendorId;
  const location = useLocation();
  const navigate = useNavigate();

  const { products, addProduct, updateProduct, deleteProduct } =
    useContext(InventoryContext);

  const [editorState, setEditorState] = useState({
    open: false,
    initialProduct: null,
  });

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (location.state?.notification) {
      setNotification(location.state.notification);

      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.pathname, navigate]);

  const vendorProducts = useMemo(() => {
    return products.filter((p) => p.vendorId === activeVendorId);
  }, [products, activeVendorId]);

  const handleAddClick = () => {
    setEditorState({
      open: true,
      initialProduct: {},
    });
  };

  const handleEditClick = useCallback((product) => {
    setEditorState({
      open: true,
      initialProduct: product,
    });
  }, []);

  const closeModal = useCallback(() => {
    setEditorState({
      open: false,
      initialProduct: null,
    });
  }, []);

  const handleDeleteProduct = useCallback(
    async (productId) => {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this product ?",
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
    },
    [deleteProduct],
  );

  const handleSubmitProduct = useCallback(
    async (productDraft) => {
      const result = editorState.initialProduct?.productId
        ? await updateProduct(productDraft)
        : await addProduct({ ...productDraft, vendorId: activeVendorId });

      if (result.success) {
        setNotification({
          type: "success",
          message: "Product saved Successfully",
        });

        closeModal();
      } else {
        setNotification({
          type: "error",
          message: result.error,
        });
      }
    },
    [editorState.initialProduct, addProduct, updateProduct, closeModal],
  );

  const handleSelectProduct = useCallback(
    (productId) => {
      navigate(`/vendors/${activeVendorId}/inventory/${productId}`);
    },
    [navigate, activeVendorId],
  );

  return (
    <div className="admin-inventory-page">
      <div className="admin-container">
        {notification && (
          <div className="admin-notification-layer">
            <Notification
              type={notification.type}
              message={notification.message}
              onClose={() => setNotification(null)}
            />
          </div>
        )}

        <div className="admin-view-header">
          <div className="view-title-group">
            <h2 className="admin-title">Vendor Inventory Management</h2>
            <p className="admin-subtitle">
              Reviewing stock and pricing for this specific vendor.
            </p>
          </div>

          <div className="admin-actions">
            <button className="btn-add-item-admin" onClick={handleAddClick}>
              <span className="btn-plus-icon">+</span> Add Product
            </button>
          </div>
        </div>

        <section className="admin-summary-wrapper">
          <InventorySummary products={vendorProducts} />
        </section>

        <main className="admin-list-content">
          <div className="table-wrapper">
            <ProductList
              products={vendorProducts}
              onEdit={handleEditClick}
              onDelete={handleDeleteProduct}
              onSelectProduct={handleSelectProduct}
            />
          </div>
        </main>

        {editorState.open && (
          <div className="admin-modal-root">
            <ProductModal
              product={editorState.initialProduct}
              onClose={closeModal}
              onSubmit={handleSubmitProduct}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminVendorInventoryPage;
