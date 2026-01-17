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

  // Environment variables are automatically available when prefixed with NEXT_PUBLIC_
  // No need to explicitly define them here
};

export default nextConfig;
