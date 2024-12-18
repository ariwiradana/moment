/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mhpt8pyiinkgvtyo.public.blob.vercel-storage.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "0i9ria69mw7glx7c.public.blob.vercel-storage.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "avatar.iran.liara.run",
        port: "",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/admin/login",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
