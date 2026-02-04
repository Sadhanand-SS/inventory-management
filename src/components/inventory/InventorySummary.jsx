import { Typography, Box, Paper, Stack} from "@mui/material";
import {styled} from '@mui/material/styles'
import { formatPrice, formatQuantity } from "../../utils/formatters";
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
    (sum, product) => sum + Number(product.stock?.quantity || 0),
    0,
  );

  const totalInventoryValue = products.reduce((sum, product) => {
    const mrp = Number(product.pricing?.mrp || 0);
    const qty = Number(product.stock?.quantity || 0);
    return sum + mrp * qty;
  }, 0);

  const PaddedStack = styled(Stack)(({ theme }) => ({
    gap: theme.spacing(2),
    padding: theme.spacing(4),
  }));

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ pb: 3, pt: 3 }}>
        Inventory Overview
      </Typography>
      {totalProducts !== 0 ? (
        <Paper>
          <PaddedStack>
            <Typography variant="subtitle1">
              Total Products : {totalProducts}
            </Typography>
            <Typography variant="subtitle1">
              Total Quantity :{" "}
              {Number.isNaN(totalQuantity)
                ? "_"
                : formatQuantity(totalQuantity)}
            </Typography>
            <Typography variant="subtitle1">
              Total Valuse :{" "}
              {Number.isNaN(totalInventoryValue)
                ? "—"
                : formatPrice(totalInventoryValue)}
            </Typography>
          </PaddedStack>
        </Paper>
      ) : (
        <Paper>
          <PaddedStack>
            <Typography variant="subtitle1">No inventory available</Typography>
          </PaddedStack>
        </Paper>
      )}
    </Box>
  );
};

export default InventorySummary;
