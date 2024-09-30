/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dbwuumshu7s1w5jw.public.blob.vercel-storage.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
