/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: "https://api.escuelajs.co/api/v1/:path*",
      },
    ];
  },
};

export default nextConfig;
