/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Static HTML Export for Netlify
  trailingSlash: true, // Add trailing slashes for better compatibility
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;
