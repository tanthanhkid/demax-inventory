/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  transpilePackages: ['antd', '@ant-design/icons'],
}

module.exports = nextConfig
