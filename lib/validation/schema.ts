import { z } from "zod";

const formatDateToYMD = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

export const internSchema = z
  .object({
    nomor_induk: z.string().min(1, "Nomor Induk wajib diisi"),
    email: z.string().email("Email tidak valid"),
    full_name: z.string().min(1, "Nama Lengkap wajib diisi"),
    department: z.string().min(1, "Gedung wajib diisi"),
    institution: z.string().min(1, "Perguruan Tinggi wajib diisi"),
    supervisor_name: z.string().min(1, "Pembimbing wajib diisi"),
    intern_start_date: z.preprocess((val) => {
      if (typeof val === "string" || val instanceof Date) return new Date(val);
    }, z.date({ message: "Tanggal mulai magang tidak valid" })),
    intern_end_date: z.preprocess((val) => {
      if (typeof val === "string" || val instanceof Date) return new Date(val);
    }, z.date({ message: "Tanggal selesai magang tidak valid" })),
  })
  .refine((data) => data.intern_end_date >= data.intern_start_date, {
    message: "Tanggal selesai magang tidak boleh kurang dari tanggal mulai",
    path: ["intern_end_date"],
  });

export type InternInput = z.infer<typeof internSchema>;

export const prepareForBackend = (data: InternInput) => ({
  ...data,
  intern_start_date: formatDateToYMD(data.intern_start_date),
  intern_end_date: formatDateToYMD(data.intern_end_date),
});
