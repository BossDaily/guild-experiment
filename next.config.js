/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "cdn.discordapp.com",
      "discord.com",
      "avatars.githubusercontent.com",
      "media.discordapp.net",
    ],
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
