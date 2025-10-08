"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function StartAttendanceButton() {
  const [open, setOpen] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasSchedule, setHasSchedule] = useState(false);
  const supabase = createClient();

  // ambil data jadwal yang sudah ada
  useEffect(() => {
    const fetchSchedule = async () => {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData?.user) return;

      const { data: userProfile } = await supabase
        .from("users")
        .select("id")
        .eq("auth_id", userData.user.id)
        .single();

      if (!userProfile) return;

      const { data: existingSchedule } = await supabase
        .from("attendance_schedules")
        .select("start_time, end_time")
        .eq("supervisor_id", userProfile.id)
        .maybeSingle();

      if (existingSchedule) {
        setHasSchedule(true);
        setStartTime(existingSchedule.start_time);
        setEndTime(existingSchedule.end_time);
      } else {
        setHasSchedule(false);
      }
    };

    fetchSchedule();
  }, [supabase]);

  const handleSubmit = async () => {
    if (!startTime || !endTime) {
      toast.warning("Isi dulu jam mulai dan jam berakhir ya!");
      return;
    }

    try {
      setLoading(true);

      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData?.user) {
        toast.error("User belum login atau sesi berakhir");
        return;
      }

      const { data: userProfile } = await supabase
        .from("users")
        .select("id")
        .eq("auth_id", userData.user.id)
        .single();

      if (!userProfile) {
        toast.error("Supervisor tidak ditemukan");
        return;
      }

      if (hasSchedule) {
        // update data lama
        const { error: updateError } = await supabase
          .from("attendance_schedules")
          .update({
            start_time: startTime,
            end_time: endTime,
          })
          .eq("supervisor_id", userProfile.id);

        if (updateError) throw updateError;

        toast.success("Jadwal absen berhasil diperbarui!");
      } else {
        // insert data baru
        const { error: insertError } = await supabase
          .from("attendance_schedules")
          .insert([
            {
              supervisor_id: userProfile.id,
              start_time: startTime,
              end_time: endTime,
            },
          ]);

        if (insertError) throw insertError;

        toast.success("Jadwal absen berhasil ditambahkan!");
        setHasSchedule(true);
      }

      setOpen(false);
    } catch (error: any) {
      toast.error("Terjadi kesalahan: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    try {
      setLoading(true);

      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData?.user) {
        toast.error("User belum login atau sesi berakhir");
        return;
      }

      const { data: userProfile } = await supabase
        .from("users")
        .select("id")
        .eq("auth_id", userData.user.id)
        .single();

      if (!userProfile) {
        toast.error("Supervisor tidak ditemukan");
        return;
      }

      const { error: deleteError } = await supabase
        .from("attendance_schedules")
        .delete()
        .eq("supervisor_id", userProfile.id);

      if (deleteError) throw deleteError;

      toast.success("Jadwal absen berhasil direset!");
      setHasSchedule(false);
      setStartTime("");
      setEndTime("");
    } catch (error: any) {
      toast.error("Gagal mereset jadwal: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className={`${
          hasSchedule
            ? "bg-yellow-500 hover:bg-yellow-600"
            : "bg-blue-600 hover:bg-blue-700"
        } text-white font-semibold rounded-lg shadow-md transition-all px-5 py-2`}
      >
        {hasSchedule ? "Edit Jadwal" : "Mulai Absen"}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {hasSchedule ? "Edit Jadwal Absen" : "Atur Waktu Absen"}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-2">
            <div className="flex flex-col">
              <Label htmlFor="startTime">Jam Mulai</Label>
              <Input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="endTime">Jam Berakhir</Label>
              <Input
                id="endTime"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter className="flex justify-between gap-2">
            {hasSchedule && (
              <Button
                variant="destructive"
                onClick={handleReset}
                disabled={loading}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Reset Jadwal
              </Button>
            )}
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading
                ? "Menyimpan..."
                : hasSchedule
                ? "Perbarui Jadwal"
                : "Simpan Jadwal"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
