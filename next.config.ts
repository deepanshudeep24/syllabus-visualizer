import type { NextConfig } from 'next';

// This visualizer has no server-side data or API routes, so a static export
// keeps hosting simple and makes it ideal for Cloudflare Pages.
const nextConfig: NextConfig = {
  output: 'export',
};

export default nextConfig;
