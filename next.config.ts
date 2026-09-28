import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  ...(isGithubActions
    ? {
        output: 'export',
        basePath: '/sih26063-polar-repo',
        trailingSlash: true,
        images: {
          unoptimized: true,
        },
      }
    : {
        images: {
          qualities: [75, 90, 95],
        },
      }),
};

export default nextConfig;
