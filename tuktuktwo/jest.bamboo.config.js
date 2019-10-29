const baseConf = require('./jest.config');

module.exports = { ...baseConf, testResultsProcessor: 'jest-bamboo-formatter' };
