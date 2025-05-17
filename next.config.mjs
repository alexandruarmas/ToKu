/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        has: [
          {
            type: 'header',
            key: 'x-redirected',
            value: 'true',
          },
        ],
        permanent: false,
        destination: '/sign-in',
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/',
          destination: '/sign-in',
          has: [
            {
              type: 'query',
              key: 'redirected',
              value: 'true',
            },
          ],
        },
      ],
    };
  },
};

export default nextConfig;
