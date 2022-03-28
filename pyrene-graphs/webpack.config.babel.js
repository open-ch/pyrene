const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const production = process.env.NODE_ENV === 'production';

const OUTPUT_PATH = path.resolve(__dirname, 'dist');

const entry = production ? {
    main: './src/index.ts',
    min: './src/index.ts',
}: {
  main: './src/index.ts',
  min: './src/index.ts',
  dev: './src/index.ts',
  examples: './src/examples/index.js',
};

module.exports = () => ({
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
                localIdentName: 'pyrene-graphs-[name]__[local]--[hash:base64:10]',
              },
              sourceMap: !production,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /(node_modules).*\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        loader: 'raw-loader',
      },
      {
        test: /\.woff$/,
        loader: 'url-loader',
      },
    ],
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.NODE_ENV === 'debug' ? 'server' : 'disabled',
    }),
    new MiniCssExtractPlugin({
      filename: 'pyrene-graphs.css',
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
        include: 'pyrene-graphs.min.js',
        parallel: true,
      }),
    ],
  },
  output: {
    path: OUTPUT_PATH,
    filename: (chunkData) => (chunkData.chunk.name === 'main' ? 'pyrene-graphs.js' : 'pyrene-graphs.[name].js'),
    library: 'pyrene-graphs',
    libraryTarget: 'umd',
  },
  externals: ['react', 'react-dom', 'moment-timezone', 'pyrene'],
  entry,
});
