const path = require('path');

module.exports = {
  extends: '@osag/eslint-config',
  env: {
    browser: true,
  },
  parserOptions: {
    sourceType: 'module',
    babelOptions: {
      configFile: path.resolve(__dirname, '.babelrc'),
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: path.resolve(__dirname, 'tsconfig.json'),
      },
    },
  ],
};
