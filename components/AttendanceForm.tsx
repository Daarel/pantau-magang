"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { useState, useEffect, useRef } from "react"
import { useRouter } from 'next/navigation';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Toaster } from "@/components/ui/sonner"
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
import { supabase } from '@/lib/supabaseClient'
import { AttendanceCheckIn } from "../types/attendance"
import { InsertAttendanceIntern } from "@/hooks/useAttendance"
// Icons
import { RiArrowDropDownLine } from 'react-icons/ri';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { PhotoUpload } from "./PhotoUpload";
import { FileUpload } from "./FileUpload"
import { LocationButton } from "./FLocationButton"
import { getCurrentLocation, UserLocation } from "../lib/helper/geolocation.helpers"
import { uploadPhoto, uploadFile } from "../lib/helper/upload.helpers"
import { truncate } from "fs/promises"

const locationSchema = z.object({
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  address: z.string().optional(),
  approved: z.boolean().optional(),
});

// Schema validasi
const FormSchema = z.object({
  imageUrl: z.string().optional(),
  dob: z.date({
    message: "Tanggal harus diisi.",
  }),
  status: z.string({
    message: "Status harus diisi.",
  }),
  description: z.string().optional(),
  location: locationSchema.optional(),
}).superRefine((data, ctx) => {
  if ((data.status === "Izin" || data.status === "sakit") && (!data.description || data.description.trim() === "")) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["description"],
      message: "Keterangan wajib diisi untuk status Izin atau Sakit",
    });
  }
});

// Koordinat kantor
const OFFICE_COORDINATES = {
  // -6.240408297324362, 106.76737910412956
  latitude: -6.240408297324362,
  longitude: 106.76737910412956,
  radius: 0.0025 // Radius dalam derajat (sekitar 250 meter)
}

