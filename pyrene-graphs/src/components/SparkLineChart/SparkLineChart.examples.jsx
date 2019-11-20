import moment from 'moment-timezone';
import { format } from 'd3-format';
import timeSeriesData from '../../examples/timeSeriesData';

const examples = {};

const yUnit = 'B';
const timezone = 'Asia/Shanghai';
const initialFrom = moment.tz('2019-10-01 00:00', timezone).valueOf();
const initialTo = moment.tz('2019-10-08 00:00', timezone).valueOf();
const initialDataSeries = timeSeriesData.genDownloadedVolumes(initialFrom, initialTo, 42);

const dataFormat = (num) => {
  const formattedNum = `${format('~s')(num)}`;
  if (num > 0.001 && num < 1000) {
    return `${parseFloat(formattedNum).toFixed(2)} ${yUnit}`;
  }
  return `${parseFloat(formattedNum.substring(0, formattedNum.length - 2)).toFixed(2)} ${formattedNum.substring(formattedNum.length - 1, formattedNum.length)}${yUnit}`;
};

examples.props = {
  dataFormat: dataFormat,
  dataSeries: (stateProvider) => (stateProvider.state.dataSeries ? stateProvider.state.dataSeries : initialDataSeries),
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
      const newDataSeries = timeSeriesData.genDownloadedVolumes(from, to, 42);
      stateProvider.setState({
        dataSeries: newDataSeries,
      });
    },
    upperBound: moment.tz('2020-10-01 00:00', timezone).valueOf(),
  }),
};

examples.category = 'Chart';

export default examples;
