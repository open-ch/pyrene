const Enzyme = require('enzyme');

// TODO: check https://github.com/enzymejs/enzyme/issues/2429 and replace with official adapter once available
const Adapter = require('@wojtekmaj/enzyme-adapter-react-17');

Enzyme.configure({ adapter: new Adapter() });

// Treat logged errors as failed tests!
// eslint-disable-next-line no-console
console.error = (message) => {
  throw new Error(message);
};
