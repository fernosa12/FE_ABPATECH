import { z } from "zod";

export const registerSchema = z
  .object({
    email: z
      .string({ message: "Email harus diisi" })
      .min(2, { message: "Email minimal 2 karakter" })
      .max(50, { message: "Email maksimal 50 karakter" })
      .email({ message: "Email tidak valid" }),
    password: z
      .string({ message: "Password harus diisi" })
      .min(8, { message: "Password minimal 8 karakter" })
      .max(50, { message: "Password maksimal 50 karakter" }),
    confirm_password: z
      .string({ message: "Isi password terlebih dahulu" })
      .min(8, { message: "Password minimal 8 karakter" })
      .max(50, { message: "Password maksimal 50 karakter" }),
    mobile_number: z.string({ message: "Nomor telepon harus diisi" }),
    foto: z.string({ message: "Foto harus diisi" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords tidak sama",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z
    .string({ message: "Email harus diisi" })
    .min(2, { message: "Email minimal 2 karakter" })
    .max(50, { message: "Email maksimal 50 karakter" })
    .email({ message: "Email tidak valid" }),
  password: z
    .string({ message: "Password harus diisi" })
    .min(8, { message: "Password minimal 8 karakter" })
    .max(50, { message: "Password maksimal 50 karakter" }),
});

export const userDataSchema = z.object({
  email: z
    .string({ message: "Email harus diisi" })
    .min(2, { message: "Email minimal 2 karakter" })
    .max(50, { message: "Email maksimal 50 karakter" })
    .email({ message: "Email tidak valid" }),
  first_name: z
    .string({ message: "Nama depan harus diisi" })
    .min(2, { message: "Nama depan minimal 2 karakter" })
    .max(50, { message: "Nama depan maksimal 50 karakter" }),
  last_name: z
    .string({ message: "Nama belakang harus diisi" })
    .min(2, { message: "Nama belakang minimal 2 karakter" })
    .max(50, { message: "Nama belakang maksimal 50 karakter" }),
});

export const topUpSchema = z.object({
  top_up_amount: z
    .string({ message: "Jumlah top up harus diisi" })
    .min(10000, { message: "Mininal top up 10.000" })
    .max(1000000, { message: "Maximal top up 1.000.000" }),
});
