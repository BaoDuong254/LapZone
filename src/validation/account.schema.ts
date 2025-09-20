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

// Schema for changing password
export const ChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, { message: "Mật khẩu hiện tại không được để trống" }),
    newPassword: z
      .string()
      .min(3, { error: "Mật khẩu phải có ít nhất 3 ký tự" })
      .max(20, { error: "Mật khẩu không được vượt quá 20 ký tự" }),
    confirmNewPassword: z.string().min(1, { message: "Xác nhận mật khẩu không được để trống" }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Mật khẩu mới và xác nhận mật khẩu không khớp",
    path: ["confirmNewPassword"],
  });

export type TUpdateProfileSchema = z.infer<typeof UpdateProfileSchema>;
export type TChangePasswordSchema = z.infer<typeof ChangePasswordSchema>;
