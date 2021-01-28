import { getTime, add } from 'date-fns';

const PRESET_TIME_RANGES = [
  {
    id: '24h',
    label: '24h',
    durationInMs: getTime(add(0, { days: 1 })),
  },
  {
    id: '7d',
    label: '7d',
    durationInMs: getTime(add(0, { days: 7 })),
  },
  {
    id: '30d',
    label: '30d',
    durationInMs: getTime(add(0, { days: 30 })),
  },
  {
    id: '1y',
    label: '1y',
    durationInMs: getTime(add(0, { years: 1 })),
  },
];

export default PRESET_TIME_RANGES;
