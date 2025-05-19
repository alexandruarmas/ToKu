/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Static HTML Export for Netlify
  trailingSlash: true, // Add trailing slashes for better compatibility
  images: {
    unoptimized: true, // Required for static export
  },
  // Ensure environment variables are properly passed
  env: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
  },
  // Disable source maps in production for better performance
  productionBrowserSourceMaps: false,
};

export default nextConfig;
