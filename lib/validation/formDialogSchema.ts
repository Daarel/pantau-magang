import { z } from "zod";

const supervisorFormSchema = z.object({
  nama: z
    .string()
    .min(5, "Nama minimal 5 karakter")
    .max(30, "nama maksimal 30 karakter"),
  nomorInduk: z
    .string()
    .regex(/^\d+$/, "NIM/NIS harus berupa angka")
    .min(8, "NIM/NIS minimal 8 digit")
    .max(15, "NIM/NIS maksimal 15 digit"),
  password: z
    .string()
    .min(6, "Password minimal 6 karakter")
    .regex(/[A-Z]/, "Password harus ada huruf besar")
    .regex(/[a-z]/, "Password harus ada huruf kecil")
    .regex(/[0-9]/, "Password harus ada angka"),
  gedung: z.string().min(1, "Gedung wajib diisi"),
});

const internFormSchema = z
  .object({
    nama: z
      .string()
      .min(5, "Nama minimal 5 karakter")
      .max(40, "nama maksimal 40 karakter"),
    nomorInduk: z
      .string()
      .regex(/^\d+$/, "NIM/NIS harus berupa angka")
      .min(8, "NIM/NIS minimal 8 digit")
      .max(15, "NIM/NIS maksimal 15 digit"),
    password: z
      .string()
      .min(6, "Password minimal 6 karakter")
      .regex(/[A-Z]/, "Password harus ada huruf besar")
      .regex(/[a-z]/, "Password harus ada huruf kecil")
      .regex(/[0-9]/, "Password harus ada angka"),
    gedung: z.string().min(1, "Gedung wajib diisi"),
    pembimbing: z.string().min(1, "Pembimbing wajib diisi"),
    mulaiMagang: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Tanggal mulai tidak valid",
    }),
    selesaiMagang: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Tanggal selesai tidak valid",
    }),
  })
  .refine(
    (data) => new Date(data.mulaiMagang) <= new Date(data.selesaiMagang),
    {
      message: "Tanggal mulai tidak boleh setelah tanggal selesai",
      path: ["selesaiMagang"],
    }
  );

export type SupervisorFormData = z.infer<typeof supervisorFormSchema>;
export type InternFormData = z.infer<typeof internFormSchema>;

export { supervisorFormSchema, internFormSchema };
