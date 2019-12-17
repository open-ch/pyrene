import moment from 'moment-timezone';

const TIME_FORMATS = {
  DATE: 'DD.MM.YYYY',
  TIME: 'HH:mm',
  DATETIME: 'DD.MM.YYYY, HH:mm',
};

const Formats = {
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
  timeRangeFormat: (startTS, endTS, timezone, explicit) => {
    if (!endTS) {
      return `${moment.tz(startTS, timezone).format(TIME_FORMATS.DATETIME)} - ...`;
    }
    if (explicit || (moment.tz(startTS, timezone).day() !== moment.tz(endTS, timezone).day())) {
      return `${moment.tz(startTS, timezone).format(TIME_FORMATS.DATETIME)} - ${moment.tz(endTS, timezone).format(TIME_FORMATS.DATETIME)}`;
    }
    return `${moment.tz(startTS, timezone).format(TIME_FORMATS.DATETIME)} - ${moment.tz(endTS, timezone).format(TIME_FORMATS.TIME)}`;
  },

  /**
   * Time range formatting function that always renders starting and ending time points in explicit 'DD.MM.YYYY, HH:mm' format.
   * @param {number}startTS - The starting timestamp in epoch milliseconds
   * @param {number}endTS - The ending timestamp in epoch milliseconds
   * @param {string}timezone - The timezone
   * @returns {string}
   */
  explicitTimeRangeFormat: (startTS, endTS, timezone) => Formats.timeRangeFormat(startTS, endTS, timezone, true),

  /**
   * Default formatting function for time.
   * 'DD.MM.YYYY, HH:MM'
   *
   * @param {number}startTS - The starting timestamp in epoch milliseconds
   * @param {string}timezone - The timezone
   * @returns {string}
   */
  timeFormat: (startTS, timezone) => (moment.tz(startTS, timezone).format(TIME_FORMATS.DATETIME)),
};

export default Formats;
