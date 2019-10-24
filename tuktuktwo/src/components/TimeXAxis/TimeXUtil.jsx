import moment from 'moment-timezone';

/**
 * Time formatting function that formats timestamp to HH:mm format (e.g. 14:23).
 * If the current tick represents a different day from the previous tick, precede the HH:mm with Day of Week (e.g. TUE 21:33).
 * @param {number}timestamp - The timestamp value
 * @param {string}timezone - The current timezone
 * @param {number[]}tickValues - The tick values along the x axis
 * @returns {object}
 * @private
 */
const _formatHour = (timestamp, timezone, tickValues) => {
  const tick = {};
  const i = tickValues.findIndex(value => value === timestamp);
  if (i > 0 && moment.tz(timestamp, timezone).day() !== moment.tz(tickValues[i - 1], timezone).day()) {
    tick.value = `${moment.tz(timestamp, timezone).format('ddd').toUpperCase()}`;
    tick.isTransition = true;
  } else {
    tick.value = `${moment.tz(timestamp, timezone).format('HH:mm')}`;
  }
  return tick;
};

/**
 * Time formatting function that formats timestamp to ddd format (e.g. MON TUE).
 * @param {number}timestamp - The timestamp value
 * @param {string}timezone - The current timezone
 * @param {number[]}tickValues - The tick values along the x axis
 * @returns {object}
 * @private
 */
const _formatDayOfWeek = (timestamp, timezone, tickValues) => {
  const tick = {};
  const i = tickValues.findIndex(value => value === timestamp);
  if (i > 0 && moment.tz(timestamp, timezone).year() !== moment.tz(tickValues[i - 1], timezone).year()) {
    tick.value = `${moment.tz(timestamp, timezone).format('YYYY').toUpperCase()}`;
    tick.isTransition = true;
  } else if (i > 0 && moment.tz(timestamp, timezone).month() !== moment.tz(tickValues[i - 1], timezone).month()) {
    tick.value = `${moment.tz(timestamp, timezone).format('MMM').toUpperCase()}`;
    tick.isTransition = true;
  } else {
    tick.value = `${moment.tz(timestamp, timezone).format('ddd').toUpperCase()}`;
  }

  return tick;
};

/**
 * Time formatting function that formats timestamp to DD.MM.YYYY format (e.g. 04.08.2019).
 * If the current tick represents a different month from the previous tick, format the timestamp to MMM YYYY (e.g. JUL 2019).
 * @param {number}timestamp - The timestamp value
 * @param {string}timezone - The current timezone
 * @param {number[]}tickValues - The tick values along the x axis
 * @returns {object}
 * @private
 */
const _formatDate = (timestamp, timezone, tickValues) => {
  const tick = {};
  const i = tickValues.findIndex(value => value === timestamp);
  if (i > 0 && (moment.tz(timestamp, timezone).month() !== moment.tz(tickValues[i - 1], timezone).month())) {
    tick.value = `${moment.tz(timestamp, timezone).format('MMM').toUpperCase()}`;
    tick.isTransition = true;
  } else {
    tick.value = `${moment.tz(timestamp, timezone).format('DD.MM.YYYY')}`;
  }
  return tick;
};

/**
 * Time formatting function that formats timestamp to MM.YYYY format (i.e. 09 2019).
 * @param {number}timestamp - The timestamp value
 * @param {string}timezone - The current timezone
 * @returns {object}
 * @private
 */
const _formatMonth = (timestamp, timezone, tickValues) => {
  const tick = {};
  const i = tickValues.findIndex(value => value === timestamp);
  if (i > 0 && (moment.tz(timestamp, timezone).year() !== moment.tz(tickValues[i - 1], timezone).year())) {
    tick.value = `${moment.tz(timestamp, timezone).format('YYYY')}`;
    tick.isTransition = true;
  } else {
    tick.value = `${moment.tz(timestamp, timezone).format('MMM').toUpperCase()}`;
  }
  return tick;
};

/**
 * Preset definitions for time range thresholds depending on which the tick number and formatting varies.
 * @type {*[]}
 */
