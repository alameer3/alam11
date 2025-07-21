/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
  },
  allowedDevOrigins: [
    'a501ac9f-2461-4725-a31a-06f835d210ff-00-x77hhfvlncp2.spock.replit.dev',
    '5cc4d22a-55ad-4d5d-b507-80b8f577d9f9-00-2m36py6tdhyek.picard.replit.dev',
    '0a1c379f-a054-46cb-b26c-f3bcffddc7e8-00-7cknkf4kcwxr.riker.replit.dev',
    '127.0.0.1',
    'localhost'
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com'
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos'
      },
      {
        protocol: 'https',
        hostname: 'akw.to'
      },
      {
        protocol: 'http',
        hostname: 'localhost'
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me'
      }
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  webpack: (config, { dev, isServer }) => {
    // تحسين حجم الباندل
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      }
    }
    return config
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/api/placeholder/:width/:height',
        destination: 'https://via.placeholder.com/:widthx:height/26baee/ffffff?text=AKWAM',
      },
    ]
  },
}

module.exports = nextConfig