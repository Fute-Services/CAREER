import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "futeservices.com",
        pathname: "/static/media/**",
      },
    ],
  },
};

export default nextConfig;
