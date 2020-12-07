const baseConf = require('./jest.config');


// eslint-disable-next-line prefer-object-spread
module.exports = Object.assign({}, baseConf, { testResultsProcessor: 'jest-bamboo-formatter' });
