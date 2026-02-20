import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "tagsa.aumenta.do",
      },
      {
        protocol: "https",
        hostname: "tagsa.aumenta.do",
      },
    ],
  },
};

export default nextConfig;
