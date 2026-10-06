import type { NextConfig } from "next";

const isLocal = process.env.NODE_ENV !== "production" || 
  Boolean(typeof process !== "undefined" && process.env.PWD && process.env.PWD.includes("ashik"));

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    const destination = isLocal
      ? "http://127.0.0.1:8000/media/catalogue.pdf"
      : "https://app.skilltechonline.com/media/catalogue.pdf";
    return [
      {
        source: "/catalogue",
        destination,
      },
      {
        source: "/catalogue.pdf",
        destination,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/tv-wall-mount/full-motion-double-arm-mount",
        destination: "/tv-wall-mount/full-motion-double-arm-mounts",
        permanent: true,
      },
      {
        source: "/blog/how-to-choose-the-right-tv-mount-for-y",
        destination: "/blog/how-to-choose-the-right-tv-mount-for-your-space",
        permanent: true,
      },
      {
        source: "/blog/top-5-av-solutions-for-modern-workspa",
        destination: "/blog/top-5-av-solutions-for-modern-workspaces",
        permanent: true,
      },
    ];
  },
  // async headers() {
  //   return [
  //     {
  //       source: "/:path*",
  //       headers: [
  //         {
  //           key: "Referrer-Policy",
  //           value: "strict-origin-when-cross-origin",
  //         },
  //       ],
  //     },
  //   ];
  // },
  images: {
    dangerouslyAllowLocalIP: isLocal,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/media/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'app.skilltechonline.com',
        pathname: '/media/**',
      },
    ],
  },
};

export default nextConfig;
