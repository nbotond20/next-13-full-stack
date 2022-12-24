/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  staticPageGenerationTimeout: 120,
}
module.exports = nextConfig
