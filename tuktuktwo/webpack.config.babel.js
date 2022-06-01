const path = require('path');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const production = process.env.NODE_ENV === 'production';

const OUTPUT_PATH = path.resolve(__dirname, 'dist');

const entry = production ? {
  main: './src/index.ts',
  min: './src/index.ts',
} : {
  main: './src/index.ts',
  min: './src/index.ts',
  dev: './src/index.ts',
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
        test: /\.[jt]sx?$/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  output: {
    path: OUTPUT_PATH,
    filename: (chunkData) => (chunkData.chunk.name === 'main' ? 'tuktuktwo.js' : 'tuktuktwo.[name].js'),
    library: 'tuktuktwo',
    libraryTarget: 'umd',
  },
  externals: ['react', 'react-dom', 'moment-timezone'],
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.NODE_ENV === 'debug' ? 'server' : 'disabled',
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
  entry
});
