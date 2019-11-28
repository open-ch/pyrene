/* eslint-disable no-console */
import webpack from 'webpack'; // eslint-disable-line no-unused-vars
import path from 'path';

import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const production = process.env.NODE_ENV === 'production';

const config = {
  mode: production ? 'production' : 'development',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    publicPath: '/',
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
        exclude: /node_modules|pyrene\/dist|pyrene-graphs\/dist/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:10]',
              },
              sourceMap: !production,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.svg$/,
        loader: 'url-loader',
      },
      {
        test: /(node_modules|pyrene\/dist|pyrene-graphs\/dist).*\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.png$/,
        loader: 'url-loader',
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'url-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      favicon: 'src/images/favicon.ico',
      filename: 'index.html',
      template: 'src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'kitchensink.css',
    }),
    new OptimizeCSSAssetsPlugin({}),
    new CopyWebpackPlugin([
      { from: 'src/app/data/svgs/*', to: 'svgs/', flatten: true },
    ]),
  ],
};

if (production) {
  console.warn('webpack is running in production mode\n');
} else {
  console.warn('webpack is running in development mode\n');
  config.devServer = {
    historyApiFallback: true,
  };
}

export default config;
