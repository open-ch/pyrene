import { chartConstants } from '@osag/tuktuktwo';
import { INDEX_START_TS } from '../../common/chartConstants';

/**
 * Gets the time frame for the last bucket of the data series with at least one item.
 *   2) If there is only one single bucket, map default bucket weight to time range
 *   3) If there is larger than or equal to 2 buckets, use second last bucket time frame
 * @param {[number, number]}data - The data series [startTS, value]
 * @param {function}xScale - the scale function (domain: timestamp, range: width)
 * @returns {number}
 */
export const getTimeFrameOfLastBucket = (data, xScale) => {
  if (data.length === 1) {
    return xScale.invert(chartConstants.marginLeftNumerical + chartConstants.barWeight) - xScale.domain()[0];
  }
  return data[data.length - 1][INDEX_START_TS] - data[data.length - 2][INDEX_START_TS];
};

/**
 * Given a specific timestamp, find its index in the bucket data series with at least one item.
 * @param {number}currentTS - The given timestamp
 * @param {number}lastBucketEndTS - The end timestamp of the last bucket
 * @param {[number, number]}data - The bucket data series
 * @returns {number}
 */
export const getCurrentBucketIndex = (currentTS, lastBucketEndTS, data) => {
  const endTSSeries = [...data.map((d) => d[INDEX_START_TS]), lastBucketEndTS];
  endTSSeries.shift();
  return endTSSeries.findIndex((t) => currentTS >= data[0][INDEX_START_TS] && t >= currentTS);
};

/**
 * Gets the end TS for a specific bucket in a data series with at least one item.
 * @param {number}index - The index of the given bucket in the data series
 * @param {number}lastBucketEndTS - The end TS of the last bucket
 * @param {[number, number]}data - The bucket data series
 * @returns {number}
 */
export const getCurrentBucketEndTS = (index, lastBucketEndTS, data) => {
  if (data.length === 1) {
    return lastBucketEndTS;
  }
  // For the last bucket, we assume the time frame is the same as the previous bucket
  return (index !== data.length - 1)
    ? data[index + 1][INDEX_START_TS]
    : (data[index][INDEX_START_TS] - data[index - 1][INDEX_START_TS] + data[index][INDEX_START_TS]);
};
