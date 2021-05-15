/* eslint-disable no-console */
import webpack from 'webpack'; // eslint-disable-line no-unused-vars
import path from 'path';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const production = process.env.NODE_ENV === 'production';
const BASE_PATH = process.env.BASE_PATH || '/';

const config = {
  mode: production ? 'production' : 'development',
  devtool: production ? 'none' : 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      react: require.resolve('react'),
      'react-dom': require.resolve('react-dom'),
    },
  },
  output: {
    publicPath: BASE_PATH,
  },
  module: {
    rules: [
      ...(process.env.SOURCE_MAP ? [{
        test: /\.js$/,
        use: ['source-map-loader'],
        // exclude transient dependencies, especially pyrene which is considered a different module than pyrene.dev.js
        include: [
          /pyrene\/dist\/pyrene\.dev\.js$/,
          /pyrene-graphs\/dist\/pyrene-graphs\.dev\.js$/,
        ],
        enforce: 'pre',
      }] : []),
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        use: {
          loader: 'babel-loader',
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
    new webpack.EnvironmentPlugin({
      BASE_PATH,
    }),
    new HtmlWebpackPlugin({
      favicon: 'src/images/favicon.ico',
      filename: 'index.html',
      template: 'src/index.html',
    }),
    new HtmlWebpackPlugin({
      favicon: 'src/images/favicon.ico',
      filename: '404.html',
      template: 'src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'kitchensink.css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/app/data/svgs/*', to: 'svgs/[name][ext]' },
        { from: 'src/fonts/Pyrene_Font_Kit_v1.0.zip', to: 'fonts/Pyrene_Font_Kit_v1.0.zip' },
      ],
    }),
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
