/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: "export",
  basePath: "/drsdata",
  assetPrefix: "/drsdata",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;