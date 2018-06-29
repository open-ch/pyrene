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

}
