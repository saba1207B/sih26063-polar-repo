/*
Copyright (c) 2026 Sabareesh M (saba1207B). All Rights Reserved.

This source code is proprietary and confidential.

Unauthorized copying, redistribution, modification, or use — including
any use for artificial intelligence / machine learning training —
is strictly prohibited.

See the LICENSE and COPYRIGHT files in the repository root for full terms.
*/

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
