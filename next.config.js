const path = require('path')
const withSvgr = require('next-svgr')

const nextConfig = {
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
    config.resolve.alias['@components'] = path.join(__dirname, 'components')

    return config
  },
}

module.exports = withSvgr(nextConfig)
