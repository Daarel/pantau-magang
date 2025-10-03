import { useEffect, useState, type FC } from "react";

import {
  FaUser,
  FaUserTie,
  FaIdCardAlt,
  FaBuilding,
  FaCalendarAlt,
  FaUserCheck,
} from "react-icons/fa";
import { PiPassword } from "react-icons/pi";
import { MdEmail, MdSchool } from "react-icons/md";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { internInsertSchema, InternInsert } from "@/lib/validation/schema";
import {
  getSupervisors,
  insertDataToLowerCase,
  SelectOption,
} from "@/lib/helper/dataInsert.helper";
import Combobox from "@/components/ui/combobox";
import { pilihanGedung } from "@/const";

interface InternFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const InsertInternForm: FC<InternFormDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InternInsert>({
    resolver: zodResolver(internInsertSchema),
  });

  const [supervisors, setSupervisors] = useState<SelectOption[]>([]);

  useEffect(() => {
    getSupervisors().then(setSupervisors);
  }, []);

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
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
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
          </div>

          <div>
            <Label>
              <FaBuilding className='w-4 h-4 inline' /> Gedung
            </Label>
            <Controller
              name='department'
              control={control}
              render={({ field }) => (
                <Combobox
                  fields={pilihanGedung}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder='Pilih opsi gedung'
                  emptyText='Gedung tidak ditemukan'
                />
              )}
            />
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
              Asal Sekolah / Universitas
            </Label>
            <Input
              {...register("institution")}
              placeholder='Masukkan asal sekolah / universitas'
              className='my-2'
              required
            />
            {errors.institution && (
              <p className='text-sm text-red-500'>
                {errors.institution.message}
              </p>
            )}
          </div>

          <div>
            <Label>
              <FaUserTie className='w-4 h-4 inline' /> Pembimbing
            </Label>
            <Controller
              name='supervisor_id'
              control={control}
              render={({ field }) => (
                <Combobox
                  fields={supervisors}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder='Pilih pembimbing'
                  emptyText='Pembimbing tidak ditemukan'
                />
              )}
            />
            {errors.supervisor_id && (
              <p className='text-sm text-red-500'>
                {errors.supervisor_id.message}
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
          </div>

          <div>
            <Label>
              <span className='w-4 h-4'>
                <FaUserCheck className='w-4 h-4' />
              </span>
              Status
            </Label>
            <Controller
              name='status'
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className='my-2 w-full'>
                    <SelectValue placeholder='Status saat ini' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value='aktif'>aktif</SelectItem>
                      <SelectItem value='nonaktif'>nonaktif</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.status && (
              <p className='text-sm text-red-500'>{errors.status.message}</p>
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

export default InsertInternForm;
