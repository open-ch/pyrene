const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const { JSDOM } = require('jsdom');

Enzyme.configure({ adapter: new Adapter() });

const jsdom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://localhost',
});
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .reduce((result, prop) => ({
      ...result,
      [prop]: Object.getOwnPropertyDescriptor(src, prop),
    }), {});
  Object.defineProperties(target, props);
}

global.window = window;
global.shallow = Enzyme.shallow;
global.mount = Enzyme.mount;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};

global.requestAnimationFrame = (callback) => {
  setTimeout(callback, 0);
};

global.shallow = Enzyme.shallow;

copyProps(window, global);
