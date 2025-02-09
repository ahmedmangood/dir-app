import { z } from "zod";

export const choiceSchema = z.object({
  _id: z.string().optional(), // Optional for new choices
  name: z
    .string()
    .min(3, "الإسم يجب أن يكون على الأقل 3 حروف")
    .max(50, "الإسم لا يمكن أن يتجاوز 50 حرفًا"),
  steps: z
    .array(z.string().min(5, "كل خطوة يجب أن تكون على الأقل 5 حروف"))
    .min(1, "يجب إضافة خطوة واحدة على الأقل"),
  image: z.string().url("رابط الصورة غير صحيح").optional(), // Optional image URL
});
