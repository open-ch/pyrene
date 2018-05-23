import path from 'path';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import { exec } from 'child_process';

const production = process.env.NODE_ENV === 'production';

const config = {
  mode: production ? 'production' : 'development',
  resolve: {
    mainFiles: ['index'],
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          query: {
            cacheDirectory: false
          }
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:10]',
              sourceMap: !production
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.svg$/,
        loader: 'url-loader'
      },
      {
        test: /\.woff$/,
        loader: 'url-loader'
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    {
      apply: (compiler) => {
        compiler.hooks.watchRun.tap('TestAfterWatch', (compiler) => {
          const changedTimes = compiler.watchFileSystem.watcher.mtimes;
          const changedFiles = Object.keys(changedTimes).map(file => `${file.replace(/\.jsx/g, '.spec.js')}`).join(' ');

          const runTestsCommand = `NODE_ENV=test mocha --reporter nyan  --require babel-register --require ignore-styles src/test.js ${changedFiles}`;
          exec(runTestsCommand, (err, stdout, stderr) => {
            if (stdout) process.stdout.write(stdout);
            if (stderr) process.stderr.write(stderr);
          });
        });
      }
    }
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'pyrene.js',
    library: 'pyrene',
    libraryTarget: 'umd'
  }
};

if (production) {
  console.warn('webpack is running in production mode\n');
} else {
  console.warn('webpack is running in development mode\n');
}

export default config;
