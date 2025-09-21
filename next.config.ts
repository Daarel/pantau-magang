import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vcdrhmuhbhpfecdognpq.supabase.co",
        port: "",
        pathname: "/**",
      },
    ],
    // domains: [
    //   "vcdrhmuhbhpfecdognpq.supabase.co", // 🔹 ganti sesuai project Supabase kamu
    // ],
  },
};

export default nextConfig;
