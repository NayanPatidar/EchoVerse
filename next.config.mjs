/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      {
        protocol: "https",
        hostname: "c.saavncdn.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "c.saavncdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "c.sop.saavncdn.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "c.sop.saavncdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.jiosaavn.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
