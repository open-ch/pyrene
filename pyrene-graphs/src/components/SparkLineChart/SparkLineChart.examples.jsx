import moment from 'moment-timezone';
import timeSeriesData from '../../examples/timeSeriesData';

const examples = {};

const timezone = 'Asia/Shanghai';
const initialFrom = moment.tz('2019-10-01 00:00', timezone).valueOf();
const initialTo = moment.tz('2019-10-08 00:00', timezone).valueOf();
const dataSeries = timeSeriesData.genDownloadedVolumes(initialFrom, initialTo, 42).data;

examples.props = {
  keyFigure: `${(dataSeries.map((d) => d[1]).reduce((a, b) => a + b) / 10000).toFixed(2)} TB`,
  dataSeries: dataSeries,
  axisLabel: 'DOWNLOADED VOLUME LAST 7 DAYS',
  timezone: timezone,
};

examples.category = 'Chart';

export default examples;
