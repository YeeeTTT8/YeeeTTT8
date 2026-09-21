/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  eslint: {
    // Lint is run explicitly in CI via `pnpm lint`; do not fail production builds on lint.
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
