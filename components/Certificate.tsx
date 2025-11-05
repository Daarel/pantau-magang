'use client'
import { useRef } from "react";
import { Button } from "@/components/ui/button";

interface CertificateProps {
  userName: string;
}

export default function Certificate({ userName }: CertificateProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const generateCertificate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Load template
    const template = new Image();
    template.src = "/sertif-dummy.png"; // path template sertifikat

    template.onload = () => {
      // Gambar template ke canvas
      ctx.drawImage(template, 0, 0, canvas.width, canvas.height);

      // Tambahkan nama peserta (posisi bisa disesuaikan)
      ctx.font = "bold 40px Arial";
      ctx.fillStyle = "#000";
      ctx.textAlign = "center";
      ctx.fillText(userName, canvas.width / 2, canvas.height / 2);

      // Convert ke PNG untuk download
      const link = document.createElement("a");
    //   link.download = `sertifikat-${userName}.png`;
      link.download = `sertifikat.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
  };

  return (
    <div className="pt-4">
      {/* Canvas untuk sertifikat */}
      <canvas
        ref={canvasRef}
        width={1200}
        height={800}
        style={{ display: "none" }}
      />

      {/* Tombol klaim sertifikat */}
      <Button
        onClick={generateCertificate}
        className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md cursor-pointer"
      >
        Klaim Sertifikat
      </Button>
    </div>
  );
}
