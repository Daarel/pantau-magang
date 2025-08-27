import { useFormContext } from "react-hook-form";
import { RiArrowDropDownLine } from 'react-icons/ri';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";

export const StatusDropdown = () => {
  const { setValue, watch } = useFormContext();
  const status = watch("status");

  return (
    <FormItem className="flex flex-col">
      <FormLabel>Status</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={"outline"}
              className={cn(
                "w-full pl-3 text-left font-normal justify-between",
                !status && "text-muted-foreground"
              )}
            >
              {status || "Pilih status"}
              <RiArrowDropDownLine className="ml-2 h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-full p-2" align="end">
          <div className="flex flex-col space-y-2">
            <h4 className="text-sm">Pilih Status</h4>
            <div className="border-b my-1" />
            <Button
              variant="ghost"
              className="justify-start"
              onClick={() => setValue("status", "Hadir")}
            >
              Hadir
            </Button>
            <Button
              variant="ghost"
              className="justify-start"
              onClick={() => setValue("status", "Sakit")}
            >
              Sakit
            </Button>
            <Button
              variant="ghost"
              className="justify-start"
              onClick={() => setValue("status", "Izin")}
            >
              Izin
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  );
};