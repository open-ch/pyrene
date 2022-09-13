module.exports = {
  stories: [
    '../**/*.stories.mdx',
    '../**/src/**/*.stories.mdx',
    '../**/src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-css-modules-preset',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  core: {
    builder: 'webpack5',
  },
  staticDirs: ['../stories/common/images/'],
  webpackFinal: async (config, { configType }) => {
    // modify storybook's file-loader rule to avoid conflicts with svgr
    const fileLoaderRule = config.module.rules.find((rule) => rule.test && rule.test.test('.svg'));
    fileLoaderRule.exclude = /\.svg$/i;

    config.module.rules.push(
      {
        test: /\.svg$/i,
        resourceQuery: { not: [/url/] },
        use: ['@svgr/webpack'],
      },
      {
        test: /\.svg$/i,
        type: 'asset',
        resourceQuery: /url/, // *.svg?url
      }
    );

    // Return the altered config
    return config;
  },
};
