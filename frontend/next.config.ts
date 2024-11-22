import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", 
        pathname: "/**/*.{png,jpg,jpeg,gif,webp,svg}", 
      },
      {
        protocol: "http",
        hostname: "**", 
        pathname: "/**/*.{png,jpg,jpeg,gif,webp,svg}",
      },
    ],
  },

};

export default nextConfig;