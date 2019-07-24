import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';

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
        include: [
          path.resolve(__dirname, 'src'),
        ],
        use: {
          loader: 'babel-loader',
          query: {
            cacheDirectory: false,
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
              localIdentName: 'tuktwo-[name]__[local]--[hash:base64:10]',
              sourceMap: !production,
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
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
  externals: ['react', 'react-dom'],
};

if (production) {
  console.warn('webpack is running in production mode\n');
} else {
  console.warn('webpack is running in development mode\n');
  
  config.entry = {
    main: './src/index.js',
    min: './src/index.js',
    dev: './src/index.js',
  };
}

export default config;
