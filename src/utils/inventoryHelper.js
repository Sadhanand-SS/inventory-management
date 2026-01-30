export const REQUIRED_FIELDS_ADD = [
  "vendorId",
  "name",
  "description",
  "category",
  "pricing",
  "stock",
];

export const REQUIRED_FIELDS_UPDATE = [
  "productId",
  "name",
  "description",
  "category",
  "pricing",
  "stock",
  "isActive",
];

export function isValidObject(obj, requiredFields = REQUIRED_FIELDS_ADD) {
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) {
    return false;
  }

  return requiredFields.every(
    (key) =>
      Object.prototype.hasOwnProperty.call(obj, key) &&
      obj[key] !== null &&
      obj[key] !== undefined &&
      obj[key] !== "",
  );
}
