import { isEmailExist } from "services/client/auth.service";
import z from "zod";

const emailSchema = z.email("Email không hợp lệ").refine(
  async (email) => {
    const existingUser = await isEmailExist(email);
    return !existingUser;
  },
  {
    message: "Email đã được sử dụng",
    path: ["email"],
  }
);

const passwordSchema = z
  .string()
  .min(3, { error: "Mật khẩu phải có ít nhất 3 ký tự" })
  .max(20, { error: "Mật khẩu không được vượt quá 20 ký tự" })
  .refine((password) => /[A-Z]/.test(password), {
    error: "Mật khẩu phải có ít nhất một chữ cái viết hoa",
  })
  .refine((password) => /[a-z]/.test(password), {
    error: "Mật khẩu phải có ít nhất một chữ cái viết thường",
  })
  .refine((password) => /[0-9]/.test(password), { error: "Mật khẩu phải có ít nhất một chữ số" })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    error: "Mật khẩu phải có ít nhất một ký tự đặc biệt (!@#$%^&*)",
  });

export const RegisterSchema = z
  .object({
    fullName: z.string().min(1, { error: "Họ và tên không được để trống" }),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

export type TRegisterSchema = z.infer<typeof RegisterSchema>;
