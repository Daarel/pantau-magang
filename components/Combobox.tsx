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
import type { selectGedung } from "@/const";

interface ComboboxProps {
  fields: selectGedung[];
  value?: string; // biar bisa dikontrol dari luar
  onChange?: (value: string) => void; // event handler dari luar
}

const Combobox: FC<ComboboxProps> = ({ fields, value, onChange }) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === value ? "" : currentValue;
    onChange?.(newValue); // panggil handler dari luar
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
            ? fields.find((gedung) => gedung.value === value)?.label
            : "Pilih Gedung"}
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
          <CommandInput placeholder="Cari gedung..." className="h-9" />
          <CommandList>
            <CommandEmpty>No gedung found.</CommandEmpty>
            <CommandGroup>
              {fields.map((gedung) => (
                <CommandItem
                  key={gedung.value}
                  value={gedung.value}
                  onSelect={handleSelect}
                >
                  {gedung.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === gedung.value ? "opacity-100" : "opacity-0"
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
