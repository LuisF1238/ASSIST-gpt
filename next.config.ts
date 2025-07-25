import type { NextConfig } from 'next';

/**
 * Next.js configuration for the ASSIST-gpt application
 * Enables experimental features and configures image optimization
 */
const nextConfig: NextConfig = {
  experimental: {
    // Enable Partial Prerendering for improved performance
    ppr: true,
  },
  images: {
    // Allow images from external domains
    remotePatterns: [
      {
        hostname: 'avatar.vercel.sh', // Avatar service for user profile images
      },
    ],
  },
};

export default nextConfig;
