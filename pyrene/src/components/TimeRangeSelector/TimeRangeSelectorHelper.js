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
/**
   * If the upperbound is set as default, then we need to update it to NOW based on the timezone.
   * @param state
   * @returns {number} updated upperbound in milliseconds
   */
function syncUpperBound(defaultUpperBound, currentUpperBound, timezone) { return defaultUpperBound === null ? moment().tz(timezone).seconds(0).valueOf() : currentUpperBound; } // 0 seconds to switch immediately after minute ticks

export { PRESET_TIME_RANGES, syncUpperBound };
