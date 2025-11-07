'use client'
import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { capitalize, formatDateToIndonesian } from "@/lib/utils"

interface CertificateProps {
  userName: string | null;
  supervisorName: string | null;
  start_date: string;
  end_date: string;
  department: string;
  requestInfo: boolean;
  templateUrl: string | null;
  signatureData: string;
}

export default function Certificate({ userName, supervisorName, start_date, end_date, department, requestInfo, templateUrl, signatureData }: CertificateProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const NamaPeserta = userName || 'Unnamed User'
  const NamaSupervisor = supervisorName || 'Unnamed User'
  const formattedStartDate = formatDateToIndonesian(start_date)
  const formattedEndDate = formatDateToIndonesian(end_date)
  
  useEffect(() => {
    const loadFont = async () => {
      const font = new FontFace('InriaSerif', 'url(/fonts/InriaSerif-Regular.ttf)');
      await font.load();
      document.fonts.add(font);
    };
    
    loadFont();
  }, []);

  const generateCertificate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Load template
    const template = new Image();
    template.crossOrigin = "anonymous";

    // template.src = "/sertif-dummy.png"; // path template sertifikat
    template.src = templateUrl || "/sertif-dummy.png" // path template sertifikat

    template.onload = () => {
      function wrapText(context, text, x, y, maxWidth, lineHeight) {
        const words = text.split(" ");
        let line = "";
        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + " ";
          const metrics = context.measureText(testLine);
          const testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + " ";
            y += lineHeight;
          } else {
            line = testLine;
          }
        }
        context.fillText(line, x, y);
      }

      // Gambar template ke canvas
      ctx.drawImage(template, 0, 0, canvas.width, canvas.height);

      // Nama peserta
      ctx.font = "700 40px InriaSerif"; // [weight: 100-900] [size: px, rem, pt, em] [font-family]
      ctx.fillStyle = "#000";
      ctx.textAlign = "center";
      ctx.fillText(NamaPeserta.toUpperCase(), canvas.width / 2, canvas.height / 2);

      // Paragraf di bawah nama peserta
      ctx.font = "400 18px InriaSerif";
      ctx.fillStyle = "#333";
      ctx.textAlign = "center";
      const paragraph = `ATAS PARTISIPASINYA DAN KONTRIBUSI AKTIF SELAMA PROGRAM MAGANG YANG DISELENGGARAKAN PADA ${formattedStartDate} HINGGA ${formattedEndDate} DI GEDUNG ${department}.`;
      const maxWidth = 650; // lebar max. are teks
      const lineHeight = 25;  // jaran antar baris
      const x = canvas.width / 2; // posisi tengah
      const startY = canvas.height / 2 + 70;  // posisi mulai teks
      wrapText(ctx, paragraph.toUpperCase(), x, startY, maxWidth, lineHeight);

      // Nama supervisor
      ctx.font = "700 20px InriaSerif"; // [weight: 100-900] [size: px, rem, pt, em] [font-family]
      ctx.fillStyle = "#333";
      ctx.textAlign = "center";
      const supNameX = (canvas.width / 2) + 10;
      const supNameY = startY + 175;
      ctx.fillText(NamaSupervisor.toUpperCase(), supNameX, supNameY);

      if (signatureData) {
        const signatureImg = new Image();
        signatureImg.crossOrigin = "anonymous";
        signatureImg.src = signatureData;

        signatureImg.onload = () => {
          const signatureWidth = 200;
          const signatureHeight = 100;
          const signatureX = (canvas.width - signatureWidth) / 2;
          const signatureY = startY + 55;
          ctx.drawImage(signatureImg, signatureX, signatureY, signatureWidth, signatureHeight);

          // Convert ke PNG untuk download
          const link = document.createElement("a");
          link.download = `Certificate-${capitalize(NamaPeserta)}.png`;
          link.href = canvas.toDataURL("image/png");
          link.click();
        };

        signatureImg.onerror = () => {
          console.warn("Gagal load tanda tangan dari URL:", signatureData);
          const link = document.createElement("a");
          link.download = `Certificate-${capitalize(NamaPeserta)}.png`;
          link.href = canvas.toDataURL("image/png");
          link.click();
        };
      } else {
        // Tanpa tanda tangan, langsung download
        const link = document.createElement("a");
        link.download = `Certificate-${capitalize(NamaPeserta)}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      }
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
        disabled={!requestInfo}
        className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md cursor-pointer"
      >
        Klaim Sertifikat
      </Button>
    </div>
  );
}
