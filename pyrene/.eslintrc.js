const path = require('path');

module.exports = {
  extends: '@osag/eslint-config',
  env: {
    browser: true,
  },
  parserOptions: {
    sourceType: 'module',
    project: path.resolve(__dirname, 'tsconfig.json'),
  },
  rules: {
    'no-restricted-imports': ['error', 'jquery'],
    'react/jsx-props-no-spreading': 'off',
    'react/forbid-prop-types': 0,
    'no-multiple-empty-lines': 0,
    '@typescript-eslint/unbound-method': 0,
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