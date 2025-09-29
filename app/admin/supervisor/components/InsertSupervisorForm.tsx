import type { FC } from "react";

import { FaUser, FaIdCardAlt, FaBuilding } from "react-icons/fa";
import { PiPassword } from "react-icons/pi";
import { MdEmail } from "react-icons/md";

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
  supervisorInsertSchema,
  SupervisorInsert,
} from "@/lib/validation/schema";
import { insertDataToLowerCase } from "@/lib/helper/dataInsert.helper";

interface InsertSupervisorFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const InsertSupervisorForm: FC<InsertSupervisorFormProps> = ({
  open,
  onOpenChange,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SupervisorInsert>({
    resolver: zodResolver(supervisorInsertSchema),
  });

  const onSubmit = async (data: SupervisorInsert) => {
    const payload = {
      ...insertDataToLowerCase(data),
      role: "supervisor",
      institution: null,
      nomor_induk_supervisor: null,
      intern_start_date: null,
      intern_end_date: null,
    };

    try {
      const res = await fetch("/api/supervisor", {
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
          <DialogTitle>Tambah Supervisor</DialogTitle>
          <DialogDescription className='text-gray-500'>
            Silahkan input supervisor
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

          <DialogFooter>
            <Button type='submit'>Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InsertSupervisorForm;
