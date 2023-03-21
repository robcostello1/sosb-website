/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    //   loaders: [
    //     {
    //         test: /\.glsl$/,
    //         loader: 'webpack-glsl'
    //     }
    // ]

    config.module.rules.push({
      test: /\.(frag|vert|glsl)$/,
      use: [
        {
          loader: "glsl-shader-loader",
          options: {},
        },
      ],
    });
    // console.log(config.module.rules);

    return config;
  },
};

module.exports = nextConfig;
