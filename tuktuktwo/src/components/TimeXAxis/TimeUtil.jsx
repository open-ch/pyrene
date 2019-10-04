import moment from 'moment';

const TIME_RANGE_THRESHOLDS = [
  {
    id: '0.5h',
    unit: 'hour',
    durationInMs: moment.duration({ minutes: 30 }).valueOf(),
    interval: moment.duration({ minutes: 10 }),
  },
  {
    id: '1h',
    unit: 'hour',
    durationInMs: moment.duration({ hours: 1 }).valueOf(),
    interval: moment.duration({ minutes: 20 }),
  },
  {
    id: '6h',
    unit: 'day',
    durationInMs: moment.duration({ hours: 6 }).valueOf(),
    interval: moment.duration({ hours: 1 }),
  },
  {
    id: '12h',
    unit: 'day',
    durationInMs: moment.duration({ hours: 12 }).valueOf(),
    interval: moment.duration({ hours: 2 }),
  },
  {
    id: '1d',
    unit: 'day',
    durationInMs: moment.duration({ days: 1 }).valueOf(),
    interval: moment.duration({ hours: 4 }),
  },
  {
    id: '1w',
    unit: 'week',
    durationInMs: moment.duration({ weeks: 1 }).valueOf(),
    interval: moment.duration({ days: 1 }),
  },
  {
    id: '1m',
    unit: 'week',
    durationInMs: moment.duration({ months: 1 }).valueOf(),
    interval: moment.duration({ weeks: 1 }),
  },
  {
    id: '6m',
    unit: 'month',
    durationInMs: moment.duration({ months: 6 }).valueOf(),
    interval: moment.duration({ months: 1 }),
  },
  {
    id: '1y',
    unit: 'month',
    durationInMs: moment.duration({ years: 1 }).valueOf(),
    interval: moment.duration({ months: 2 }),
  },
  {
    id: '2y',
    unit: 'year',
    durationInMs: moment.duration({ years: 2 }).valueOf(),
    interval: moment.duration({ months: 4 }),
  },
  {
    id: '>2y',
    unit: 'year',
    durationInMs: moment.duration({ years: 10 }).valueOf(),
    interval: moment.duration({ months: 6 }),
  },
];

const _getTickValues = (from, to, interval, unit) => {
  const values = [];
  const startMoment = moment(from).startOf(unit);
  const endMoment = moment(to).endOf(unit);

  let currentMoment = startMoment;
  while (currentMoment.isSameOrBefore(endMoment)) {
    values.push(currentMoment.valueOf());
    currentMoment = currentMoment.add(interval);
  }

  return values.filter(value => value > from && value < to);
};

export const getTickValues = (from, to) => {
  const durationInMs = to - from;
  const timeRangeThreshold = TIME_RANGE_THRESHOLDS.find(threshold => durationInMs <= threshold.durationInMs);
  return _getTickValues(from, to, timeRangeThreshold.interval, timeRangeThreshold.unit);
};
