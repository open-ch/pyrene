import getTime from 'date-fns/getTime';
import add from 'date-fns/add';

export type TimeRange = {
  durationInMs: number,
  label: string,
  id: string,
};

export enum Ranges {
  DAY = '24h',
  WEEK = '7d',
  MONTH = '30d',
  YEAR = '1y',
}

const PRESET_TIME_RANGES: Array<TimeRange> = [
  {
    id: Ranges.DAY,
    label: Ranges.DAY,
    durationInMs: getTime(add(0, { days: 1 })),
  },
  {
    id: Ranges.WEEK,
    label: Ranges.WEEK,
    durationInMs: getTime(add(0, { days: 7 })),
  },
  {
    id: Ranges.MONTH,
    label: Ranges.MONTH,
    durationInMs: getTime(add(0, { days: 30 })),
  },
  {
    id: Ranges.YEAR,
    label: Ranges.YEAR,
    durationInMs: getTime(add(0, { years: 1 })),
  },
];

export default PRESET_TIME_RANGES;
