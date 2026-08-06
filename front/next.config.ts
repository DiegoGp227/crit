import type { NextConfig } from "next";

const minioUrl = process.env.NEXT_PUBLIC_MINIO_URL ?? "http://localhost:9000";
const parsedMinioUrl = new URL(minioUrl);

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    dangerouslyAllowLocalIP: ["localhost", "127.0.0.1", "::1"].includes(
      parsedMinioUrl.hostname,
    ),
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: parsedMinioUrl.protocol.replace(":", "") as "http" | "https",
        hostname: parsedMinioUrl.hostname,
        port: parsedMinioUrl.port || "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "minio.critvirgilio.devdiego.work",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    const apiUrl = process.env.API_URL ?? "http://localhost:8000";
    return [
      {
        source: "/api/:path*",
        destination: `${apiUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
