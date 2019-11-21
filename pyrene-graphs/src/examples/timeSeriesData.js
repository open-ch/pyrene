const timeSeriesData = {

  /**
   * Generate mock data for downloaded volumes for time series bucket graph.
   * @param {number}from - The starting time point of the time range in epoch milliseconds
   * @param {number}to - The ending time point of the time range in epoch milliseconds
   * @param {number}number - The number of data items required
   * @returns {{data: [], label: string}}
   */
  genDownloadedVolumes: (from, to, number) => {
    const dataSeries = {
      label: 'Volume',
      data: [],
    };

    const timeFrame = (to - from) / number;
    for (let i = 0; i < number; i += 1) {
      dataSeries.data.push([from + i * timeFrame - 50000000, Math.random() * 10000 + 1]);
    }

    return dataSeries;
  },

};

export default timeSeriesData;
