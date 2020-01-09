import moment from 'moment-timezone';
import { formatPrefix } from 'd3-format';

const TIME_FORMATS = {
  DATE: 'DD.MM.YYYY',
  TIME: 'HH:mm',
  DATETIME: 'DD.MM.YYYY, HH:mm',
};

/**
 * Default formatting function for a time range.
 * For time range within the same day, 'DD.MM.YYYY, HH:MM - HH:mm'; for time range spanning different days, 'DD.MM.YYYY, HH:mm - DD.MM.YYYY, HH:mm'.
 *
 * @param {number}startTS - The starting timestamp in epoch milliseconds
 * @param {number}endTS - The ending timestamp in epoch milliseconds
 * @param {boolean}explicit - Whether a timestamp should always be rendered in 'DD.MM.YYYY, HH:mm' format
 * @param {string}timezone - The timezone
 * @returns {string}
 */
export const timeRangeFormat = (startTS, endTS, timezone, explicit) => {
  if (!endTS) {
    return `${moment.tz(startTS, timezone).format(TIME_FORMATS.DATETIME)} - ...`;
  }
  if (explicit || (moment.tz(startTS, timezone).day() !== moment.tz(endTS, timezone).day())) {
    return `${moment.tz(startTS, timezone).format(TIME_FORMATS.DATETIME)} - ${moment.tz(endTS, timezone).format(TIME_FORMATS.DATETIME)}`;
  }
  return `${moment.tz(startTS, timezone).format(TIME_FORMATS.DATETIME)} - ${moment.tz(endTS, timezone).format(TIME_FORMATS.TIME)}`;
};

/**
 * Time range formatting function that always renders starting and ending time points in explicit 'DD.MM.YYYY, HH:mm' format.
 * @param {number}startTS - The starting timestamp in epoch milliseconds
 * @param {number}endTS - The ending timestamp in epoch milliseconds
 * @param {string}timezone - The timezone
 * @returns {string}
 */
export const explicitTimeRangeFormat = (startTS, endTS, timezone) => timeRangeFormat(startTS, endTS, timezone, true);

/**
 * Default formatting function for time.
 * 'DD.MM.YYYY, HH:MM'
 *
 * @param {number}startTS - The starting timestamp in epoch milliseconds
 * @param {string}timezone - The timezone
 * @returns {string}
 */
export const timeFormat = (startTS, timezone) => (moment.tz(startTS, timezone).format(TIME_FORMATS.DATETIME));

/**
 * Gets the SI prefix format function with one significant digit and no trailing zeros; e.g. prefixSIScale(1000)(123) is 0.1k; prefixSIScale(1000)(12300) is 12.3k.
 * @param {number}value - The value the scale factor is based on
 */
export const prefixSIScale = (value) => formatPrefix('.1~s', value);

/**
 * Gets the SI scaled tick value.
 * @param {number}value - The raw value
 * @param {function}siPrefix - The SI prefix function
 * @returns {string}
 */
export const getSITickValue = (value, siPrefix) => {
  const scaledValue = siPrefix(value);
  return scaledValue.replace(/[^0-9^\\.]/g, '');
};

/**
 * Gets the SI scaled unit.
 * @param {number}value - the raw value
 * @param {function}siPrefix - The SI prefix function
 * @param {string}umit - the unit
 * @returns {string}
 */
export const getSIUnit = (value, siPrefix, unit) => {
  const scaledValue = siPrefix(value);
  return `${scaledValue.replace(/[0-9\\.]/g, '')}${unit}`;
};
