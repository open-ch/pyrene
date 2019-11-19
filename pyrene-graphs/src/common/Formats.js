import moment from 'moment-timezone';

const Formats = {
  /**
   * Default time display format.
   */
  TIME_DISPLAY_FORMAT: 'DD.MM.YYYY, HH:mm',

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
      return `${moment.tz(startTS, timezone).format(Formats.TIME_DISPLAY_FORMAT)}`;
    }
    if (explicit || (moment.tz(startTS, timezone).day() !== moment.tz(endTS, timezone).day())) {
      return `${moment.tz(startTS, timezone).format(Formats.TIME_DISPLAY_FORMAT)} - ${moment.tz(endTS, timezone).format(Formats.TIME_DISPLAY_FORMAT)}`;
    }
    return `${moment.tz(startTS, timezone).format(Formats.TIME_DISPLAY_FORMAT)} - ${moment.tz(endTS, timezone).format('HH:mm')}`;
  },

  /**
   * Time range formatting function that always renders starting and ending time points in explicit 'DD.MM.YYYY, HH:mm' format.
   * @param {number}startTS - The starting timestamp in epoch milliseconds
   * @param {number}endTS - The ending timestamp in epoch milliseconds
   * @param {string}timezone - The timezone
   * @returns {string}
   */
  explicitTimeRangeFormat: (startTS, endTS, timezone) => Formats.timeRangeFormat(startTS, endTS, timezone, true),
};

export default Formats;
