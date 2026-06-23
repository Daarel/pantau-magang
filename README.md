<div align="center">

# 🎓 Pantau Magang

**Sistem Monitoring Magang Modern & Terintegrasi**

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](#)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](#)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](#)
[![Radix UI](https://img.shields.io/badge/Radix%20UI-161618?style=for-the-badge&logo=radix-ui&logoColor=white)](#)

*Pantau dan kelola aktivitas magang dengan mudah. Dari presensi otomatis hingga pelaporan progres harian.*

</div>

---

## 📖 Tentang Projek
**Pantau Magang** adalah aplikasi berbasis web yang dirancang untuk mempermudah instansi dalam melakukan pemantauan, presensi, dan pelaporan peserta magang.

Projek ini dilengkapi dengan fitur presensi yang meliputi pengambilan foto wajah, tanda tangan digital, dan pemindaian QR Code untuk memastikan validitas kehadiran peserta magang.

---

## 🔗 Referensi & Tautan Penting

* **Web User:** [Pantau Magang App](https://pantau-magang.vercel.app/)

## ✨ Fitur Utama

### 📸 Presensi Aman & Valid
Sistem presensi yang terintegrasi dengan validasi multi-layer:
* **Webcam Capture:** Pengambilan foto *real-time* saat presensi.
* **Tanda Tangan Digital:** Kolom tanda tangan langsung di aplikasi.
* **QR Code Scanner:** Presensi cepat dengan memindai kode QR unik.

### 📊 Dashboard Interaktif
* **Visualisasi Data:** Pantau statistik kehadiran dan progres menggunakan grafik interaktif yang informatif.
* **Tabel Data:** Manajemen data peserta magang yang dilengkapi dengan fitur *sorting*, *filtering*, dan *pagination*.
* **Import/Export Data:** Mendukung format file CSV untuk mempermudah pengelolaan data.

### 🔐 Autentikasi & Keamanan (Supabase)
Sistem login dan manajemen *role* (akses pengguna) yang didukung dengan Supabase.

### 🎨 Modern UI/UX
Tampilan antarmuka yang responsif, bersih, dan modern. Menggabungkan animasi halus dan komponen siap pakai untuk memudahkan supervisor me-manage anak magang.

---

## 🛠️ Tech Stack & Arsitektur

### Frontend (Client-Side)
Dibangun menggunakan *framework* React mutakhir dengan dukungan *Server-Side Rendering* (SSR):
* **Core:** Next.js (App Router) & React
* **Styling & UI:** Tailwind CSS, Radix UI Primitives, Lucide React
* **Animation:** Framer Motion
* **Forms & Validation:** React Hook Form & Zod
* **Data Visualisasi & Tabel:** Chart.js, TanStack Table
* **Fitur Pendukung Tambahan:** React Webcam, React Signature Canvas, QRCode, PapaParse

### Backend & Database (BaaS)
Menggunakan arsitektur tanpa *server backend* khusus, mengandalkan Supabase sebagai penyedia utama:
* **Database & Auth:** Supabase (PostgreSQL, Authentication)
* **Real-time:** Supabase Realtime Subscriptions
* **Storage:** Supabase Storage (untuk foto presensi & tanda tangan)

---

## 🚀 Cara Menjalankan Projek (Local Development)

### 1. Prasyarat
Pastikan Anda telah menginstal:
* Node.js
* Git

### 2. Instalasi & Konfigurasi Lingkungan

1. **Setup Environment Variables (.env)**
   Anda perlu membuat dan mengisi file `.env.local` di *root* folder. Anda dapat menggunakan file `.env.example` (jika tersedia) sebagai referensi. Nilai yang umum dibutuhkan adalah *keys* dari Supabase.
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
