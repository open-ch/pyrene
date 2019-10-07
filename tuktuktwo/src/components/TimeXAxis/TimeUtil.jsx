import moment from 'moment-timezone';

const _formatHour = (timestamp, timezone) => {
  if (moment.tz(timestamp, timezone).isSame(moment.tz(timestamp, timezone).startOf('day'))) {
    return `${moment.tz(timestamp, timezone).format('ddd').toUpperCase()} ${moment.tz(timestamp, timezone).format('HH:mm')}`;
  }
  return `${moment.tz(timestamp, timezone).format('HH:mm')}`;
};

const _formatDayOfWeek = (timestamp, timezone) => `${moment.tz(timestamp, timezone).format('ddd').toUpperCase()}`;

const _formatDate = (timestamp, timezone) => {
  if (moment.tz(timestamp, timezone).isSame(moment.tz(timestamp, timezone).startOf('month'))) {
    return `${moment.tz(timestamp, timezone).format('MMM').toUpperCase()} ${moment.tz(timestamp, timezone).format('YYYY')}`;
  }
  return `${moment.tz(timestamp, timezone).format('DD.MM.YYYY')}`;
};

const _formatMonth = (timestamp, timezone) => `${moment.tz(timestamp, timezone).format('MM.YYYY')}`;

const TIME_RANGE_THRESHOLDS = [
  {
    id: '0.5h',
    unit: 'hour',
    durationInMs: moment.duration({ minutes: 30 }).valueOf(),
    interval: moment.duration({ minutes: 10 }),
    render: _formatHour,
  },
  {
    id: '1h',
    unit: 'hour',
    durationInMs: moment.duration({ hours: 1 }).valueOf(),
    interval: moment.duration({ minutes: 20 }),
    render: _formatHour,
  },
  {
    id: '6h',
    unit: 'day',
    durationInMs: moment.duration({ hours: 6 }).valueOf(),
    interval: moment.duration({ hours: 1 }),
    render: _formatHour,
  },
  {
    id: '12h',
    unit: 'day',
    durationInMs: moment.duration({ hours: 12 }).valueOf(),
    interval: moment.duration({ hours: 2 }),
    render: _formatHour,
  },
  {
    id: '1d',
    unit: 'day',
    durationInMs: moment.duration({ days: 1 }).valueOf(),
    interval: moment.duration({ hours: 4 }),
    render: _formatHour,
  },
  {
    id: '1w',
    unit: 'isoweek',
    durationInMs: moment.duration({ weeks: 1 }).valueOf(),
    interval: moment.duration({ days: 1 }),
    render: _formatDayOfWeek,
  },
  {
    id: '1m',
    unit: 'isoweek',
    durationInMs: moment.duration({ months: 1 }).valueOf(),
    interval: moment.duration({ weeks: 1 }),
    render: _formatDate,
  },
  {
    id: '6m',
    unit: 'month',
    durationInMs: moment.duration({ months: 6 }).valueOf(),
    interval: moment.duration({ months: 1 }),
    render: _formatMonth,
  },
  {
    id: '1y',
    unit: 'month',
    durationInMs: moment.duration({ years: 1 }).valueOf(),
    interval: moment.duration({ months: 2 }),
    render: _formatMonth,
  },
  {
    id: '2y',
    unit: 'year',
    durationInMs: moment.duration({ years: 2 }).valueOf(),
    interval: moment.duration({ months: 4 }),
    render: _formatMonth,
  },
  {
    id: '>2y',
    unit: 'year',
    durationInMs: moment.duration({ years: 10 }).valueOf(),
    interval: moment.duration({ months: 6 }),
    render: _formatMonth,
  },
];

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

export const getTickValues = (from, to, timezone) => {
  const durationInMs = to - from;
  const timeRangeThreshold = TIME_RANGE_THRESHOLDS.find(threshold => durationInMs <= threshold.durationInMs);
  return _getTickValues(from, to, timezone, timeRangeThreshold.interval, timeRangeThreshold.unit);
};

export const timeFormat = (timestamp, timeRange, timezone) => {
  const timeRangeThreshold = TIME_RANGE_THRESHOLDS.find(threshold => timeRange <= threshold.durationInMs);
  return timeRangeThreshold.render(timestamp, timezone);
};
