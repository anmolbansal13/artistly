/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Remove any experimental features that might cause issues
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
}

export default nextConfig;