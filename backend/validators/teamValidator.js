import { z } from "zod";

// Arabic name validation regex
const arabicRegex = /^[\u0600-\u06FF\s]+$/;

// Saudi phone validation regex (supports both +966 and 0 formats)
const saudiPhoneRegex = /^(?:\+966|0)5\d{8}$/;

// Team member schema (for both leader and members)
const teamMemberSchema = z.object({
  name: z
    .string({ required_error: "اسم العضو مطلوب" })
    .min(2, "الاسم قصير جداً")
    .max(50, "الاسم يجب ألا يتجاوز 50 حرفاً")
    .regex(arabicRegex, "الاسم يجب أن يكون باللغة العربية"),

  email: z
    .string({ required_error: "البريد الإلكتروني مطلوب" })
    .email("صيغة البريد الإلكتروني غير صحيحة"),

  phone: z
    .string()
    .optional()
    .refine((val) => !val || saudiPhoneRegex.test(val), "رقم الجوال غير صحيح"),

  organization: z
    .string()
    .optional()
    .refine((val) => !val || (val.length >= 2 && val.length <= 100), "هذا الحقل يجب أن يكون بين 2 و 100 حرف"),

  specialization: z
    .string()
    .optional()
    .refine((val) => !val || (val.length >= 2 && val.length <= 50), "هذا الحقل يجب أن يكون بين 2 و 50 حرف"),

  role: z.enum(["قائد الفريق", "عضو"], {
    errorMap: () => ({ message: "الدور غير صحيح" }),
  }),

  gender: z
    .string()
    .optional()
    .refine((val) => !val || val === "ذكر" || val === "أنثى", "الجنس يجب أن يكون ذكر أو أنثى"),

  age: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true; // Optional for members
      const n = parseInt(val, 10);
      return Number.isInteger(n) && n >= 12 && n <= 100;
    }, "العمر يجب أن يكون بين 12 و 100 سنة"),

  skills: z
    .string()
    .optional()
    .refine((val) => !val || (val.length >= 10 && val.length <= 500), "يجب أن يكون الحقل بين 10 و 500 حرف"),
});

// Team leader schema (all fields required)
const teamLeaderSchema = teamMemberSchema.extend({
  phone: z
    .string({ required_error: "رقم الجوال مطلوب" })
    .regex(saudiPhoneRegex, "رقم الجوال غير صحيح"),

  organization: z
    .string({ required_error: "هذا الحقل مطلوب" })
    .min(2, "هذا الحقل مطلوب")
    .max(100, "هذا الحقل يجب ألا يتجاوز 100 حرف"),

  specialization: z
    .string({ required_error: "هذا الحقل مطلوب" })
    .min(2, "هذا الحقل مطلوب")
    .max(50, "هذا الحقل يجب ألا يتجاوز 50 حرف"),

  gender: z.enum(["ذكر", "أنثى"], {
    required_error: "الرجاء اختيار الجنس",
  }),

  age: z
    .string({ required_error: "العمر مطلوب" })
    .refine((val) => {
      const n = parseInt(val, 10);
      return Number.isInteger(n) && n >= 12 && n <= 100;
    }, "العمر يجب أن يكون بين 12 و 100 سنة"),

  skills: z
    .string({ required_error: "المهارات مطلوبة" })
    .min(10, "يجب أن يكون الحقل 10 أحرف على الأقل")
    .max(500, "يجب ألا يتجاوز الحقل 500 حرف"),

  role: z.literal("قائد الفريق"),
});

// Main team registration schema
export const teamRegisterSchema = z.object({
  teamName: z
    .string({ required_error: "اسم الفريق مطلوب" })
    .min(2, "اسم الفريق قصير جداً")
    .max(100, "اسم الفريق يجب ألا يتجاوز 100 حرف")
    .regex(/^[\u0600-\u06FF\s\w]+$/, "اسم الفريق يجب أن يكون صحيحاً"),

  projectIdea: z
    .string({ required_error: "فكرة المشروع مطلوبة" })
    .min(20, "يجب أن تكون فكرة المشروع 20 حرف على الأقل")
    .max(1000, "فكرة المشروع يجب ألا تتجاوز 1000 حرف"),

  teamNumber: z
    .string({ required_error: "يجب تحديد عدد أعضاء الفريق" })
    .refine((val) => ["3", "4", "5"].includes(val), "يجب أن يكون عدد الأعضاء 3 أو 4 أو 5"),

  teamLeader: teamLeaderSchema,

  members: z
    .array(teamMemberSchema)
    .refine((members) => {
      // Validate that all members have role "عضو"
      return members.every(member => member.role === "عضو");
    }, "جميع الأعضاء يجب أن يكون لديهم دور 'عضو'"),
});

// Schema for updating team status (admin use)
export const teamStatusUpdateSchema = z.object({
  status: z.enum(["pending", "approved", "rejected", "cancelled"], {
    required_error: "حالة الفريق مطلوبة",
  }),
  notes: z.string().optional(),
});

// Schema for team search/filtering (admin use)
export const teamSearchSchema = z.object({
  status: z.enum(["pending", "approved", "rejected", "cancelled"]).optional(),
  teamName: z.string().optional(),
  leaderEmail: z.string().email().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(100).optional(),
});
