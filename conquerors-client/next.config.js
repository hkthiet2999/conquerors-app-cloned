/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: false,
  env: {
    API_URL: 'http://localhost:5000/api',
  }
}

module.exports = nextConfig
