import { z } from "zod";

export type InternInsert = z.infer<typeof internInsertSchema>;

export const internInsertSchema = z
  .object({
    nomor_induk: z
      .string()
      .min(1, "Nomor Induk wajib diisi")
      .max(20, "Nomor Induk tidak boleh lebih dari 20"),
    email: z
      .email({
        pattern:
          /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i,
      })
      .min(1, "Email wajib diisi"),
    full_name: z.string().min(1, "Nama Lengkap wajib diisi"),
    password: z.string().min(1, "Password wajib diisi"),
    department: z.string().min(1, "Gedung wajib diisi"),
    institution: z.string().min(1, "Perguruan Tinggi wajib diisi"),
    supervisor_id: z.string().min(1, "Pembimbing wajib diisi"),
    intern_start_date: z.string().min(1, "Tanggal mulai magang wajib diisi"),
    intern_end_date: z.string().min(1, "Tanggal selesai magang wajib diisi"),
    status: z.string().min(1, "Status wajib diisi"),
  })
  .refine(
    (data) =>
      new Date(data.intern_end_date) >= new Date(data.intern_start_date),
    {
      message: "Tanggal selesai magang tidak boleh kurang dari tanggal mulai",
      path: ["intern_end_date"],
    }
  );

export type SupervisorInsert = z.infer<typeof supervisorInsertSchema>;

export const supervisorInsertSchema = z.object({
  nomor_induk: z
    .string()
    .min(1, "Nomor Induk wajib diisi")
    .max(20, "Nomor Induk tidak boleh lebih dari 20"),
  email: z
    .email({
      pattern:
        /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i,
    })
    .min(1, "Email wajib diisi"),
  full_name: z.string().min(1, "Nama Lengkap wajib diisi"),
  password: z.string().min(1, "Password wajib diisi"),
  department: z.string().min(1, "Gedung wajib diisi"),
  status: z.string().min(1, "Status wajib diisi"),
});

export type InternUpdate = z.infer<typeof internUpdateSchema>;

export const internUpdateSchema = z
  .object({
    nomor_induk: z
      .string()
      .min(1, "Nomor Induk wajib diisi")
      .max(20, "Nomor Induk tidak boleh lebih dari 20"),
    email: z
      .email({
        pattern:
          /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i,
      })
      .min(1, "Email wajib diisi"),
    full_name: z.string().min(1, "Nama Lengkap wajib diisi"),
    department: z.string().min(1, "Gedung wajib diisi"),
    institution: z.string().min(1, "Perguruan Tinggi wajib diisi"),
    supervisor_id: z.string().min(1, "Pembimbing wajib diisi"),
    intern_start_date: z.string().min(1, "Tanggal mulai magang wajib diisi"),
    intern_end_date: z.string().min(1, "Tanggal selesai magang wajib diisi"),
    status: z.string().min(1, "Status wajib diisi"),
  })
  .refine(
    (data) =>
      new Date(data.intern_end_date) >= new Date(data.intern_start_date),
    {
      message: "Tanggal selesai magang tidak boleh kurang dari tanggal mulai",
      path: ["intern_end_date"],
    }
  );

export type SupervisorUpdate = z.infer<typeof supervisorUpdateSchema>;

export const supervisorUpdateSchema = z.object({
  nomor_induk: z
    .string()
    .min(1, "Nomor Induk wajib diisi")
    .max(20, "Nomor Induk tidak boleh lebih dari 20"),
  email: z
    .email({
      pattern:
        /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i,
    })
    .min(1, "Email wajib diisi"),
  full_name: z.string().min(1, "Nama Lengkap wajib diisi"),
  department: z.string().min(1, "Gedung wajib diisi"),
  status: z.string().min(1, "Status wajib diisi"),
});
