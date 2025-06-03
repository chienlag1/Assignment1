import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'th.bing.com',
      'tiki.vn', // 👈 thêm dòng này
    ],
  },
};

export default nextConfig;
