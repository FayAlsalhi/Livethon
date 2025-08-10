// collapse multiple spaces, strip control chars, then trim
const cleanString = (v) =>
  v
    .replace(/\s+/g, " ")            // collapse internal spaces
    .replace(/[\u0000-\u001F]/g, "") // remove control chars
    .trim();

// Recursively sanitize keys ($ and .) and normalize strings
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

// Body-only sanitizer (doesn't touch req.query in Express 5)
export const sanitizeBody = (req, _res, next) => {
  if (req.body && typeof req.body === "object") {
    req.body = sanitizeDeep(req.body);
  }
  next();
};