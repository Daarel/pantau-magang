import { useEffect, type FC } from "react";

import { FaUser, FaIdCardAlt, FaBuilding, FaUserCheck } from "react-icons/fa";
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

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  supervisorUpdateSchema,
  SupervisorUpdate,
} from "@/lib/validation/schema";
import { insertDataToLowerCase } from "@/lib/helper/dataInsert.helper";
import Combobox from "@/components/ui/combobox";
import { pilihanGedung } from "@/const";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface UpdateSupervisorFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultData: any;
}

const UpdateSupervisorForm: FC<UpdateSupervisorFormProps> = ({
  open,
  onOpenChange,
  defaultData,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<SupervisorUpdate>({
    resolver: zodResolver(supervisorUpdateSchema),
  });

  useEffect(() => {
    if (defaultData) {
      reset({
        nomor_induk: defaultData.nomor_induk || "",
        email: defaultData.email || "",
        full_name: defaultData.full_name || "",
        department: defaultData.department || "",
        status: defaultData.status || "",
      });
    } else {
      reset();
    }
  }, [defaultData, reset]);

  const onSubmit = async (data: SupervisorUpdate) => {
    const payload = {
      ...insertDataToLowerCase(data),
      auth_id: defaultData.auth_id,
    };

    try {
      const res = await fetch("/api/supervisor", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        console.error("Error: ", result.error);
        toast.error("Gagal update supervisor");
        return;
      }

      toast.success("Berhasil update data supervisor");
      onOpenChange(false);
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan jaringan");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[600px] max-h-[80vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Edit Anak Magang</DialogTitle>
          <DialogDescription className='text-gray-500'>
            Silahkan edit data anak magang
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
                      <SelectItem value='aktif'>Aktif</SelectItem>
                      <SelectItem value='nonaktif'>Nonaktif</SelectItem>
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

export default UpdateSupervisorForm;
