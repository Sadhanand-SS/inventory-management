import { Modal, Box, Stack } from "@mui/material";
import VendorForm from "./VendorForm";

const VendorModal = ({ open, onClose, onSubmit }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box sx={{ my: 4, maxHeight: "90vh", overflowY: "auto" }}>
        <Stack>
          <VendorForm onSubmit={onSubmit} onClose={onClose} />
        </Stack>
      </Box>
    </Modal>
  );
};
export default VendorModal;
