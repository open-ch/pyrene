const path = require('path');

module.exports = {
  extends: ['@osag/eslint-config', 'prettier'],
  parserOptions: {
    babelOptions: {
      configFile: path.resolve(__dirname, 'babel.config.json'),
    },
    project: path.resolve(__dirname, 'tsconfig.json'),
  },
  rules: {
    'no-else-return': ['error', { allowElseIf: true }],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'react/require-default-props': 'off',
      },
    },
  ],
};