export function AttendanceForm() {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceCheckIn[]>([])
  const [locationStatus, setLocationStatus] = useState<'idle' | 'fetching' | 'success' | 'error' | 'approved'>('idle')
  const [userLocation, setUserLocation] = useState<UserLocation  | null>(null)
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)
  const [fileFile, setFileFile] = useState<File | null>(null)
  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const defaultValuesRef = useRef({
    status: "hadir",
    description: "",
    dob: new Date(),
    location: {},
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValuesRef.current
  })

  // Fungsi untuk mendapatkan lokasi user
  const handleGetLocation = () => {
    getCurrentLocation(
      OFFICE_COORDINATES,
      setUserLocation,
      setLocationStatus,
      (location) => form.setValue('location', location)
    )
  }

  useEffect(() => {
    console.log("Data kehadiran yang tersimpan:", attendanceRecords);
  }, [attendanceRecords]);

  const handlePhotoChange = (file: File | null) => {
    setPhotoFile(file);
    // setPhotoUrl(previewUrl);
  };

  const handleFileChange = (file: File | null) => {
    setFileFile(file);
    setFileUrl(fileUrl);
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);
    // const isApproved = data.location?.approved ?? false;

    try {
      const userDataString = localStorage.getItem('user');
      if (!userDataString) {
        toast.error('User data not found');
        return;
      }
      
      const userData = JSON.parse(userDataString);
      const user_id = userData.id;

      let imageUrl = "";
      let attachmentUrl = "";
      
      if ((data.status === "izin" || data.status === "sakit") && (!data.description || data.description.trim() === "")) {
        toast.error("Keterangan wajib diisi untuk status Izin atau Sakit");
        return;
      }
      
      // Upload foto jika status Hadir
      if (data.status === "hadir" && photoFile) {
        try {
          imageUrl = await uploadPhoto(photoFile);
        } catch (error) {
          toast.error("Gagal mengupload foto");
          return;
        }
      }
      
      // Upload file jika status Izin/Sakit
      if ((data.status === "izin" || data.status === "sakit") && fileFile) {
        try {
          attachmentUrl = await uploadFile(fileFile);
        } catch (error) {
          toast.error("Gagal mengupload file");
          return;
        }
      }

      // Tentukan file_url berdasarkan status
      let file_url = null;
      if (data.status === "hadir") {
        file_url = imageUrl;
      } else if (data.status === "izin" || data.status === "sakit") {
        file_url = attachmentUrl;
      }

      // Tentukan nilai untuk dispensation dan notes berdasarkan status
      let dispensationValue = null;
      let notesValue = "-";

      if (data.status === "sakit" || data.status === "izin") {
        dispensationValue = "pending";
        notesValue = data.description || "-";
      }

      const attendanceData: AttendanceCheckIn = {
        user_id: user_id,
        date: data.dob.toISOString().split('T')[0],
        status: data.status,
        check_in_time: data.status === 'hadir' ? new Date().toISOString() : null,
        file_url: file_url,
        notes: notesValue,
        dispensation: dispensationValue,
      }

      // Insert data ke tabel attendance
      await InsertAttendanceIntern(attendanceData);

      toast.success("Data kehadiran berhasil disimpan");
      console.log("Data baru yang akan disimpan:", attendanceData);

      // Reset form setelah submit
      form.reset({
        status: form.getValues("status"), 
        description: form.getValues("description"),
        dob: new Date(),
        location: undefined
      })
      setLocationStatus('idle')
      setUserLocation(null)
      setPhotoFile(null)
      setFileFile(null)

    } catch (error) {
      console.error('Error saving attendance:', error);
      toast.error('Gagal menyimpan data kehadiran');
    } finally {
      setIsSubmitting(false);
    }
  }

  // Dapatkan status lokasi untuk ditampilkan di UI
  const getLocationButtonText = () => {
    switch (locationStatus) {
      case 'idle': return "Tetapkan Lokasi"
      case 'fetching': return "Mendapatkan lokasi..."
      case 'success': return "Lokasi tidak disetujui"
      case 'error': return "Gagal mendapatkan lokasi"
      case 'approved': return "Lokasi disetujui"
      default: return "Tetapkan Lokasi"
    }
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Foto */}
        <div className="flex flex-col md:flex-row items-center justify-around gap-6 md:gap-7 lg:gap-15 border-2 p-6 rounded-md">
          <FormItem>
            {form.watch('status') === 'hadir' ? (
              <PhotoUpload onPhotoChange={handlePhotoChange} />
            ) : (
              <FileUpload onFileChange={handleFileChange} />
            )}
            <FormMessage />
          </FormItem>

          <div className="flex flex-col w-full md:w-1/2 space-y-6">
            {/* Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Status</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          type="button"
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value || "Pilih status"}
                          <RiArrowDropDownLine className="ml-2 h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-2" align="end">
                      <div className="flex flex-col space-y-2">
                        <h4 className="text-sm">Pilih Status</h4>
                        <div className="border-b my-1" />
                          <Button
                            type="button"
                            variant="ghost"
                            className="justify-start"
                            onClick={() => {
                              form.setValue("status", "hadir");
                              form.clearErrors("status");
                            }}
                          >
                            Hadir
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            className="justify-start"
                            onClick={() => {
                              form.setValue("status", "sakit");
                              form.clearErrors("status");
                            }}
                          >
                            Sakit
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            className="justify-start"
                            onClick={() => {
                              form.setValue("status", "izin");
                              form.clearErrors("status");
                            }}
                          >
                            Izin
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
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
                          type="button"
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "dd/MM/yyyy")
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

            {/* Tombol untuk menangkap lokasi - hanya ditampilkan jika status Hadir */}
            {form.watch('status') === 'hadir' && (
              <FormItem>
                <FormLabel>
                  Lokasi
                  <span className="text-[11px] text-gray-500 flex items-center gap-0.5">
                    <AiOutlineInfoCircle className="w-3 h-3" />
                    Pastikan Anda berada di area LEMIGAS
                  </span>
                </FormLabel>
                <LocationButton
                  onClick={handleGetLocation}
                  disabled={locationStatus === 'fetching'}
                  status={form.watch("status")}
                  locationStatus={locationStatus}
                  getLocationButtonText={getLocationButtonText}
                />
                <FormMessage />
              </FormItem>
            )}

            {/* Keterangan */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keterangan</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Tambahkan keterangan" 
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full active:bg-black/90 transition-colors duration-100 shadow"
              disabled={
                isSubmitting || 
                (form.watch("status") === "hadir" && (locationStatus !== "approved" && form.watch("imageUrl") == null)) ||
                ((form.watch("status") === "izin" || form.watch("status") === "sakit") &&
                  ((form.watch("description") ?? "").trim() === ""))
              }
            >
              {isSubmitting ? "Menyimpan..." : "Submit"}
            </Button>
          </div>
        </div>
      </form>
      <Toaster className="" />
    </Form>
  )
}