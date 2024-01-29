/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "download.logo.wine",
      },
    ],
  },
};

export default nextConfig;
