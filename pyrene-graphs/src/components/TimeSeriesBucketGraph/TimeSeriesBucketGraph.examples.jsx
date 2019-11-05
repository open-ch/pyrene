import moment from 'moment-timezone';
import { format } from 'd3-format';
import { downloadedVolumes } from '../../examples/timeSeriesData';

const examples = {};

const timezone = 'Asia/Shanghai';
const yUnit = 'B';

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
  dataSeries: downloadedVolumes,
  description: 'Downloaded volume',
  error: 'There was an error while loading data.',
  from: (stateProvider) => (stateProvider.state.from ? stateProvider.state.from : moment.tz('2019-10-01 00:00', timezone).valueOf()),
  to: (stateProvider) => (stateProvider.state.to ? stateProvider.state.to : moment.tz('2019-10-03 12:00', timezone).valueOf()),
  title: 'Volume',
  timezone: timezone,
  zoom: {
    lowerBound: moment.tz('2018-10-01 00:00', timezone).valueOf(),
    minZoomRange: moment.duration({ minutes: 30 }).valueOf(),
    onZoom: (stateProvider) => (from, to) => stateProvider.setState({ from, to }),
    upperBound: moment.tz('2020-10-01 00:00', timezone).valueOf(),
  },
};

examples.category = 'Chart';

export default examples;
