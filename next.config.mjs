/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.escuelajs.co/api/v1/:path*'
      },
      {
        source: '/:path*',
        has: [
            {
                type: 'host',
                value: 'admin',
            },
        ],
        destination: '/admin/:path*',
    },
    ];
  },
  images: {
    remotePatterns: [
      {
        hostname: 'i.imgur.com'
      }
    ]
  }
};

export default nextConfig;
