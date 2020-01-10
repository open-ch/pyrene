import { INDEX_START_TS, INDEX_VALUE } from './chartConstants';

/**
 * Gets the max value of the data series within the given time range.
 * @param {array}data - The original data series
 * @param {number}from - The `from` of the time range
 * @param {number}to - The `to` of the time range
 * @returns {null|number}
 */
// eslint-disable-next-line import/prefer-default-export
export const getMaxValue = (data, from, to) => {
  const dataAvailable = data && data.data && data.data.length > 0;
  if (!dataAvailable) {
    return null;
  }
  const startTSSeries = data.data.map((d) => d[INDEX_START_TS]);
  const firstIndexInTimeRange = startTSSeries.findIndex((t, i) => {
    if (i === startTSSeries.length - 1) {
      return t <= from;
    }
    return startTSSeries[i + 1] >= from && t <= to;
  });
  const lastIndexInReverse = startTSSeries.reverse().findIndex((t) => t <= to && t >= from);
  const lastIndexInTimeRange = lastIndexInReverse >= 0 ? startTSSeries.length - lastIndexInReverse - 1 : -1;
  const dataInRange = data.data.filter((d, i) => i >= firstIndexInTimeRange && i <= lastIndexInTimeRange);
  return dataInRange.length > 0 ? Math.max(...dataInRange.map((d) => d[INDEX_VALUE])) : null;
};
