import type { NextConfig } from "next";

const isGithubActions =
  process.env.GITHUB_ACTIONS?.trim() === 'true' ||
  process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  ...(isGithubActions
    ? {
        output: 'export',
        basePath: '/sih26063-polar-repo',
        trailingSlash: true,
        images: {
          loader: 'custom',
          loaderFile: './src/lib/imageLoader.ts',
        },
      }
    : {
        images: {
          qualities: [75, 90, 95],
        },
      }),
};

export default nextConfig;
