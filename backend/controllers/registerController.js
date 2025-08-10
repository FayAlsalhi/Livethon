import { individualRegisterSchema } from "../validators/registerValidator.js";
import Individual from "../models/Individual.js";

export const registerIndividual = async (req, res) => {
  try {
    // 1) Validate
    const parsed = individualRegisterSchema.safeParse(req.body);
    if (!parsed.success) {
      const errors = {};
      for (const e of parsed.error.errors) {
        const field = e.path[0];
        if (!errors[field]) errors[field] = e.message; // first error per field
      }
      return res.status(400).json({
        success: false,
        message: "بيانات غير صحيحة",
        errors,
      });
    }

    const data = parsed.data;

    // 2) Duplicate check (email or phone)
    const existing = await Individual.findOne({
      $or: [{ email: data.email.toLowerCase().trim() }, { phone: data.phone.trim() }]
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "بيانات غير صحيحة",
        errors: {
          email: existing.email === data.email.toLowerCase().trim() ? "البريد الإلكتروني مستخدم بالفعل" : undefined,
          phone: existing.phone === data.phone.trim() ? "رقم الجوال مستخدم بالفعل" : undefined
        }
      });
    }

    // 3) Save
    const doc = await Individual.create(data);

    // 4) Respond (spec)
    return res.status(201).json({
      success: true,
      message: "تم التسجيل بنجاح",
      data: {
        id: doc._id.toString(),
        registrationDate: doc.createdAt,
      },
    });
  } catch (error) {
    // Handle Mongo duplicate key (race condition safety)
    if (error?.code === 11000) {
      const errors = {};
      if (error.keyPattern?.email) errors.email = "البريد الإلكتروني مستخدم بالفعل";
      if (error.keyPattern?.phone) errors.phone = "رقم الجوال مستخدم بالفعل";
      return res.status(409).json({
        success: false,
        message: "بيانات غير صحيحة",
        errors
      });
    }

    console.error("❌ Register error:", error);
    return res.status(500).json({
      success: false,
      message: "حدث خطأ في الخادم",
      error: error.message,
    });
  }
};