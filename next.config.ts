import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    ...(process.env.ANALYZE === 'true' && {
        bundleAnalyzer: {
            enabled: true,
        },
    }),
    // Other optimizations
    swcMinify: true,
    images: {
        formats: ['image/avif', 'image/webp'],
    },
};

export default nextConfig;
