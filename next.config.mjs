// @ts-check

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: false,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**/*.googleusercontent.com",
      },
    ],
  },
  webpack: (config) => {
    config.optimization.runtimeChunk = "single";
    return config;
  },
};
export default config;
