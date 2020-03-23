import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const production = process.env.NODE_ENV === 'production';

const OUTPUT_PATH = path.resolve(__dirname, 'dist');

const config = {
  mode: production ? 'production' : 'development',
  devtool: production ? 'none' : 'source-map',
  resolve: {
    mainFiles: ['index'],
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          query: {
            cacheDirectory: false,
          },
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
    new OptimizeCSSAssetsPlugin({}),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        include: 'pyrene-graphs.min.js',
        cache: true,
        parallel: true,
        sourceMap: !production,
      }),
    ],
  },
  output: {
    path: OUTPUT_PATH,
    filename: (chunkData) => (chunkData.chunk.name === 'main' ? 'pyrene-graphs.js' : 'pyrene-graphs.[name].js'),
    library: 'pyrene-graphs',
    libraryTarget: 'umd',
  },
  externals: ['react', 'react-dom', 'prop-types', 'moment-timezone', 'pyrene'],
};

if (production) {
  console.warn('webpack is running in production mode\n'); // eslint-disable-line no-console
} else {
  console.warn('webpack is running in development mode\n'); // eslint-disable-line no-console

  config.entry = {
    main: './src/index.js',
    min: './src/index.js',
    dev: './src/index.js',
    examples: './src/examples/index.js',
  };
}

export default config;
