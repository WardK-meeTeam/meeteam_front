import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["meeteam-bucket.s3.ap-northeast-2.amazonaws.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api.meeteam.alom-sejong.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;
