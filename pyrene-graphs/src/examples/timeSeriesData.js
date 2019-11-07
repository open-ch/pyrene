import moment from 'moment-timezone';

const timeSeriesData = {

  /**
   * Generate mock data for downloaded volumes for time series bucket graph.
   * @param {string}timezone - The timezone
   * @returns {{data: [], label: string}}
   */
  genDownloadedVolumes: (timezone) => {
    const dataSeries = {
      label: 'Volume',
      data: [],
    };

    const timeFrame = moment.duration({ hours: 1 }).valueOf();
    const from = moment('2019-10-01 00:00', timezone).valueOf();

    for (let i = 0; i < 60; i += 1) {
      dataSeries.data.push([from + i * timeFrame, Math.random() * 10000 + 1]);
    }

    return dataSeries;
  },

};

export default timeSeriesData;
