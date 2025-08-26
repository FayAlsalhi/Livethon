import rateLimit from "express-rate-limit";


const isDevelopment = process.env.NODE_ENV === 'development';

export const teamRegistrationLimiter = isDevelopment 
  ? (req, res, next) => next()
  : rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 10, 
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

export const individualRegistrationLimiter = isDevelopment 
  ? (req, res, next) => next()
  : rateLimit({
      windowMs: 15 * 60 * 1000, 
      max: 5, 
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

export const generalApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, 
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
