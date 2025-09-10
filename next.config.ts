import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    ...(process.env.ANALYZE === 'true' && {
        bundleAnalyzer: {
            enabled: true,
        },
    }),
    swcMinify: true,
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'skillicons.dev',
                port: '',
                pathname: '/icons**',
            },
        ],
    },
};

export default nextConfig;