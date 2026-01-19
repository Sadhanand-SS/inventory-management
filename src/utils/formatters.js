const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

export const formatPrice = (price) => {
  if (typeof price !== "number" || isNaN(price)) return "-";
  return currencyFormatter.format(price);
};

export const formatQuantity = (quantity) => {
  if (typeof quantity !== "number" || isNaN(quantity)) return "-";
  return `${quantity} pcs`;
};
