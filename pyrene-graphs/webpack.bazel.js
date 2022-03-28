const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');

const baseConfigGenerator = require('./webpack.config.babel');

const sandboxRoot = path.resolve(process.cwd(), '../../../..');

module.exports = (env) => {
  const baseConfig = baseConfigGenerator();
  const PROPER_DIST_TARGET = path.join(sandboxRoot, env.OUTPUT_ARCHIVE_PATH);

  console.log('PROPER_DIST_TARGET: ' + PROPER_DIST_TARGET);
  console.log('CWD: ' + process.cwd());

  return {
    ...baseConfig,
    stats: 'errors-only',
    output: {
      ...baseConfig.output,
      path: path.join(process.cwd(), 'dist'),
    },
    plugins: [
      ...baseConfig.plugins,
      new FileManagerPlugin({
        events: {
          //in order to overwrite existing directory if exists, we have to delete and then move
          //if directory already exists and we move, it won't move anything
          onEnd: {
            delete: [{ source: PROPER_DIST_TARGET, options: { force: true } }],
            copy: [{ source: path.join(process.cwd(), 'dist'), destination: PROPER_DIST_TARGET }],
          },
        },
      }),
    ],
  };
};
