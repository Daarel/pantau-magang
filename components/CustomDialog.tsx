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
import { DialogDescription } from "@radix-ui/react-dialog";

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
  onSubmit: (data: Record<string, string>) => void;
}

const CustomDialog: FC<CustomDialogProps> = ({
  open,
  title,
  fields,
  onOpenChange,
  onSubmit,
}) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    fields.forEach((field) => {
      data[field.name] = formData.get(field.name)?.toString() ?? "";
    });
    onSubmit(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="text-gray-500">Silahkan meng-input data supervisor</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
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
                className="my-4"
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