const TIME_RANGE_THRESHOLDS = [
  {
    id: '0.5h',
    unit: 'hour',
    durationInMs: moment.duration({ minutes: 30 }).valueOf(),
    interval: moment.duration({ minutes: 10 }),
    minMarginRight: 14,
    format: _formatHour,
  },
  {
    id: '1h',
    unit: 'hour',
    durationInMs: moment.duration({ hours: 1 }).valueOf(),
    interval: moment.duration({ minutes: 20 }),
    minMarginRight: 14,
    format: _formatHour,
  },
  {
    id: '6h',
    unit: 'hour',
    durationInMs: moment.duration({ hours: 6 }).valueOf(),
    interval: moment.duration({ hours: 1 }),
    minMarginRight: 14,
    format: _formatHour,
  },
  {
    id: '12h',
    unit: 'day',
    durationInMs: moment.duration({ hours: 12 }).valueOf(),
    interval: moment.duration({ hours: 2 }),
    minMarginRight: 14,
    format: _formatHour,
  },
  {
    id: '1d',
    unit: 'day',
    durationInMs: moment.duration({ days: 1 }).valueOf(),
    interval: moment.duration({ hours: 4 }),
    minMarginRight: 14,
    format: _formatHour,
  },
  {
    id: '2d',
    unit: 'day',
    durationInMs: moment.duration({ days: 2 }).valueOf(),
    interval: moment.duration({ hours: 8 }),
    minMarginRight: 14,
    format: _formatHour,
  },
  {
    id: '1w',
    unit: 'isoweek',
    durationInMs: moment.duration({ weeks: 1 }).valueOf(),
    interval: moment.duration({ days: 1 }),
    minMarginRight: 14,
    format: _formatDayOfWeek,
  },
  {
    id: '1m',
    unit: 'isoweek',
    durationInMs: moment.duration({ months: 1 }).valueOf(),
    interval: moment.duration({ weeks: 1 }),
    minMarginRight: 28,
    format: _formatDate,
  },
  {
    id: '3m',
    unit: 'isoweek',
    durationInMs: moment.duration({ months: 3 }).valueOf(),
    interval: moment.duration({ weeks: 2 }),
    minMarginRight: 28,
    format: _formatDate,
  },
  {
    id: '6m',
    unit: 'month',
    durationInMs: moment.duration({ months: 6 }).valueOf(),
    interval: moment.duration({ months: 1 }),
    minMarginRight: 14,
    format: _formatMonth,
  },
  {
    id: '1y',
    unit: 'year',
    durationInMs: moment.duration({ years: 1 }).valueOf(),
    interval: moment.duration({ months: 2 }),
    minMarginRight: 14,
    format: _formatMonth,
  },
  {
    id: '2y',
    unit: 'year',
    durationInMs: moment.duration({ years: 2 }).valueOf(),
    interval: moment.duration({ months: 4 }),
    minMarginRight: 14,
    format: _formatMonth,
  },
  {
    id: '>2y',
    unit: 'year',
    durationInMs: moment.duration({ years: 10 }).valueOf(),
    interval: moment.duration({ months: 6 }),
    minMarginRight: 14,
    format: _formatMonth,
  },
];

/**
 * Calculates out the tick values for the x axis.
 * @param {number}from - The starting time point in epoch milliseconds
 * @param {number}to - The ending time point in epoch milliseconds
 * @param {string}timezone - The current timezone
 * @param {Object}interval - The moment interval between neighboring ticks
 * @param {string}unit - The time unit by which the first timestamp is determined
 * @returns {number[]}
 * @private
 */
const _getTickValues = (from, to, timezone, interval, unit) => {
  const values = [];
  const startMoment = moment.tz(from, timezone).startOf(unit);
  const endMoment = moment.tz(to, timezone).endOf(unit);

  let currentMoment = startMoment;
  while (currentMoment.isSameOrBefore(endMoment)) {
    values.push(currentMoment.valueOf());
    currentMoment = currentMoment.add(interval);
  }

  return values.filter(value => value > from && value < to);
};

/**
 * Calculates the tick values for the x axis.
 * @param {number}from - The starting time point in epoch milliseconds
 * @param {number}to - The ending time point in epoch milliseconds
 * @param {string}timezone - The current timezone
 * @param {function}xScale - The scale function for the x-axis
 * @returns {number[]}
 */
export const getTickValues = (from, to, timezone, xScale) => {
  const durationInMs = to - from;
  const timeRangeThreshold = TIME_RANGE_THRESHOLDS.find(threshold => durationInMs <= threshold.durationInMs);
  const tickValues = _getTickValues(from, to, timezone, timeRangeThreshold.interval, timeRangeThreshold.unit);

  // Check if last tick is going to exceed border
  const lastTickMarginRight = xScale(to) - xScale(tickValues[tickValues.length - 1]);
  if (lastTickMarginRight < timeRangeThreshold.minMarginRight) {
    return tickValues.slice(0, tickValues.length - 1);
  }
  return tickValues;
};

/**
 * Function that formats a time point along the x axis.
 * @param {number}timestamp - The timestamp value in epoch milliseconds
 * @param {number}from - The starting time point in epoch milliseconds
 * @param {number}to - The ending time point in epoch milliseconds
 * @param {string}timezone - The current timezone
 * @returns {string}
 */
export const timeFormat = (timestamp, from, to, timezone) => {
  const durationInMs = to - from;
  const timeRangeThreshold = TIME_RANGE_THRESHOLDS.find(threshold => durationInMs <= threshold.durationInMs);
  return timeRangeThreshold.format(timestamp, timezone, _getTickValues(from, to, timezone, timeRangeThreshold.interval, timeRangeThreshold.unit));
};
