import path from 'path';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const production = process.env.NODE_ENV === 'production';

const OUTPUT_PATH = path.resolve(__dirname, 'dist');

const config = {
  mode: production ? 'production' : 'development',
  devtool: production ? undefined : 'source-map',
  resolve: {
    mainFiles: ['index'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: /node_modules/,
        loader: 'strip-sourcemap-loader',
        enforce: 'pre',
      },
      {
        test: /\.[jt]sx?$/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /react-datepicker.*\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.css$/,
        exclude: [
          /node_modules/,
        ],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: 'pyrene-[name]__[local]--[hash:base64:10]',
              },
              sourceMap: !production,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'url-loader',
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.NODE_ENV === 'debug' ? 'server' : 'disabled',
    }),
    new MiniCssExtractPlugin({
      filename: (chunkData) => (chunkData.chunk.name === 'main' ? 'pyrene.css' : 'pyrene.[name].css'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/styles/colors.module.css', to: `${OUTPUT_PATH}/[name][ext]` },
      ],
    }),
    new ForkTsCheckerWebpackPlugin({
      // Options as defined in: https://github.com/TypeStrong/fork-ts-checker-webpack-plugin/tree/master/examples/babel-loader
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        include: 'pyrene.min.js',
        parallel: true,
      }),
    ],
  },
  output: {
    path: OUTPUT_PATH,
    filename: (chunkData) => (chunkData.chunk.name === 'main' ? 'pyrene.js' : 'pyrene.[name].js'),
    library: 'pyrene',
    libraryTarget: 'umd',
  },
  externals: ['react', 'react-dom', 'moment', 'moment-timezone'],
};

if (production) {
  console.warn('webpack is running in production mode\n'); // eslint-disable-line no-console
  config.entry = {
    main: './src/index.ts',
    min: './src/index.ts',
  };
} else {
  console.warn('webpack is running in development mode\n'); // eslint-disable-line no-console

  config.entry = {
    main: './src/index.ts',
    min: './src/index.ts',
    dev: './src/index.ts',
    examples: './src/examples/index.ts',
  };
}

export default config;
