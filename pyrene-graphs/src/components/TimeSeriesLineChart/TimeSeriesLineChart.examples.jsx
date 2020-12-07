import moment from 'moment-timezone';
import timeSeriesData from '../../examples/timeSeriesData';

const examples = {};

const timezone = 'Asia/Shanghai';
const initialFrom = moment.tz('2019-10-01 00:00', timezone).valueOf();
const initialTo = moment.tz('2019-10-08 00:00', timezone).valueOf();
const initialData = timeSeriesData.genThreatScores(initialFrom, initialTo, 42);

examples.props = {
  data: (stateProvider) => (stateProvider.state.data ? stateProvider.state.data : initialData),
  description: 'Threat Score',
  error: 'There was an error while loading data.',
  from: (stateProvider) => (stateProvider.state.from ? stateProvider.state.from : initialFrom),
  to: (stateProvider) => (stateProvider.state.to ? stateProvider.state.to : initialTo),
  title: 'Key Indicators Statistics',
  timezone: timezone,
};

examples.category = 'Chart';

export default examples;
