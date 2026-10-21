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
      // Arm filter clean URL redirects
      {
        source: "/desktop-mounts/articulating-monitor-arm",
        has: [
          {
            type: "query",
            key: "arm",
            value: "(?<arm>single-arm|double-arm|triple-arm|quad-arm|five-arm|six-arm|workstation)",
          },
        ],
        destination: "/desktop-mounts/articulating-monitor-arm/:arm",
        permanent: true,
      },
      {
        source: "/desktop-mounts/ergonomic",
        has: [
          {
            type: "query",
            key: "arm",
            value: "(?<arm>single-arm|double-arm|triple-arm|quad-arm|five-arm|six-arm|workstation)",
          },
        ],
        destination: "/desktop-mounts/ergonomic/:arm",
        permanent: true,
      },
      {
        source: "/ar/desktop-mounts/articulating-monitor-arm",
        has: [
          {
            type: "query",
            key: "arm",
            value: "(?<arm>single-arm|double-arm|triple-arm|quad-arm|five-arm|six-arm|workstation)",
          },
        ],
        destination: "/ar/desktop-mounts/articulating-monitor-arm/:arm",
        permanent: true,
      },
      {
        source: "/ar/desktop-mounts/ergonomic",
        has: [
          {
            type: "query",
            key: "arm",
            value: "(?<arm>single-arm|double-arm|triple-arm|quad-arm|five-arm|six-arm|workstation)",
          },
        ],
        destination: "/ar/desktop-mounts/ergonomic/:arm",
        permanent: true,
      },
      // Arm filter alias redirects
      {
        source: "/desktop-mounts/articulating-monitor-arm",
        has: [{ type: "query", key: "arm", value: "single" }],
        destination: "/desktop-mounts/articulating-monitor-arm/single-arm",
        permanent: true,
      },
      {
        source: "/desktop-mounts/articulating-monitor-arm",
        has: [{ type: "query", key: "arm", value: "double" }],
        destination: "/desktop-mounts/articulating-monitor-arm/double-arm",
        permanent: true,
      },
      {
        source: "/desktop-mounts/articulating-monitor-arm",
        has: [{ type: "query", key: "arm", value: "triple" }],
        destination: "/desktop-mounts/articulating-monitor-arm/triple-arm",
        permanent: true,
      },
      {
        source: "/desktop-mounts/articulating-monitor-arm",
        has: [{ type: "query", key: "arm", value: "four" }],
        destination: "/desktop-mounts/articulating-monitor-arm/quad-arm",
        permanent: true,
      },
      {
        source: "/desktop-mounts/articulating-monitor-arm",
        has: [{ type: "query", key: "arm", value: "six" }],
        destination: "/desktop-mounts/articulating-monitor-arm/six-arm",
        permanent: true,
      },
      {
        source: "/desktop-mounts/ergonomic",
        has: [{ type: "query", key: "arm", value: "single" }],
        destination: "/desktop-mounts/ergonomic/single-arm",
        permanent: true,
      },
      {
        source: "/desktop-mounts/ergonomic",
        has: [{ type: "query", key: "arm", value: "double" }],
        destination: "/desktop-mounts/ergonomic/double-arm",
        permanent: true,
      },
      {
        source: "/desktop-mounts/ergonomic",
        has: [{ type: "query", key: "arm", value: "triple" }],
        destination: "/desktop-mounts/ergonomic/triple-arm",
        permanent: true,
      },
      {
        source: "/desktop-mounts/ergonomic",
        has: [{ type: "query", key: "arm", value: "four" }],
        destination: "/desktop-mounts/ergonomic/quad-arm",
        permanent: true,
      },
      {
        source: "/desktop-mounts/ergonomic",
        has: [{ type: "query", key: "arm", value: "six" }],
        destination: "/desktop-mounts/ergonomic/six-arm",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self' https: data: blob: 'unsafe-inline' 'unsafe-eval'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: blob: https: http:; font-src 'self' data: https:; connect-src 'self' https: http: ws: wss:; frame-src 'self' https:; object-src 'none'; base-uri 'self';",
          },
        ],
      },
    ];
  },
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
