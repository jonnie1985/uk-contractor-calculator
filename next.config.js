/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    loader: 'default',
    domains: [],
    unoptimized: true,
  },
  basePath: '',
  distDir: 'out'
}

module.exports = nextConfig
