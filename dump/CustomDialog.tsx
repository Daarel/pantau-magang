import type { FC, FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { IconType } from "react-icons";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  internSchema,
  InternInput,
  prepareForBackend,
} from "@/lib/validation/schema";
import { z } from 'zod'

interface FieldConfig {
  name: string;
  placeholder: string;
  label: string;
  type?: string;
  Icon: IconType;
  iconClassName?: string;
}

interface CustomDialogProps {
  fields: FieldConfig[];
  open: boolean;
  title: string;
  onOpenChange: (open: boolean) => void;
}

type InternFormValues = z.infer<typeof internSchema>;

const CustomDialog: FC<CustomDialogProps> = ({
  open,
  title,
  fields,
  onOpenChange,
}) => {
// const { register, handleSubmit, formState: { errors } } = useForm<InternFormValues>({
//   resolver: zodResolver(internSchema),
//   defaultValues: {
//     nomor_induk: "",
//     email: "",
//     full_name: "",
//     department: "",
//     institution: "",
//     supervisor_name: "",
//     intern_start_date: "", // string kosong
//     intern_end_date: "",   // string kosong
//   },
// });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[600px] max-h-[80vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className='text-gray-500'>
            Silahkan meng-input data supervisor
          </DialogDescription>
        </DialogHeader>
        <form>
          {fields.map((field) => (
            <div key={field.name}>
              <Label htmlFor={field.name} className='flex items-center gap-2'>
                {field.Icon && (
                  <span className='w-4 h-4'>
                    <field.Icon className='w-4 h-4' />
                  </span>
                )}
                {field.label}
              </Label>
              <Input
                id={field.name}
                name={field.name}
                type={field.type || "text"}
                placeholder={field.placeholder}
                className='my-4'
                required
              />
            </div>
          ))}

          <DialogFooter>
            <Button type='submit'>Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
