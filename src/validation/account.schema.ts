import z from "zod";

// Schema for updating profile (excluding password)
export const UpdateProfileSchema = z.object({
  fullName: z.string().min(1, { message: "Họ và tên không được để trống" }),
  phone: z
    .string()
    .optional()
    .refine(
      (phone) => {
        if (!phone) return true; // Optional field
        return /^[0-9]{10,11}$/.test(phone);
      },
      {
        message: "Số điện thoại không hợp lệ (10-11 số)",
      }
    ),
  address: z.string().optional(),
});

export type TUpdateProfileSchema = z.infer<typeof UpdateProfileSchema>;
