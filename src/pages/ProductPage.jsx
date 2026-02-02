import { useCallback, useContext, useState, useMemo } from "react";
import {
  useParams,
  NavLink,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom"; // Added NavLink and Outlet
import { InventoryContext } from "../contexts/InventoryContext";
import Notification from "../components/ui/Notification"; // Assuming you have this

const ProductPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { vendorId, productId } = useParams();
  const { products, updateProduct } = useContext(InventoryContext);

  const [notification, setNotification] = useState(null);

  const currentProduct = useMemo(() => {
    return products.find(
      (product) =>
        product.vendorId === vendorId && product.productId === productId,
    );
  }, [products, vendorId, productId]);

  const handleProductUpdate = useCallback(
    async (updatedProduct) => {
      const result = await updateProduct(updatedProduct);

      if (result.success) {
        setNotification({
          type: "success",
          message: "Product updated successfully",
        });
      } else {
        setNotification({
          type: "error",
          message: result.error,
        });
      }
      return result;
    },
    [updateProduct],
  );

  const handleBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate(-1);
    }
  };
  // Memoize contexts for the Outlet
  const overviewCtx = useMemo(
    () => ({ product: currentProduct }),
    [currentProduct],
  );
  const settingsCtx = useMemo(
    () => ({
      product: currentProduct,
      onUpdate: handleProductUpdate,
    }),
    [currentProduct, handleProductUpdate],
  );

  if (!currentProduct) {
    return (
      <div className="product-not-found">
        <h2>Product not found</h2>

        <button type="button" onClick={handleBack} className="link-button">
          Inventory
        </button>
      </div>
    );
  }

  return (
    <div className="detail-page-container">
      <div className="product-page-header">
        <button type="button" onClick={handleBack} className="link-button">
          ←
        </button>
      </div>
      {/* 1. Header */}
      <header className="vendor-details-header">
        <h2 className="page-title">{currentProduct.name}</h2>
        <span className="page-description">
          SKU: {currentProduct.identifiers?.sku || productId}
        </span>
      </header>

      {/* 2. Pill Navigation */}
      <nav className="tab-navigation">
        <NavLink
          end
          to=""
          className={({ isActive }) =>
            isActive ? "tab-link active" : "tab-link"
          }
        >
          Overview
        </NavLink>
        <NavLink
          to="settings"
          className={({ isActive }) =>
            isActive ? "tab-link active" : "tab-link"
          }
        >
          Settings
        </NavLink>
      </nav>

      {/* 3. Notifications */}
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      {/* 4. Nested Content */}
      <div className="tab-content-wrapper">
        <Outlet context={{ overview: overviewCtx, settings: settingsCtx }} />
      </div>
    </div>
  );
};

export default ProductPage;
