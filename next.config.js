const path = require('path')
const withSvgr = require('next-svgr')

const nextConfig = {
  i18n: {
    defaultLocale: 'ru',
    locales: ['en', 'ru'],
  },
  images: {
    remotePatterns: [
      {
        hostname: 'images.unsplash.com',
        protocol: 'https',
      },
    ],
  },
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack: config => {
    // config.resolve.alias['@2_pages'] = path.join(__dirname, '2_pages')

    return config
  },
}

module.exports = withSvgr(nextConfig)
