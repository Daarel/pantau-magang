import { useEffect, type FC } from "react";
import type { IconType } from "react-icons";

import {
  FaUser,
  FaUserTie,
  FaIdCardAlt,
  FaBuilding,
  FaCalendarAlt,
} from "react-icons/fa";
import { PiPassword } from "react-icons/pi";
import { MdEmail, MdSchool } from "react-icons/md";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  internInsertSchema,
  InternInsert,
  insertDataToLowerCase,
} from "@/lib/validation/schema";

interface InternFormDialogProps {
  fields: FieldConfig[];
  open: boolean;
  title: string;
  onOpenChange: (open: boolean) => void;
  initialData?: Partial<InternInput> & { id?: string };
  onSubmit: (values: InternInput) => Promise<void> | void;
}

interface FieldConfig {
  name: string;
  placeholder: string;
  label: string;
  type?: string;
  Icon: IconType;
  iconClassName?: string;
}

const InternFormDialog: FC<InternFormDialogProps> = ({
  open,
  onOpenChange,
  initialData,
  fields,
}) => {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<InternInput>({
  //   resolver: zodResolver(internSchema),
  // });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InternInsert>({
    resolver: zodResolver(internInsertSchema),
  });

  const onSubmit = async (data: InternInsert) => {
    const payload = { ...insertDataToLowerCase(data), role: "intern" };

    try {
      const res = await fetch("/api/intern", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        console.error("Error:", result.error);
        alert(`Gagal menambah user: ${result.error}`);
        return;
      }

      console.log("User berhasil ditambahkan:", result.data);
      alert("User berhasil ditambahkan!");
      onOpenChange(false); // tutup dialog setelah submit sukses
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan jaringan");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[600px] max-h-[80vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Tambah Anak Magang</DialogTitle>
          <DialogDescription className='text-gray-500'>
            Silahkan input data anak magang
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(async (values) => {
            await onSubmit(values);
            onOpenChange(false);
          })}
          className='flex flex-col gap-3'
        >
          <div>
            <Label>
              <span className='w-4 h-4'>
                <FaIdCardAlt className='w-4 h-4' />
              </span>
              Nomor Induk
            </Label>
            <Input
              {...register("nomor_induk")}
              placeholder='Masukkan nomor induk'
              className='my-1'
              required
            />
            {errors.nomor_induk && (
              <p className='text-sm text-red-500'>
                {errors.nomor_induk.message}
              </p>
            )}
            {errors.nomor_induk && (
              <p className='text-sm text-red-500'>
                {errors.nomor_induk.message}
              </p>
            )}
          </div>

          <div>
            <Label>
              <span className='w-4 h-4'>
                <MdEmail className='w-4 h-4' />
              </span>
              Email
            </Label>
            <Input
              type='email'
              {...register("email")}
              placeholder='Masukkan email'
              className='my-2'
              required
            />
            {errors.email && (
              <p className='text-sm text-red-500'>{errors.email.message}</p>
            )}
            {errors.email && (
              <p className='text-sm text-red-500'>{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label>
              <span className='w-4 h-4'>
                <FaUser className='w-4 h-4' />
              </span>
              Nama Lengkap
            </Label>
            <Input
              {...register("full_name")}
              placeholder='Masukkan nama lengkap'
              className='my-2'
              required
            />
            {errors.full_name && (
              <p className='text-sm text-red-500'>{errors.full_name.message}</p>
            )}
            {errors.full_name && (
              <p className='text-sm text-red-500'>{errors.full_name.message}</p>
            )}
          </div>

          <div>
            <Label>
              <span className='w-4 h-4'>
                <PiPassword className='w-4 h-4' />
              </span>
              Password
            </Label>
            <Input
              {...register("password")}
              placeholder='Masukkan password'
              className='my-2'
              required
            />
            {errors.password && (
              <p className='text-sm text-red-500'>{errors.password.message}</p>
            )}
            {errors.password && (
              <p className='text-sm text-red-500'>{errors.password.message}</p>
            )}
          </div>

          <div>
            <Label>
              <span className='w-4 h-4'>
                <FaBuilding className='w-4 h-4' />
              </span>
              Gedung
            </Label>
            <Input
              {...register("department")}
              placeholder='Masukkan penempatan gedung'
              className='my-2'
              required
            />
            {errors.department && (
              <p className='text-sm text-red-500'>
                {errors.department.message}
              </p>
            )}
            {errors.department && (
              <p className='text-sm text-red-500'>
                {errors.department.message}
              </p>
            )}
          </div>

          <div>
            <Label>
              <span className='w-4 h-4'>
                <MdSchool className='w-4 h-4' />
              </span>
              Perguruan Tinggi
            </Label>
            <Input
              {...register("institution")}
              placeholder='Masukkan asal perguruan tinggi'
              className='my-2'
              required
            />
            {errors.institution && (
              <p className='text-sm text-red-500'>
                {errors.institution.message}
              </p>
            )}
            {errors.institution && (
              <p className='text-sm text-red-500'>
                {errors.institution.message}
              </p>
            )}
          </div>

          <div>
            <Label>
              <span className='w-4 h-4'>
                <FaUserTie className='w-4 h-4' />
              </span>
              Nomor Induk Pembimbing
            </Label>
            <Input
              {...register("nomor_induk_supervisor")}
              placeholder='Masukkan Nomor Induk Pembimbing'
              className='my-2'
              required
            />
            {errors.nomor_induk_supervisor && (
              <p className='text-sm text-red-500'>
                {errors.nomor_induk_supervisor.message}
              </p>
            )}
            {errors.nomor_induk_supervisor && (
              <p className='text-sm text-red-500'>
                {errors.nomor_induk_supervisor.message}
              </p>
            )}
          </div>

          <div>
            <Label>
              <span className='w-4 h-4'>
                <FaCalendarAlt className='w-4 h-4' />
              </span>
              Mulai Magang
            </Label>
            <Input
              type='date'
              {...register("intern_start_date")}
              placeholder='Masukkan tanggal mulai magang'
              className='my-2'
              required
            />
            {errors.intern_start_date && (
              <p className='text-sm text-red-500'>
                {errors.intern_start_date.message}
              </p>
              <p className='text-sm text-red-500'>
                {errors.intern_start_date.message}
              </p>
            )}
          </div>

          <div>
            <Label>
              <span className='w-4 h-4'>
                <FaCalendarAlt className='w-4 h-4' />
              </span>
              Selesai Magang
            </Label>
            <Input
              type='date'
              {...register("intern_end_date")}
              placeholder='Masukkan tanggal selesai magang'
              className='my-2'
              required
            />
            {errors.intern_end_date && (
              <p className='text-sm text-red-500'>
                {errors.intern_end_date.message}
              </p>
            )}
            {errors.intern_end_date && (
              <p className='text-sm text-red-500'>
                {errors.intern_end_date.message}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button type='submit'>Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InternFormDialog;
