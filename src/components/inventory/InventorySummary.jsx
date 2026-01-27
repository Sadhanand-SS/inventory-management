import { formatPrice } from "../../utils/formatters";
/**
 * InventorySummary
 * ----------------
 * Displays derived summary information about inventory.
 *
 * This component:
 * - Receives raw products as props
 * - Computes derived data
 * - Does NOT store state
 */
const InventorySummary = ({ products }) => {
  const totalProducts = products.length;

  const totalQuantity = products.reduce(
    (sum, product) => sum + product.quantity,
    0,
  );

  const totalValue = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0,
  );

  return (
    <div className="inventory-summary">
      <div className="summary-container">
        <h2 className="summary-title">Inventory Overview</h2>

        {totalProducts !== 0 ? (
          <div className="summary-grid">
            <div className="summary-card total-products">
              <span className="summary-label">Total Products</span>
              <p className="summary-value">{totalProducts}</p>
            </div>

            <div className="summary-card total-quantity">
              <span className="summary-label">Total Quantity</span>
              <p className="summary-value">{totalQuantity}</p>
            </div>

            <div className="summary-card total-value">
              <span className="summary-label">Total Inventory Value</span>
              <p className="summary-value highlight">
                {formatPrice(totalValue)}
              </p>
            </div>
          </div>
        ) : (
          <div className="summary-empty-state">
            <p className="empty-message">No inventory available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventorySummary;
