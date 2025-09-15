import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "PantauMagang | Manajemen Magang",
    template: "%s | PantauMagang",
  },
  description:
    "PantauMagang membantu mengelola absensi dan perizinan anak magang secara mudah dan profesional.",
  keywords: [
    "magang",
    "absensi magang",
    "perizinan magang",
    "dashboard magang",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <link rel="icon" href="/logoESDM.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/logoESDM.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
