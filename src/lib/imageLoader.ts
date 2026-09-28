'use client';

export default function imageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width?: number;
  quality?: number;
}) {
  if (
    src.startsWith('http://') ||
    src.startsWith('https://') ||
    src.startsWith('data:') ||
    src.startsWith('blob:')
  ) {
    return src;
  }

  // Prepend basePath for GitHub Pages subpath deployment
  const basePath =
    process.env.NEXT_PUBLIC_BASE_PATH !== undefined
      ? process.env.NEXT_PUBLIC_BASE_PATH
      : process.env.NODE_ENV === 'production'
      ? '/sih26063-polar-repo'
      : '';

  const cleanSrc = src.startsWith('/') ? src : `/${src}`;

  // If already prefixed, don't double prefix
  if (basePath && cleanSrc.startsWith(basePath)) {
    return cleanSrc;
  }

  return `${basePath}${cleanSrc}`;
}
