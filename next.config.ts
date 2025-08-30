// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		unoptimized: true,
	},
	eslint: {
		// ❌ няма да спира билда заради ESLint грешки
		ignoreDuringBuilds: true,
	},
};

module.exports = nextConfig;
