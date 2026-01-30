import { useEffect, useRef, useState } from "react";

const ProductForm = ({ product, onSubmit }) => {
  const nameInputRef = useRef(null);
  const isSubmittingRef = useRef(false);

  // ---------- SAFE NORMALIZATION (THIS FIXES THE CRASH) ----------
  const safeProduct = product ?? {};

  const pricing = safeProduct.pricing ?? {};
  const stock = safeProduct.stock ?? {};
  const identifiers = safeProduct.identifiers ?? {};

  // ---------- STATE ----------
  const [name, setName] = useState(safeProduct.name || "");
  const [description, setDescription] = useState(
    safeProduct.description || ""
  );
  const [category, setCategory] = useState(safeProduct.category || "");
  const [subCategory, setSubCategory] = useState(
    safeProduct.subCategory || ""
  );
  const [brand, setBrand] = useState(safeProduct.brand || "");

  const [mrp, setMrp] = useState(pricing.mrp || "");
  const [sellingPrice, setSellingPrice] = useState(
    pricing.sellingPrice || ""
  );
  const [taxIncluded, setTaxIncluded] = useState(
    pricing.taxIncluded || false
  );

  const [quantity, setQuantity] = useState(stock.quantity || "");
  const [lowStockThreshold, setLowStockThreshold] = useState(
    stock.lowStockThreshold || 10
  );

  const [sku, setSku] = useState(identifiers.sku || "");
  const [active, setActive] = useState(safeProduct.isActive || false);

  // ---------- EFFECT ----------
  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  // ---------- SUBMIT (INTENTIONALLY EMPTY LOGIC) ----------
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    const formProduct = {
      ...product,
      name: name.trim(),
      description : description.trim(),
      category : category.trim(),
      subCategory :subCategory.trim(),
      pricing : {
        mrp:mrp,
        sellingPrice:sellingPrice,
        taxIncluded : taxIncluded
      },
      stock :{
        quantity : quantity,
        lowStockThreshold :lowStockThreshold,
      },
      identifiers : {
        sku :sku
      },
      isActive : active
    }
    
    onSubmit(formProduct);
  };

  // ---------- JSX ----------
  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="form-fields-container">

        <div className="form-group">
          <label className="form-label">Product Name</label>
          <input
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            ref={nameInputRef}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <input
            className="form-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Category</label>
          <input
            className="form-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Sub Category</label>
          <input
            className="form-input"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Brand</label>
          <input
            className="form-input"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>

        <div className="form-group-row">
          <div className="form-group">
            <label className="form-label">MRP</label>
            <input
              type="number"
              className="form-input"
              value={mrp}
              onChange={(e) => setMrp(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Selling Price</label>
            <input
              type="number"
              className="form-input"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Tax Included</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  checked={taxIncluded === true}
                  onChange={() => setTaxIncluded(true)}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  checked={taxIncluded === false}
                  onChange={() => setTaxIncluded(false)}
                />
                No
              </label>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Quantity</label>
          <input
            type="number"
            className="form-input"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Low Stock Threshold</label>
          <input
            type="number"
            className="form-input"
            value={lowStockThreshold}
            onChange={(e) => setLowStockThreshold(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">SKU</label>
          <input
            className="form-input"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Status</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                checked={active === true}
                onChange={() => setActive(true)}
              />
              Active
            </label>
            <label>
              <input
                type="radio"
                checked={active === false}
                onChange={() => setActive(false)}
              />
              Inactive
            </label>
          </div>
        </div>

      </div>

      <div className="form-actions">
        <button type="submit" className="btn-submit">
          Save Product
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
