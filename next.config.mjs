/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // The Speaking page became Podcast & talks; keep old links and search results working.
      { source: '/speaking', destination: '/conversations', permanent: true },
    ];
  },
};

export default nextConfig;
