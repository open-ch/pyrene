import moment from 'moment';
import { format } from 'd3-format';
import { downloadedVolumes } from '../../examples/timeSeriesData';

const examples = {};

const timeFormat = (time) => {
  if (moment(time[0]).day() !== moment(time[1]).day()) {
    return `${moment(time[0]).format('DD.MM.YYYY, HH:mm')} - ${moment(time[1]).format('DD.MM.YYYY, HH:mm')}`;
  }
  return `${moment(time[0]).format('DD.MM.YYYY, HH:mm')} - ${moment(time[1]).format('HH:mm')}`;
};

const yUnit = 'B';


examples.props = {
  dataFormat: {
    tooltip: (num) => {
      const formattedNum = `${format('~s')(num)}`;
      return `${formattedNum.substring(0, formattedNum.length - 1)} ${formattedNum >= 1000 ? formattedNum.substring(formattedNum.length - 1, formattedNum.length) : ''}${yUnit}`;
    },
    yAxis: (num) => parseFloat(Math.round(num * 100) / 100).toFixed(0),
  },
  dataSeries: downloadedVolumes,
  // dataSeries: { label: 'Volume', data: [] },
  description: 'Downloaded volume',
  error: 'We encountered an error while loading data ...',
  from: moment('2019-10-01 00:00').valueOf(),
  lowerBound: moment('2018-10-01 00:00').valueOf(),
  minZoomRange: moment.duration({ minutes: 30 }).valueOf(),
  onZoom: () => console.log('Graph has been zoomed!'),
  title: 'Volume',
  timezone: 'Europe/Zurich',
  to: moment('2019-10-03 12:00').valueOf(),
  upperBound: moment('2020-10-01 00:00').valueOf(),
  yUnit: yUnit,
  timeFormat: {
    tooltip: timeFormat,
    zoomTooltip: (d) => d,
  },
};

examples.category = 'Chart';

export default examples;
