import { useState } from "react";

/**
 * ProductForm
 * -----------
 * Local interaction unit.
 *
 * Responsibilities:
 * - Manage form state
 * - Build product object
 * - Notify parent on submit
 */
const ProductForm = ({ product, onSubmit }) => {

  /**
   * Prefill inputs when editing.
   * Empty string fallback for ADD mode.
   */
  const [name, setName] = useState(product.name || "");
  const [price, setPrice] = useState(product.price || "");
  const [quantity, setQuantity] = useState(product.quantity || "");
  const [category, setCategory] = useState(product.category || "");

  /**
   * Submit handler.
   * Builds product object.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProduct = {
      ...product, // preserves id during EDIT
      name: name.trim(),
      price: Number(price),
      quantity: Number(quantity),
      category: category.trim(),
    };

    onSubmit(updatedProduct);
  };

  return (
    <form onSubmit={handleSubmit}>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
      />

      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />

      <button type="submit">
        Save
      </button>

    </form>
  );
};

export default ProductForm;
