"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AttendanceRecord } from "../components/types/Attendance"

import { RiArrowDropDownLine } from 'react-icons/ri';

// Schema validasi
const FormSchema = z.object({
  dob: z.date({
    required_error: "Tanggal harus diisi.",
  }),
  status: z.string({
    required_error: "Status harus diisi.",
  }),
})

export function AttendanceForm() {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      status: "Hadir", // Nilai default untuk status
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const newRecord: AttendanceRecord = {
      id: 2022071014,
      date: data.dob,
      status: data.status,
      imageUrl: "https://example.com/path-to-user-image.jpg",
      location: "Jakarta, Indonesia",
      description: "Keterangan tambahan jika diperlukan",
    }

    setAttendanceRecords(prev => [...prev, newRecord])

    toast("Data kehadiran berhasil disimpan", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">
            {JSON.stringify(
              {
                id: newRecord.id,
                tanggal: format(newRecord.date, "PPP"),
                status: newRecord.status,
                image: newRecord.imageUrl,
              },
              null,
              2
            )}
          </code>
        </pre>
      ),
    })

    // Reset form setelah submit
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <div className="flex items-center justify-between gap-2">
                <FormControl>
                  <Input 
                    placeholder="Isi Kehadiran" 
                    value={field.value}
                    onChange={field.onChange}
                    className="flex-1"
                  />
                </FormControl>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="h-9 w-9">
                      <RiArrowDropDownLine className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Pilih Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => form.setValue("status", "Hadir")}
                    >
                      Hadir
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => form.setValue("status", "Sakit")}
                    >
                      Sakit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => form.setValue("status", "Izin")}
                    >
                      Izin
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Tanggal */}
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Tanggal</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Tetapkan tanggal</span>
                      )}
                      <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  )
}