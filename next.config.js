/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      enabled: false, // Force Webpack for dev
    },
  },
};

export default nextConfig;
