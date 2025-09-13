import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(1, { message: "Tên không được để trống" }),
  price: z
    .string()
    .transform((val) => (val === "" ? 0 : Number(val)))
    .refine((num) => num > 0, {
      message: "Số tiền tối thiểu là 1",
    }),
  detailDesc: z.string().trim().min(1, { message: "Mô tả không được để trống" }),
  shortDesc: z.string().trim().min(1, { message: "Mô tả không được để trống" }),
  quantity: z
    .string()
    .transform((val) => (val === "" ? 0 : Number(val)))
    .refine((num) => num > 0, {
      message: "Số tiền tối thiểu là 1",
    }),
  factory: z.string().trim().min(1, { message: "Nhà sản xuất không được để trống" }),
  target: z.string().trim().min(1, { message: "Đối tượng sử dụng không được để trống" }),
});

export type TProductSchema = z.infer<typeof ProductSchema>;
