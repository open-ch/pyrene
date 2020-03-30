import moment from 'moment';

const PRESET_TIME_RANGES = [
  {
    id: '24h',
    label: '24h',
    durationInMs: moment.duration(1, 'days').valueOf(),
  },
  {
    id: '7d',
    label: '7d',
    durationInMs: moment.duration(7, 'days').valueOf(),
  },
  {
    id: '30d',
    label: '30d',
    durationInMs: moment.duration(30, 'days').valueOf(),
  },
  {
    id: '1y',
    label: '1y',
    durationInMs: moment.duration(1, 'years').valueOf(),
  },
];

export default PRESET_TIME_RANGES;
