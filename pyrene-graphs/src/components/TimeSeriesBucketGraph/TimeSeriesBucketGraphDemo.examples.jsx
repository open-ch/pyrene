import moment from 'moment-timezone';
import { downloadedVolumes } from '../../examples/timeSeriesData';

const examples = {};

const timezone = 'Europe/Zurich';

examples.props = {
  dataSeries: downloadedVolumes,
  description: 'Downloaded volume',
  error: 'There was an error while loading data.',
  initialFrom: moment.tz('2019-10-01 00:00', timezone).valueOf(),
  initialTo: moment.tz('2019-10-03 12:00', timezone).valueOf(),
  title: 'Volume',
  yUnit: 'B',
  timezone: timezone,
};

examples.category = 'Chart';

export default examples;
