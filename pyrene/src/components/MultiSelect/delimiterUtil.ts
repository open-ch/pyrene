/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const DEFAULT_DELIMITERS = ['\n', '\t'];

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
 * Get delimited string values from a string.
 * @param {string} text - the raw string containing delimiter symbols
 * @returns {string[]}
 */
export const getDelimitedValues = (text: string) => {
  const delimiterRegx = new RegExp(`\\s*[${DEFAULT_DELIMITERS.join('|')}]\\s*`);
  return text.trim().split(delimiterRegx).filter((v) => v.length > 0);
};
