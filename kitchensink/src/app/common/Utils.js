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
      console.warn('Copy to clipboard failed.', ex);
      return false;
    } finally {
      document.body.removeChild(textarea);
    }
  }

  static isStateless(component) {
    return typeof component !== 'string' && !component.prototype.render;
  }

  /**
   * Test whether the startProp matches any of following patters:
   * stateProvider.state.value
   * stateProvider.setState(value)
   * @param {Function} startProp
   * @returns {boolean}
   */
  static isStatefulProperty = startProp => startProp.toString().match(/stateProvider\.(?:state|setState)/g);

  static isObjectPropertyFunction(object, key) {
    if (object && object.hasOwnProperty(key)) {
      const startProp = object[key];
      if (typeof startProp === "function") {
        return Utils.isStatefulProperty(startProp);
      }
    }
    return false;
  };

  /**
   * We need to remove the state-using function callback props from the initial state
   * so that they can be correctly registered later and not mess up the trivial values
   * @param {Object} startProps
   * @returns {Object} cleanStartProps
   */
  static removeStateProviderPropsFromStartProps(startProps) {
    const cleanStartProps = {};
    for (const key in startProps) {
      if (!Utils.isObjectPropertyFunction(startProps, key)) {
        cleanStartProps[key] = startProps[key];
      }
    }
    return cleanStartProps;
  };

}
