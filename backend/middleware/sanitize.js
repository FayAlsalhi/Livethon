
const cleanString = (v) =>
  v
    .replace(/\s+/g, " ")            
    .replace(/[\u0000-\u001F]/g, "") 
    .trim();

const sanitizeDeep = (value) => {
  if (Array.isArray(value)) {
    return value.map(sanitizeDeep);
  }
  if (value && typeof value === "object") {
    const clean = {};
    for (const [k, v] of Object.entries(value)) {
      const safeKey = k.replace(/\$/g, "_").replace(/\./g, "_");
      clean[safeKey] = sanitizeDeep(v);
    }
    return clean;
  }
  if (typeof value === "string") {
    return cleanString(value);
  }
  return value;
};

export const sanitizeBody = (req, _res, next) => {
  if (req.body && typeof req.body === "object") {
    req.body = sanitizeDeep(req.body);
  }
  next();
};