import moment from 'moment-timezone';

const Formats = {
  /**
   * Default formatting function for tooltip time.
   * @param {number}time - The timestamp in epoch milliseconds
   * @param {string}timezone - The timezone
   * @returns {string}
   */
  tooltipTimeFormat: (time, timezone) => {
    if (moment.tz(time[0], timezone).day() !== moment.tz(time[1], timezone).day()) {
      return `${moment.tz(time[0], timezone).format('DD.MM.YYYY, HH:mm')} - ${moment.tz(time[1], timezone).format('DD.MM.YYYY, HH:mm')}`;
    }
    return `${moment.tz(time[0], timezone).format('DD.MM.YYYY, HH:mm')} - ${moment.tz(time[1], timezone).format('HH:mm')}`;
  },

  zoomTooltipTimeFormat: (start, end, timezone) => `${moment.tz(start, timezone).format('DD.MM.YYYY, HH:mm')} - ${moment.tz(end, timezone).format('DD.MM.YYYY, HH:mm')}`,
};

export default Formats;
