/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['image.tmdb.org', 'lh3.googleusercontent.com', 'flowbite.com'],
  },
}
module.exports = nextConfig
