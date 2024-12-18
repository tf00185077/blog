import type { NextConfig } from "next";
import type webpack from 'webpack';
const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config: webpack.Configuration) => {
    config.watchOptions = {
      // poll: 1000, // 每秒檢查文件變化
      // aggregateTimeout: 300, // 文件變化後延遲 300ms 重建
    };
    return config;
  },
};

export default nextConfig;
