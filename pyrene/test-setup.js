const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });

// Treat logged errors as failed tests!
// eslint-disable-next-line no-console
console.error = (message) => {
  throw new Error(message);
};
