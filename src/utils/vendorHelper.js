export const REQUIRED_FIELDS_ADD = ["name", "email"];
export const REQUIRED_FIELDS_UPDATE = ["vendorId", "name", "email", "status","isActive"];

export const isValidObject = (obj, requiredFields = REQUIRED_FIELDS_ADD) => {
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) return false;
  return requiredFields.every(
    (key) =>
      Object.prototype.hasOwnProperty.call(obj, key) &&
      obj[key] !== null &&
      obj[key] !== undefined &&
      obj[key] !== "",
  );
};
