import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { VendorContext } from "../../contexts/VendorContext";
import { InventoryContext } from "../../contexts/InventoryContext";
import InventorySummary from "../../components/inventory/InventorySummary";
import ProductList from "../../components/inventory/ProductList";
import ProductModal from "../../components/inventory/modals/ProductModal";
import Notification from "../../components/ui/Notification";

const VendorInventoryPage = () => {
  const { vendorId: activeVendorId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { vendors } = useContext(VendorContext);
  const { products, addProduct, updateProduct, deleteProduct } =
    useContext(InventoryContext);

  const [isAddOpen, setIsAddOpen] = useState(false);

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (location.state?.notification) {
      setNotification(location.state.notification);

      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.pathname, navigate]);

  const activeVendor = useMemo(() => {
    return vendors.find((vendor) => vendor.vendorId === activeVendorId);
  }, [vendors, activeVendorId]);

  const isVendorActive =
    activeVendor?.status === "approved" && activeVendor?.isActive === true;

  const vendorsLoaded = vendors.length > 0;
  const isAllowed = vendorsLoaded && !!activeVendor && isVendorActive;

  const vendorProducts = useMemo(() => {
    return products.filter((p) => p.vendorId === activeVendorId);
  }, [products, activeVendorId]);

  useEffect(() => {
    if (!vendorsLoaded) return;
    if (!isAllowed) {
      navigate("/unauthorized", { replace: true });
    }
  }, [isAllowed, vendorsLoaded, navigate]);

  const handleAddClick = () => {
    setIsAddOpen(true);
  };

  const closeModal = useCallback(() => {
    setIsAddOpen(false);
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
      const result = await addProduct({
        ...productDraft,
        vendorId: activeVendorId,
      });

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
    [addProduct, closeModal],
  );

  const handleSelectProduct = useCallback(
    (productId) => {
      navigate(`/inventory/${activeVendorId}/${productId}`, {
        state: {
          from: `/inventory/${activeVendorId}`,
        },
      });
    },
    [navigate, activeVendorId],
  );

  if (vendorsLoaded && !isAllowed) {
    return null;
  }

  return (
    <div className="inventory-page">
      <div className="inventory-container">
        {notification && (
          <div className="notification-toast-wrapper">
            <Notification
              type={notification.type}
              message={notification.message}
              onClose={() => setNotification(null)}
            />
          </div>
        )}

        <header className="inventory-header">
          <div className="header-branding">
            <h1 className="inventory-title">Inventory Management</h1>
            <p className="inventory-subtitle">
              Monitor and update your product stock levels.
            </p>
          </div>

          <div className="header-controls">
            <button className="btn-add-product" onClick={handleAddClick}>
              <span className="btn-icon">+</span> Add New Product
            </button>
          </div>
        </header>

        <section className="inventory-stats-section">
          <InventorySummary products={vendorProducts} />
        </section>

        <main className="inventory-list-section">
          <div className="list-card">
            <ProductList
              products={vendorProducts}
              onDelete={handleDeleteProduct}
              onSelectProduct={handleSelectProduct}
            />
          </div>
        </main>

        {isAddOpen && (
          <div className="inventory-modal-overlay">
            <ProductModal onClose={closeModal} onSubmit={handleSubmitProduct} />
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorInventoryPage;
