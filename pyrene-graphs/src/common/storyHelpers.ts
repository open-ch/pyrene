/**
 * Generate mock data for downloaded volumes for time series bucket chart.
 * @param {number}from - The starting time point of the time range in epoch milliseconds
 * @param {number}to - The ending time point of the time range in epoch milliseconds
 * @param {number}number - The number of data items required
 * @returns {{data: [], label: string}}
 */
export const genDownloadedVolumes = (
  from: number,
  to: number,
  number: number
): { label: string; data: number[][] } => {
  const data = {
    label: 'Volume',
    data: [] as number[][],
  };

  const timeFrame = (to - from) / number;
  for (let i = 0; i < number; i += 1) {
    data.data.push([from + i * timeFrame, Math.random() * 10000 + 1]);
  }

  return data;
};
