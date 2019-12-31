const timeSeriesData = {

  /**
   * Generate mock data for downloaded volumes for time series bucket chart.
   * @param {number}from - The starting time point of the time range in epoch milliseconds
   * @param {number}to - The ending time point of the time range in epoch milliseconds
   * @param {number}number - The number of data items required
   * @returns {{data: [], label: string}}
   */
  genDownloadedVolumes: (from, to, number) => {
    const data = {
      label: 'Volume',
      data: [],
    };

    const timeFrame = (to - from) / number;
    for (let i = 0; i < number; i += 1) {
      data.data.push([from + i * timeFrame, Math.random() * 10000 + 1]);
    }
    data.data[10][1] = null;

    return data;
  },

  genThreatScores: (from, to, number) => {
    const data = [{
      label: 'high',
      data: [],
    }, {
      label: 'moderate',
      data: [],
    }, {
      label: 'low',
      data: [],
    }];

    const timeFrame = (to - from) / number;
    for (let i = 0; i <= number; i += 1) {
      data[0].data.push([from + i * timeFrame, Math.round(Math.random() * 5)]);
      data[1].data.push([from + i * timeFrame, Math.round(Math.random() * 5 + 10)]);
      data[2].data.push([from + i * timeFrame, Math.round(Math.random() * 5 + 30)]);
    }
    data[2].data[10][1] = null;

    return data;
  },

};

export default timeSeriesData;
