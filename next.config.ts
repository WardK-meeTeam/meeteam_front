// next.config.ts
import type { NextConfig } from "next";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL; // https://api.meeteam.alom-sejong.com

const nextConfig: NextConfig = {
  images: {
    domains: ["meeteam-bucket.s3.ap-northeast-2.amazonaws.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/main/:path*",
        destination: `${API_BASE}/api/main/:path*`,
      },
    ];
  },
};

export default nextConfig;
