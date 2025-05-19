import { z } from "zod";

export const becomeOrganizerSchema = z.object({
  organizationName: z.string().min(3, "Nama organisasi minimal 3 karakter"),
  organizationDesc: z.string().min(10, "Deskripsi minimal 10 karakter"),
  organizationAddr: z.string().min(5, "Alamat minimal 5 karakter"),
  organizationPhone: z.string().min(7, "Nomor telepon minimal 7 digit"),
});
