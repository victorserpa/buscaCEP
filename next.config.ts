import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_VIA_CEP_URl: process.env.NEXT_PUBLIC_VIA_CEP_URl,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
