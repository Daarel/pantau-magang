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
 * Wrapper SignaturePad — langsung hilangkan placeholder saat mouse/jari ditekan.
 */
const SignaturePadWrapper = forwardRef<SignaturePadHandle, Props>(
  ({ penColor = "black", className, onBegin }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const padRef = useRef<SignaturePad | null>(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const resizeCanvas = () => {
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        const data = padRef.current?.toData(); // simpan coretan saat resize
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        const ctx = canvas.getContext("2d");
        ctx?.scale(ratio, ratio);
        if (data && padRef.current) padRef.current.fromData(data);
      };

      resizeCanvas();

      // ✍️ Inisialisasi SignaturePad
      const pad = new SignaturePad(canvas, { penColor });
      padRef.current = pad;

      // 🔥 Hubungkan event onBegin bawaan SignaturePad
      (pad as any).onBegin = () => {
        if (typeof onBegin === "function") onBegin();
      };

      // 🖱 Langsung trigger saat mouse/jari ditekan (agar placeholder hilang segera)
      const handleStart = () => {
        if (typeof onBegin === "function") onBegin();
      };

      canvas.addEventListener("mousedown", handleStart);
      canvas.addEventListener("touchstart", handleStart);

      window.addEventListener("resize", resizeCanvas);

      return () => {
        window.removeEventListener("resize", resizeCanvas);
        canvas.removeEventListener("mousedown", handleStart);
        canvas.removeEventListener("touchstart", handleStart);
        pad.off();
      };
    }, [penColor, onBegin]);

    useImperativeHandle(ref, () => ({
      clear: () => padRef.current?.clear(),
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
