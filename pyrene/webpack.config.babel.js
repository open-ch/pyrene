import path from 'path';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

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
        loader: 'raw-loader'
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
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: !production,
      }),
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: production ? 'pyrene.js' : 'pyrene.dev.js',
    library: 'pyrene',
    libraryTarget: 'umd',
  },
};

if (production) {
  console.warn('webpack is running in production mode\n');
  config.plugins.unshift(new CleanWebpackPlugin(['dist']));
} else {
  console.warn('webpack is running in development mode\n');
}

export default config;
