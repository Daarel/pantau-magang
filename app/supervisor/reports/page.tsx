'use client'

import LayoutWrapper from '@/components/layout/LayoutWrapper'
import { Card, CardContent } from '@/components/Card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Calendar28 } from '@/components/ui/date-picker'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FiUpload } from "react-icons/fi";
import { BiSolidXCircle } from "react-icons/bi";
import { useState } from 'react'

// Import notif components
import Loader from '@/components/ui/loader'
import Success from '@/components/ui/success'
import Error from '@/components/ui/error'

export default function SupervisorReports() {
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const handleConfirm = () => {
    // Validasi input wajib
    if (!file || !status) {
      setError(true)
      setTimeout(() => setError(false), 3000)
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }, 2000)
  }

  return (
    <LayoutWrapper>
      {/* Loader di tengah layar */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50">
          <Loader />
        </div>
      )}

      {/* Success/Error agak turun di atas */}
      <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50">
        {success && <Success />}
        {error && <Error />}
      </div>

      <h1 className="text-xl font-semibold mb-4">Pengajuan Laporan</h1>

      <Card className="p-4 bg-[#F8F6F6]">
        <CardContent className="grid md:grid-cols-2 gap-6">
          {/* Upload File */}
          <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-md p-6 bg-gray-50 w-full">
            {!file ? (
              <label
                htmlFor="fileUpload"
                className="flex flex-col items-center cursor-pointer"
              >
                <FiUpload className="h-8 w-8 text-gray-500 mb-2" />
                <span className="text-blue-600">Add File</span>
                <input
                  id="fileUpload"
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const selectedFile = e.target.files?.[0] || null
                    if (selectedFile) {
                      if (selectedFile.size > 5 * 1024 * 1024) { // cek ukuran > 5MB
                        setError(true)
                        setTimeout(() => setError(false), 3000)
                        e.target.value = "" // reset input
                        setFile(null)
                        return
                      }
                      setFile(selectedFile)
                    }
                  }}
                />
              </label>
            ) : (
              <div className="flex items-center justify-between w-full px-4 py-2 bg-white rounded-md shadow">
                <div className="flex flex-col text-sm">
                  <span className="font-medium text-gray-700">{file.name}</span>
                  <span className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
                <button
                  onClick={() => setFile(null)}
                  className="ml-3 text-red-500 hover:text-red-700"
                >
                  <BiSolidXCircle className="h-5 w-5 cursor-pointer" />
                </button>
              </div>
            )}
            <p className="text-xs text-gray-500 mt-2">
              ⓘ Ukuran File Maksimal 5 MB
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Status */}
            <div>
              <Label>Status <span className="text-red-500">*</span></Label>
              <Select onValueChange={(val) => setStatus(val)}>
                <SelectTrigger className="w-full bg-gray-50 mt-2">
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sakit">Sakit</SelectItem>
                  <SelectItem value="izin">Izin</SelectItem>
                  <SelectItem value="alfa">Alfa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tanggal */}
            <div>
              <div className="relative">
                  <Calendar28 />
              </div>
            </div>

            {/* Keterangan */}
            <div>
              <Label>Keterangan</Label>
              <Textarea placeholder="Tuliskan keterangan di sini..." className='bg-gray-50 mt-2'/>
            </div>
          </div>
        </CardContent>

        {/* Button Konfirmasi */}
        <div className="flex justify-center mt-4">
          <Button
            onClick={handleConfirm}
            className="w-1/3 bg-green-500 hover:bg-green-600 text-white rounded-full"
          >
            Konfirmasi
          </Button>
        </div>
      </Card>
    </LayoutWrapper>
  )
}
