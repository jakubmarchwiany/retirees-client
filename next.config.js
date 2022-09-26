/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    ENV: process.env.ENV,
    DEV_API_ENDPOINT: process.env.DEV_API_ENDPOINT,
    POST_IMAGE_PATH: process.env.POST_IMAGE_PATH,
  },
  distDir: "build",
};

module.exports = nextConfig;
