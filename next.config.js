/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withLess = require('next-with-less');
const nextConfig = withLess({
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
  lessLoaderOptions: {},
  env: {
    ONLYLINK_API: process.env.ONLYLINK_API
  },
});

module.exports = nextConfig;
