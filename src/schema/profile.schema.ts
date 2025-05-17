import { z } from "zod";

export const updateProfilSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  bio: z.string().max(255).optional(),
});

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(6, "Password lama wajib diisi"),
  newPassword: z.string().min(6, "Password baru minimal 6 karakter"),
});
