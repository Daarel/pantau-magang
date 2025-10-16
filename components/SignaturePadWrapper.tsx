"use client";

import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import SignaturePad from "signature_pad";

export interface SignaturePadHandle {
  clear: () => void;
  isEmpty: () => boolean;
  toDataURL: (type?: string) => string;
}

interface Props {
  penColor?: string;
  className?: string;
  onBegin?: () => void;
}

/**
 * ✅ Wrapper SignaturePad — placeholder langsung hilang & bisa gambar di interaksi pertama.
 */
const SignaturePadWrapper = forwardRef<SignaturePadHandle, Props>(
  ({ penColor = "black", className, onBegin }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const padRef = useRef<SignaturePad | null>(null);
    const hasStartedRef = useRef(false);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const resizeCanvas = () => {
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        const data = padRef.current?.toData();
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        const ctx = canvas.getContext("2d");
        ctx?.scale(ratio, ratio);
        if (data && padRef.current) padRef.current.fromData(data);
      };

      resizeCanvas();

      const pad = new SignaturePad(canvas, { penColor });
      padRef.current = pad;

      const triggerBeginOnce = () => {
        // ⏱️ Hanya panggil sekali agar placeholder langsung hilang
        if (!hasStartedRef.current) {
          hasStartedRef.current = true;
          if (typeof onBegin === "function") onBegin();
        }
      };

      // 🖱️ Dengarkan hanya event awal dan biarkan SignaturePad meng-handle drawing
      const handleStart = (e: Event) => {
        triggerBeginOnce();
        // Jangan panggil metode internal (_strokeBegin/_strokeUpdate/_strokeEnd)
        // SignaturePad sudah mengikat listener-nya sendiri pada elemen canvas.
      };

      // Gunakan pointer events (lebih universal), tetap sertakan fallback untuk browser lama
      canvas.addEventListener("pointerdown", handleStart);
      canvas.addEventListener("mousedown", handleStart);
      canvas.addEventListener("touchstart", handleStart);

      window.addEventListener("resize", resizeCanvas);

      return () => {
        window.removeEventListener("resize", resizeCanvas);
        canvas.removeEventListener("pointerdown", handleStart);
        canvas.removeEventListener("mousedown", handleStart);
        canvas.removeEventListener("touchstart", handleStart);
        pad.off();
      };
    }, [penColor, onBegin]);

    useImperativeHandle(ref, () => ({
      clear: () => {
        hasStartedRef.current = false; // reset biar bisa trigger ulang
        padRef.current?.clear();
      },
      isEmpty: () => padRef.current?.isEmpty() ?? true,
      toDataURL: (type = "image/png") =>
        canvasRef.current?.toDataURL(type) ?? "",
    }));

    return (
      <canvas
        ref={canvasRef}
        className={`rounded-xl bg-white cursor-crosshair w-full h-full ${className || ""}`}
        style={{ touchAction: "none" }}
      />
    );
  }
);

SignaturePadWrapper.displayName = "SignaturePadWrapper";
export default SignaturePadWrapper;
