/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  images: {
    unoptimized: true
  },
  reactStrictMode: true
}

module.exports = nextConfig
