import { useCallback, useContext, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { InventoryContext } from "../contexts/InventoryContext";
import ProductModal from "../components/inventory/modals/ProductModal";
import ProductOverview from "../components/inventory/ProductOverview";

const ProductPage = () => {
  const { vendorId, productId } = useParams();
  const { products, updateProduct } = useContext(InventoryContext);

  const [isEditOpen, setIsEditOpen] = useState(false);
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
          message: "Product updated succesfully",
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

  return (
    <>
    <ProductOverview product={currentProduct} />
      {isEditOpen && (
        <ProductModal
          product={currentProduct}
          onClose={closeModal}
          onSubmit={handleProductUpdate}
        />
      )}
    </>
  );
};

export default ProductPage;
