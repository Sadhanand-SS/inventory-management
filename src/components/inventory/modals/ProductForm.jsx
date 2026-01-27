import { useEffect, useRef, useState } from "react";

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
  const isSubmittingRef = useRef(false);
  const nameInputRef = useRef(null);
  const safeProduct = product || {};

  const [name, setName] = useState(safeProduct.name || "");
  const [price, setPrice] = useState(safeProduct.price || "");
  const [quantity, setQuantity] = useState(safeProduct.quantity || "");
  const [category, setCategory] = useState(safeProduct.category || "");

  useEffect(() => {
    if (nameInputRef.current) nameInputRef.current.focus();
  }, []);

  /**
   * Submit handler.
   * Builds product object.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
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
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="form-fields-container">
        <div className="form-group">
          <label className="form-label" htmlFor="name">
            Product Name
          </label>
          <input
            id="name"
            className="form-input"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            ref={nameInputRef}
          />
        </div>

        <div className="form-group-row">
          <div className="form-group">
            <label className="form-label" htmlFor="price">
              Price
            </label>
            <input
              id="price"
              className="form-input"
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="quantity">
              Quantity
            </label>
            <input
              id="quantity"
              className="form-input"
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="category">
            Category
          </label>
          <input
            id="category"
            className="form-input"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="form-actions">
        <button className="btn-submit" type="submit">
          Save Product
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
