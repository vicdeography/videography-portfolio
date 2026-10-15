import path from 'node:path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, { dir, config: { distDir } }) {
    // Let pages import video files so they are served with the site's bundled static files
    // (/_next/static/media), whichever part of the build first sees the import.
    const mediaDir = path.join(dir, distDir, 'static');
    config.module.rules.push({
      test: /\.mp4$/,
      type: 'asset/resource',
      generator: {
        filename: 'media/[name].[contenthash][ext]',
        publicPath: '/_next/static/',
        outputPath: path.relative(config.output.path, mediaDir) + '/',
      },
    });
    return config;
  },
};

export default nextConfig;
