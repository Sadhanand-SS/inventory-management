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
    0
  );

  const totalValue = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  return (
    <div className="inventory-summary">
      {/* Conditional Rendering */}
      {totalProducts !== 0 ? (
        <>
          <p>Total Products: {totalProducts}</p>
          <p>Total Quantity: {totalQuantity}</p>
          <p>Total Inventory Value: {formatPrice(totalValue)}</p>
        </>
      ) : (
        <p>No inventory available</p>
      )}
    </div>
  );
};

export default InventorySummary;
