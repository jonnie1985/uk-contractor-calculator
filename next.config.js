/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
    allowMiddlewareResponseBody: true
  }
}

module.exports = nextConfig
