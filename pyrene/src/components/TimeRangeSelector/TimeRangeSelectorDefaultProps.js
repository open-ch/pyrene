import moment from 'moment';


const PRESET_TIME_RANGES = [
  {
    id: '24h',
    label: '24h',
    durationInMs: moment().diff(moment().subtract(1, 'days')),
  },
  {
    id: '7d',
    label: '7d',
    durationInMs: moment().diff(moment().subtract(7, 'days')),
  },
  {
    id: '30d',
    label: '30d',
    durationInMs: moment().diff(moment().subtract(30, 'days')),
  },
  {
    id: '1y',
    label: '1y',
    durationInMs: moment().diff(moment().subtract(1, 'years')),
  },
];

export default PRESET_TIME_RANGES;
