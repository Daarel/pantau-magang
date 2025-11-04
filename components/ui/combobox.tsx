"use client";
import { useState, type FC } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface Option {
  value: string;
  label: string;
}

interface ComboboxProps {
  fields: Option[];
  value?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
  placeholder: string;
  emptyText: string;
}

const Combobox: FC<ComboboxProps> = ({
  fields,
  value,
  onChange,
  placeholder,
  emptyText,
}) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (selectedValue: string) => {
    const newValue = selectedValue === value ? "" : selectedValue;
    onChange?.(newValue);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="my-2">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal text-gray-500 hover:text-gray-500"
        >
          {value
            ? fields.find((item) => item.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-full p-0"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <Command>
          <CommandInput placeholder={placeholder} className="h-9" />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {fields.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.label}
                  onSelect={() => handleSelect(item.value)}
                >
                  {item.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;
