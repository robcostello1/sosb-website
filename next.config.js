/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(frag|vert|glsl)$/,
      use: [
        {
          loader: "glsl-shader-loader",
          options: {},
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
