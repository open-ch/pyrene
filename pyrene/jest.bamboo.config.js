const baseConf = require('./jest.config');

module.exports = Object.assign({}, baseConf, { testResultsProcessor: 'jest-bamboo-formatter' });
