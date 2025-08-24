import rateLimit from "express-rate-limit";

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV === 'development';

// Rate limiter for team registration (more restrictive than individual)
export const teamRegistrationLimiter = isDevelopment 
  ? (req, res, next) => next() // Skip rate limiting in development
  : rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 10, // Limit each IP to 10 team registration attempts per window (increased for testing)
      message: {
        success: false,
        message: "تم تجاوز الحد الأقصى لمحاولات التسجيل. يرجى المحاولة لاحقاً.",
        retryAfter: "15 دقيقة"
      },
      standardHeaders: true,
      legacyHeaders: false,
      handler: (req, res) => {
        res.status(429).json({
          success: false,
          message: "تم تجاوز الحد الأقصى لمحاولات التسجيل. يرجى المحاولة لاحقاً.",
          retryAfter: "15 دقيقة"
        });
      }
    });

// Rate limiter for individual registration
export const individualRegistrationLimiter = isDevelopment 
  ? (req, res, next) => next() // Skip rate limiting in development
  : rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 5, // Limit each IP to 5 individual registration attempts per window
      message: {
        success: false,
        message: "تم تجاوز الحد الأقصى لمحاولات التسجيل. يرجى المحاولة لاحقاً.",
        retryAfter: "15 دقيقة"
      },
      standardHeaders: true,
      legacyHeaders: false,
      handler: (req, res) => {
        res.status(429).json({
          success: false,
          message: "تم تجاوز الحد الأقصى لمحاولات التسجيل. يرجى المحاولة لاحقاً.",
          retryAfter: "15 دقيقة"
        });
      }
    });

// General API rate limiter
export const generalApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: {
    success: false,
    message: "تم تجاوز الحد الأقصى للطلبات. يرجى المحاولة لاحقاً.",
    retryAfter: "15 دقيقة"
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: "تم تجاوز الحد الأقصى للطلبات. يرجى المحاولة لاحقاً.",
      retryAfter: "15 دقيقة"
    });
  }
});
