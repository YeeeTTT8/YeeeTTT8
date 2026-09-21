/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        // Generated imagery CDN (see lib/images.ts). TODO(client): self-host
        // these under /public and remove this pattern for a permanent site.
        protocol: 'https',
        hostname: 'd8j0ntlcm91z4.cloudfront.net',
      },
    ],
  },
  eslint: {
    // Lint is run explicitly in CI via `pnpm lint`; do not fail production builds on lint.
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
