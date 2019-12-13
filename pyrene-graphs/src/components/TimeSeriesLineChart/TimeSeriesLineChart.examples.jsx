import moment from 'moment-timezone';
import timeSeriesData from '../../examples/timeSeriesData';

const examples = {};

const timezone = 'Asia/Shanghai';
const initialFrom = moment.tz('2019-10-01 00:00', timezone).valueOf();
const initialTo = moment.tz('2019-10-08 00:00', timezone).valueOf();
const initialDataSeries = timeSeriesData.genNSMThreatScores(initialFrom, initialTo, 42);

examples.props = {
  dataSeries: (stateProvider) => (stateProvider.state.dataSeries ? stateProvider.state.dataSeries : initialDataSeries),
  description: 'THREAT SCORE',
  error: 'There was an error while loading data.',
  from: (stateProvider) => (stateProvider.state.from ? stateProvider.state.from : initialFrom),
  to: (stateProvider) => (stateProvider.state.to ? stateProvider.state.to : initialTo),
  title: 'Key Indicators Statistics',
  timezone: timezone,
};

examples.category = 'Chart';

export default examples;
