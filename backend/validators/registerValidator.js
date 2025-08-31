import { z } from "zod";

const arabicRegex = /^[\u0600-\u06FF\s]+$/;

const saudiPhoneRegex = /^(?:\+966|0)5\d{8}$/;

export const individualRegisterSchema = z.object({
  name: z
    .string({ required_error: "الاسم يجب أن يكون باللغة العربية" })
    .min(3, "الاسم يجب أن يحتوي على 3 أحرف على الأقل")
    .max(50, "الاسم يجب ألا يتجاوز 50 حرفًا")
    .regex(arabicRegex, "الاسم يجب أن يكون باللغة العربية"),

  gender: z.enum(["ذكر", "أنثى"], {
    errorMap: () => ({ message: "يرجى اختيار الجنس" }),
  }),

  email: z
    .string({ required_error: "البريد الإلكتروني غير صحيح" })
    .email("البريد الإلكتروني غير صحيح"),

  phone: z
    .string({ required_error: "رقم الجوال غير صحيح (مثال: +966501234567)" })
    .regex(saudiPhoneRegex, "رقم الجوال غير صحيح (مثال: +966501234567)"),

  studyWork: z
    .string({ required_error: "جهة العمل/الدراسة مطلوبة" })
    .min(3, "جهة العمل/الدراسة مطلوبة")
    .max(100, "جهة العمل/الدراسة يجب ألا تتجاوز 100 حرف"),

  specialization: z
    .string({ required_error: "التخصص مطلوب" })
    .min(2, "التخصص مطلوب")
    .max(50, "التخصص يجب ألا تتجاوز 50 حرفًا"),

  age: z
    .string({ required_error: "العمر يجب أن يكون 12 سنة على الأقل" })
    .refine((val) => {
      const n = parseInt(val, 10);
      return Number.isInteger(n) && n >= 12 && n <= 100;
    }, "العمر يجب أن يكون 12 سنة على الأقل"),

  skills: z
    .string({ required_error: "المهارات/الخبرات مطلوبة" })
    .min(10, "المهارات/الخبرات مطلوبة")
    .max(500, "المهارات/الخبرات يجب ألا تتجاوز 500 حرف"),
});