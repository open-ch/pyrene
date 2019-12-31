import moment from 'moment-timezone';
import { format } from 'd3-format';
import timeSeriesData from '../../examples/timeSeriesData';

const examples = {};

const yUnit = 'B';
const timezone = 'Asia/Shanghai';
const initialFrom = moment.tz('2019-10-01 00:00', timezone).valueOf();
const initialTo = moment.tz('2019-10-08 00:00', timezone).valueOf();
const initialData = timeSeriesData.genDownloadedVolumes(initialFrom, initialTo, 42);

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
  data: (stateProvider) => (stateProvider.state.data ? stateProvider.state.data : initialData),
  description: 'Downloaded volume',
  error: 'There was an error while loading data.',
  from: (stateProvider) => (stateProvider.state.from ? stateProvider.state.from : initialFrom),
  to: (stateProvider) => (stateProvider.state.to ? stateProvider.state.to : initialTo),
  title: 'Volume',
  timezone: timezone,
  zoom: (stateProvider) => ({
    lowerBound: moment.tz('2018-10-01 00:00', timezone).valueOf(),
    minZoomRange: moment.duration({ minutes: 30 }).valueOf(),
    onZoom: (from, to) => {
      stateProvider.setState({ from, to });
      const newData = timeSeriesData.genDownloadedVolumes(from, to, 42);
      stateProvider.setState({
        data: newData,
      });
    },
    upperBound: moment.tz('2020-10-01 00:00', timezone).valueOf(),
  }),
};

examples.category = 'Chart';

export default examples;
