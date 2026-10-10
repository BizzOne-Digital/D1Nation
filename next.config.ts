import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
    localPatterns: [
      { pathname: "/api/uploads/**" },
      { pathname: "/images/**" },
    ],
  },
};

export default nextConfig;
