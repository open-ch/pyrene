export default class Utils {

  static copyStringToClipboard(copyString) {
    const textarea = document.createElement('textarea');
    textarea.textContent = copyString;
    textarea.style.position = 'fixed'; // Prevent scrolling to bottom of page in MS Edge.
    document.body.appendChild(textarea);
    textarea.select();

    try {
      return document.execCommand('copy'); // Security exception may be thrown by some browsers.
    } catch (ex) {
      console.warn('Copy to clipboard failed.', ex); // eslint-disable-line no-console
      return false;
    } finally {
      document.body.removeChild(textarea);
    }
  }

  static isWiredProp = (props, key) => props && typeof props[key] === 'function'
      && !!props[key].toString().match(/stateProvider\.(?:state|setState)/g);

  static getNormalProps = props => Object.keys(props)
    .filter(key => !Utils.isWiredProp(props, key))
    .reduce((cleanProps, key) => {
      cleanProps[key] = props[key]; // eslint-disable-line no-param-reassign
      return cleanProps;
    }, {})

  static getWiredProps = (props, propData) => Object.keys(props)
    .filter(key => Utils.isWiredProp(props, key))
    .reduce((connectedProps, key) => {
      connectedProps[key] = props[key](propData); // eslint-disable-line no-param-reassign
      return connectedProps;
    }, {});

}
