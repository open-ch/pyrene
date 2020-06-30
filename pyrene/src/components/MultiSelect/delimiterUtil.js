const DEFAULT_DELIMITERS = ['\n', '\t'];

/**
 * Creates a unique array of string case insensitively.
 * @param {string[]} array - array of string values
 * @returns {string[]}
 */
export const getCaseInsensitiveDistinctValues = (array) => array.reduce((result, el) => {
  if (result.every((otherEl) => otherEl.toLowerCase() !== el.toLowerCase())) {
    result.push(el);
  }
  return result;
}, []);

/**
 * Get delimited string values from a string.
 * @param {string} string - the raw string containing delimiter symbols
 * @returns {string[]}
 */
export const getDelimitedValues = (string) => {
  const delimiterRegx = new RegExp('[' + DEFAULT_DELIMITERS.join('|') + ']');
  return string.split(delimiterRegx).filter((v) => v.length > 0);
};
