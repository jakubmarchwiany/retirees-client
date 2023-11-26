/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	distDir: "build",
	swcMinify: true,
	// env: {
	// 	NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT
	// },
	experimental: {
		instrumentationHook: true
	}
};

module.exports = nextConfig;
