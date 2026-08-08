/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Images are served from /public so no remote host allow-list needed.
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
