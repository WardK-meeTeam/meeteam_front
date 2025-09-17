import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["meeteam-bucket.s3.ap-northeast-2.amazonaws.com"],
  },
};

export default nextConfig;
