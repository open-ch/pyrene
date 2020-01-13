import { INDEX_START_TS, INDEX_VALUE } from './chartConstants';

/**
 * Gets the max value of the data series within the given time range.
 * @param {{data?: Number[][], label?: String}}data - The original data series
 * @param {number}from - The `from` of the time range
 * @param {number}to - The `to` of the time range
 * @returns {null|number}
 */
export const getMaxValueForBucket = (data, from, to) => {
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

export const getDataInRange = (data, from, to) => {
  const dataAvailable = !!(data && data[0] && data[0].data && data[0].data.length > 0);
  if (!dataAvailable) {
    return [];
  }
  // Filter out data outside `from` and `to` and get the max value
  return data.map((d) => ({ ...d, data: d.data.filter((e) => e[INDEX_START_TS] >= from && e[INDEX_START_TS] <= to) }));
};

export const getMaxValue = (data, from, to) => {
  const dataInRange = getDataInRange(data, from, to);
  return Math.max(...dataInRange.map((d) => Math.max(...d.data.map((e) => e[INDEX_VALUE]))));
};
