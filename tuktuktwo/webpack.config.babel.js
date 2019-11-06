import path from 'path';

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
    ],
  },
  output: {
    path: OUTPUT_PATH,
    filename: (chunkData) => (chunkData.chunk.name === 'main' ? 'tuktuktwo.js' : 'tuktuktwo.[name].js'),
    library: 'tuktuktwo',
    libraryTarget: 'umd',
  },
  externals: ['react', 'react-dom'],
};

if (production) {
  console.warn('webpack is running in production mode\n'); // eslint-disable-line no-console
} else {
  console.warn('webpack is running in development mode\n'); // eslint-disable-line no-console

  config.entry = {
    main: './src/index.js',
    min: './src/index.js',
    dev: './src/index.js',
  };
}

export default config;
