/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'hiringcraft.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'themancode.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'cafebite.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'uppcr.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'www.google.com',
      },
      {
        protocol: 'http',
        hostname: 'farman-pharma.ct.ws',
      },
      {
        protocol: 'https',
        hostname: 'content.jdmagicbox.com',
      },
      {
        protocol: 'https',
        hostname: 'www.idfcfirstbank.com',
      },
      {
        protocol: 'https',
        hostname: 'foodlio.vercel.app',
      },
    ],
  },
};

export default nextConfig;
