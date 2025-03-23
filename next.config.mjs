/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "c.saavncdn.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "c.saavncdn.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "c.sop.saavncdn.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "c.sop.saavncdn.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.jiosaavn.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
