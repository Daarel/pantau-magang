"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { useState, useEffect } from "react"
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
import { AttendanceRecord } from "../components/types/attendance"
// Icons
import { RiArrowDropDownLine } from 'react-icons/ri';
import { BiMap } from 'react-icons/bi';
import { PhotoUpload } from "@/components/PhotoUpload";
import { StatusDropdown } from "./FStatusDropdown"
import { LocationButton } from "./FLocationButton"
import { getCurrentLocation, checkIfWithinRadius, OfficeCoordinates, UserLocation } from "../lib/helper/geolocation.helpers"
import { uploadPhoto } from "../lib/helper/photo.helpers"

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
})

// Koordinat kantor
const OFFICE_COORDINATES = {
  // -6.240408297324362, 106.76737910412956
  latitude: -6.240408297324362,
  longitude: 106.76737910412956,
  radius: 0.0025 // Radius dalam derajat (sekitar 250 meter)
}

export function AttendanceForm() {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([])
  const [locationStatus, setLocationStatus] = useState<'idle' | 'fetching' | 'success' | 'error' | 'approved'>('idle')
  const [userLocation, setUserLocation] = useState<UserLocation  | null>(null)
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      status: "Hadir", 
      description: "",
      dob: currentDate,
      location: {},
    },
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

  const handlePhotoChange = (file: File | null, previewUrl: string | null) => {
    setPhotoFile(file);
    setPhotoUrl(previewUrl);
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const isApproved = data.location?.approved ?? false;

    if (data.status === "Hadir" && (!data.location || !isApproved)) {
      toast.error("Harap setujui lokasi Anda terlebih dahulu untuk status Hadir")
      return
    }

    // let imageUrl = "https://example.com/path-to-user-image.jpg"; // Default
    let imageUrl = ""; // Default

    if (photoFile) {
      try {
        toast.loading("Mengupload foto...");
        imageUrl = await uploadPhoto(photoFile);
        toast.dismiss();
      } catch (error) {
        toast.error("Gagal mengupload foto");
        console.error("Upload error:", error);
      }
    }

    const newRecord: AttendanceRecord = {
      id: 2022071014,
      date: data.dob,
      status: data.status,
      latitude: userLocation?.latitude || 0,
      longitude: userLocation?.longitude || 0,
      location: userLocation?.address || "Lokasi tidak tersedia",
      address: userLocation?.address || "Lokasi tidak tersedia",
      // imageUrl: "https://example.com/path-to-user-image.jpg",
      imageUrl: imageUrl,
      description: data.description || "-",
    }

    console.log("Data baru yang akan disimpan:", newRecord);

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
                lokasi: newRecord.location,
                foto: newRecord.imageUrl ? "Tersedia" : "Tidak tersedia",
                foto2: newRecord.imageUrl,
              },
              null,
              2
            )}
          </code>
        </pre>
      ),
    })

    // Reset form setelah submit
    form.reset({
      status: "Hadir",
      description: "",
      dob: new Date(),
      location: undefined
    })
    setLocationStatus('idle')
    setUserLocation(null)
    setPhotoFile(null)
    setPhotoUrl(null)
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
            {/* <FormLabel>Foto</FormLabel> */}
            <PhotoUpload onPhotoChange={handlePhotoChange} />
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
                            variant="ghost"
                            className="justify-start"
                            onClick={() => {
                              form.setValue("status", "Hadir");
                              form.clearErrors("status");
                            }}
                          >
                            Hadir
                          </Button>
                          <Button
                            variant="ghost"
                            className="justify-start"
                            onClick={() => {
                              form.setValue("status", "Sakit");
                              form.clearErrors("status");
                            }}
                          >
                            Sakit
                          </Button>
                          <Button
                            variant="ghost"
                            className="justify-start"
                            onClick={() => {
                              form.setValue("status", "Izin");
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

            {/* Tombol untuk menangkap lokasi - hanya ditampilkan jika status Hadir */}
            <FormItem>
              <FormLabel>Lokasi</FormLabel>
              <LocationButton
                onClick={handleGetLocation}
                disabled={locationStatus === 'fetching'}
                status={form.watch("status")}
                locationStatus={locationStatus}
                getLocationButtonText={getLocationButtonText}
              />
              <FormMessage />
            </FormItem>

            {/* Keterangan */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keterangan</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Tambahkan keterangan (opsional)" 
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full"
              disabled={form.watch("status") === "Hadir" && locationStatus !== 'approved'}
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}