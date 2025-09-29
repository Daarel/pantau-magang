import { useEffect, type FC } from "react";

import { FaUser, FaIdCardAlt, FaBuilding } from "react-icons/fa";
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
  supervisorUpdateSchema,
  SupervisorUpdate,
} from "@/lib/validation/schema";
import { insertDataToLowerCase } from "@/lib/helper/dataInsert.helper";


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
  console.log(defaultData);

  const {
    register,
    handleSubmit,
    reset,
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
      });
    }
  }, [defaultData, reset]);

  const onSubmit = async (data: SupervisorUpdate) => {
    const payload = {
      ...insertDataToLowerCase(data),
      auth_id: defaultData.auth_id,
    };

    try {
      const res = await fetch('/api/supervisor', {
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
            Silahkan Edit data supervisor
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
              defaultValue={defaultData?.nomor_induk}
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
              defaultValue={defaultData?.email}
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
              defaultValue={defaultData?.full_name}
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
              defaultValue={defaultData?.department}
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

export default UpdateSupervisorForm;
