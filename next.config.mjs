/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "components.lab.auth0.com" }],
        destination:
          "https://auth0.com/docs/get-started/universal-components/universal-components-overview",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
