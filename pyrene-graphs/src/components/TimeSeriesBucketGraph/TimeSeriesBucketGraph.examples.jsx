import moment from 'moment';
import { downloadedVolumes } from '../../examples/timeSeriesData';

const examples = {};

const timeFormat = (time) => {
  if (moment(time[0]).day() !== moment(time[1]).day()) {
    return `${moment(time[0]).format('DD.MM.YYYY, HH:mm')} - ${moment(time[1]).format('DD.MM.YYYY, HH:mm')}`;
  }
  return `${moment(time[0]).format('DD.MM.YYYY, HH:mm')} - ${moment(time[1]).format('HH:mm')}`;
};

examples.props = {
  dataFormat: {
    tooltip: (num) => parseFloat(Math.round(num * 100) / 100).toFixed(2),
    yAxis: (num) => parseFloat(Math.round(num * 100) / 100).toFixed(0),
  },
  dataSeries: downloadedVolumes,
  description: 'Downloaded volume',
  from: moment('2019-10-01 00:00').valueOf(),
  onZoom: () => console.log('Graph has been zoomed!'),
  title: 'Volume',
  timezone: 'Europe/Zurich',
  to: moment('2019-10-03 12:00').valueOf(),
  yUnit: 'B',
  timeFormat: {
    tooltip: timeFormat,
    zoomTooltip: (d) => d,
  },
};

examples.category = 'Chart';

export default examples;
