export const REQUIRED_FIELDS_ADD = [
  "vendorId",
  "name",
  "price",
  "quantity",
  "category",
];
export const REQUIRED_FIELDS_UPDATE = [
  "id",
  "vendorId",
  "name",
  "price",
  "quantity",
  "category",
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
