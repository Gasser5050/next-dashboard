import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: ["192.168.100.22"],
  logging: {
    fetches: {
      fullUrl: true // Logs exact URLs like https://jsonplaceholder.cypress.io/users
    }
  }
};

export default nextConfig;
