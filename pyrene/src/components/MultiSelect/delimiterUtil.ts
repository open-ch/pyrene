/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const DEFAULT_DELIMITERS = ['\n', '\t'];

/**
 * Creates a unique array of string case insensitively.
 * @param {string[]} words - array of string values
 * @returns {string[]}
 */
export const getCaseInsensitiveDistinctValues = (words: string[]) => words.reduce((result, el) => {
  if (result.every((otherEl) => otherEl.toLowerCase() !== el.toLowerCase())) {
    result.push(el);
  }
  return result;
}, [] as string[]);

/**
 * Returns a RegExp object used to match a text with a pattern
 * @param {string[]} regexStringArray - Array of regex string delimiters
 * @returns {RegExp}
 */
export const getRegExp = (regexStringArray: Array<string>) => new RegExp(`\\s*[${regexStringArray.join('|')}]\\s*`);

/**
 * Get delimited string values from a string.
 * @param {string} text - the raw string containing delimiter symbols
 * @param {RegExp} delimiterRegx - RegExp object used to filter
 * @returns {string[]}
 */
export const getDelimitedValues = (text: string, delimiterRegx: RegExp) => text.trim().split(delimiterRegx).filter((v) => v.length > 0);

/**
 * Checks if a KeyboardEvent contains a delimiter and returns an Enter key event if it does.
 * @param {RegExp} delimiterRegexObj - Delimiter regex used for testing
 * @param {React.KeyboardEvent<HTMLElement>} keyEvent - KeyboardEvent to check
 * @returns {React.KeyboardEvent<HTMLElement>}
 */
export const delimiterCheck = (keyEvent: React.KeyboardEvent<HTMLElement>, delimiterRegexObj: RegExp) => {
  if (delimiterRegexObj.test(keyEvent.key)) {
    keyEvent.preventDefault();
    keyEvent.currentTarget.dispatchEvent(new KeyboardEvent('keydown', {
      code: 'Enter',
      key: 'Enter',
      charCode: 13,
      keyCode: 13,
      view: window,
      bubbles: true,
    }));
  }
  return keyEvent;
};
