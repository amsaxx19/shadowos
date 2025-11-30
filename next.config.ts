import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, // Reduces double-rendering in dev (saves RAM/CPU)
  poweredByHeader: false,
  onDemandEntries: {
    // Keep pages in memory for shorter time
    maxInactiveAge: 15 * 1000,
    // Keep fewer pages in buffer
    pagesBufferLength: 2,
  },
  experimental: {
    // Optimize package imports
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons', 'recharts'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
