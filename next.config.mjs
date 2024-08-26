/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/waze",
        destination:
          "https://www.waze.com/live-map/directions/kl-gateway-mall-jalan-kerinchi-2-kuala-lumpur?to=place.w.66650143.666239287.11721931",
        permanent: true,
      },
      {
        source: "/maps",
        destination: "https://maps.app.goo.gl/yLErFsw4HN8Pq7NS9",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
