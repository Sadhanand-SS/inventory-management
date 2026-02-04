import ProductForm from "./ProductForm";
import { Box, Stack, Modal } from "@mui/material";

const ProductModal = ({ open, onClose, onSubmit }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          my: 4,
          maxHeight: "90vh",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: 0,
            height: 0,
          },
        }}
      >
        <Stack>
          <ProductForm onSubmit={onSubmit} onClose={onClose} />
        </Stack>
      </Box>
    </Modal>
  );
};

export default ProductModal;
