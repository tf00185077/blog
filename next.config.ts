import type { NextConfig } from "next";
// import type webpack from 'webpack';
const nextConfig: NextConfig = {
  /* config options here */
  // webpack: (config: webpack.Configuration) => {

  //   return config;
  // },
  optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
};

export default nextConfig;
