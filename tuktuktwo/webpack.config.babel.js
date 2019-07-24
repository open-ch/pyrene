/* eslint-disable no-console */
import webpack from 'webpack'; // eslint-disable-line no-unused-vars
import path from 'path';

import CleanWebpackPlugin from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';

const OUTPUT_PATH = path.resolve(__dirname, 'dist');

const production = process.env.NODE_ENV === 'production';

const config = {
  mode: production ? 'production' : 'development',
  resolve: {
    mainFiles: ['index'],
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        use: {
          loader: 'babel-loader',
          query: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: 'tuktwo-[name]__[local]--[hash:base64:10]',
              sourceMap: !production,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /(node_modules|pyrene\/dist).*\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      // favicon: 'src/images/favicon.ico',
      filename: 'index.html',
      template: 'src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'tuktwo.css',
    }),
    new OptimizeCSSAssetsPlugin({}),
  ],
  output: {
    path: OUTPUT_PATH,
    filename: chunkData => (chunkData.chunk.name === 'main' ? 'tuktwo.js' : 'tuktwo.[name].js'),
    library: 'tuktwo',
    libraryTarget: 'umd',
  },
};

if (production) {
  console.warn('webpack is running in production mode\n');
} else {
  console.warn('webpack is running in development mode\n');
  config.devServer = {
    historyApiFallback: true,
  };
  config.entry = {
    main: './src/index.js',
    min: './src/index.js',
    dev: './src/index.js',
  };
}

export default config;
