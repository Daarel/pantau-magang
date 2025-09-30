import { useEffect, type FC } from "react";

import {
  FaUser,
  FaUserTie,
  FaIdCardAlt,
  FaBuilding,
  FaCalendarAlt,
} from "react-icons/fa";
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
import { internUpdateSchema, InternUpdate } from "@/lib/validation/schema";
import { insertDataToLowerCase } from "@/lib/helper/dataInsert.helper";

interface UpdateInternFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultData: any;
}

const UpdateInternForm: FC<UpdateInternFormProps> = ({
  open,
  onOpenChange,
  defaultData,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InternUpdate>({
    resolver: zodResolver(internUpdateSchema),
  });

  useEffect(() => {
    if (defaultData) {
      reset({
        nomor_induk: defaultData.nomor_induk || "",
        email: defaultData.email || "",
        full_name: defaultData.full_name || "",
        department: defaultData.department || "",
        institution: defaultData.institution || "",
        nomor_induk_supervisor: String(defaultData.supervisor?.nomor_induk) || "",
        intern_start_date: defaultData.intern_start_date ?? "",
        intern_end_date: defaultData.intern_end_date ?? "",
      });
    } else {
      reset();
    }
  }, [defaultData, reset]);

  const onSubmit = async (data: InternUpdate) => {
    const payload = {
      ...insertDataToLowerCase(data),
      auth_id: defaultData.auth_id,
    };

    try {
      const res = await fetch("/api/intern", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        console.error("Error: ", result.error);
        alert(`Gagal update user`);
        return;
      }

      console.log("User berhasil di-update:", result.data);
      alert("User berhasil di-update!");
      onOpenChange(false);
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan jaringan");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[600px] max-h-[80vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Edit Supervisor</DialogTitle>
          <DialogDescription className='text-gray-500'>
            Silahkan edit data supervisor
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

          <DialogFooter>
            <Button type='submit'>Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateInternForm;
