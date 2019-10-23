import moment from 'moment';
import { downloadedVolumes } from '../../examples/timeSeriesData';

const examples = {};

examples.props = {
  dataSeries: downloadedVolumes,
  description: 'Downloaded volume',
  from: moment('2019-10-01 00:00').valueOf(),
  title: 'Volume',
  timezone: 'Asia/Shanghai',
  to: moment('2019-10-05 00:00').valueOf(),
  yUnit: 'B',
};

examples.category = 'Chart';

export default examples;
