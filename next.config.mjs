/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${
          process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3001/api/v1"
        }/:path*`,
      },
    ];
  },
};

export default nextConfig;
