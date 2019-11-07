import moment from 'moment-timezone';
import { format } from 'd3-format';
import timeSeriesData from '../../examples/timeSeriesData';

const examples = {};

const yUnit = 'B';
const timezone = 'Asia/Shanghai';
const dataSeries = timeSeriesData.genDownloadedVolumes(timezone);
const timeFrame = dataSeries.data[1][0] - dataSeries.data[0][0]; // In example data, the time frame is constant

const dataFormat = {
  tooltip: (num) => {
    const formattedNum = `${format('~s')(num)}`;
    if (num > 0.001 && num < 1000) {
      return `${parseFloat(formattedNum).toFixed(2)} ${yUnit}`;
    }
    return `${parseFloat(formattedNum.substring(0, formattedNum.length - 2)).toFixed(2)} ${formattedNum.substring(formattedNum.length - 1, formattedNum.length)}${yUnit}`;
  },
  yAxis: (num) => parseFloat(Math.round(num * 100) / 100).toFixed(0),
};

examples.props = {
  dataFormat: dataFormat,
  dataSeries: dataSeries,
  description: 'Downloaded volume',
  error: 'There was an error while loading data.',
  from: (stateProvider) => (stateProvider.state.from ? stateProvider.state.from : dataSeries.data[0][0]),
  to: (stateProvider) => (stateProvider.state.to ? stateProvider.state.to : dataSeries.data[dataSeries.data.length - 1][0] + timeFrame),
  title: 'Volume',
  timezone: timezone,
  zoom: (stateProvider) => ({
    lowerBound: moment.tz('2018-10-01 00:00', timezone).valueOf(),
    minZoomRange: moment.duration({ minutes: 30 }).valueOf(),
    onZoom: (from, to) => stateProvider.setState({ from, to }),
    upperBound: moment.tz('2020-10-01 00:00', timezone).valueOf(),
  }),
};

examples.category = 'Chart';

export default examples;
