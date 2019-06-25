import path from 'path';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const production = process.env.NODE_ENV === 'production';

const OUTPUT_PATH = path.resolve(__dirname, 'dist');

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
              modules: true,
              localIdentName: 'pyrene-[name]__[local]--[hash:base64:10]',
              sourceMap: !production,
            },
          },
          'postcss-loader',
        ],
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
    new MiniCssExtractPlugin({
      filename: 'pyrene.css',
    }),
    new OptimizeCSSAssetsPlugin({}),
    new CopyWebpackPlugin([
      { from: 'src/styles/colors.css', to: OUTPUT_PATH, flatten: true },
    ]),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: !production,
      }),
    ],
  },
  output: {
    path: OUTPUT_PATH,
    filename: production ? 'pyrene-graphs.js' : 'pyrene-graphs.[name].js',
    library: 'pyrene-graphs',
    libraryTarget: 'umd',
  },
  externals: ['react', 'react-dom'],
};

if (production) {
  console.warn('webpack is running in production mode\n'); // eslint-disable-line no-console
  config.plugins.unshift(new CleanWebpackPlugin());
} else {
  console.warn('webpack is running in development mode\n'); // eslint-disable-line no-console

  config.entry = {
    dev: './src/index.js',
    examples: './src/examples/index.js',
  };
}

export default config;
