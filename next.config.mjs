import createNextIntlPlugin from 'next-intl/plugin';
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: "NetworkFirst",
      options: {
        cacheName: "offlineCache",
        expiration: {
          maxEntries: 200,
        },
      },
    },
  ],
  // Add these additional Workbox options
  workboxOptions: {
    cleanupOutdatedCaches: true,
    clientsClaim: true,
    exclude: [
      /middleware-manifest.json$/,
      /_next\/static\/.*\/_buildManifest.js$/,
      /_next\/static\/.*\/_ssgManifest.js$/,
    ],
  },
});

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // Add these experimental flags if using App Router
  experimental: {
    appDir: true,
    esmExternals: "loose",
  },
  // Ensure static files are properly handled
  images: {
    unoptimized: true, // Disable if you need image optimization
  },
};

export default withPWA(withNextIntl(nextConfig));