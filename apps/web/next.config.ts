import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },

  // Ensure proper trailing slash handling
  trailingSlash: false,
};

export default nextConfig;
