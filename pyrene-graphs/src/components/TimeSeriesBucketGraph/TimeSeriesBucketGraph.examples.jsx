import moment from 'moment-timezone';
import { format } from 'd3-format';
import { downloadedVolumes } from '../../examples/timeSeriesData';

const examples = {};

const yUnit = 'B';
const timezone = 'Europe/Zurich';

const timeFormat = (time) => {
  if (moment.tz(time[0], timezone).day() !== moment.tz(time[1], timezone).day()) {
    return `${moment.tz(time[0], timezone).format('DD.MM.YYYY, HH:mm')} - ${moment.tz(time[1], timezone).format('DD.MM.YYYY, HH:mm')}`;
  }
  return `${moment.tz(time[0], timezone).format('DD.MM.YYYY, HH:mm')} - ${moment.tz(time[1], timezone).format('HH:mm')}`;
};

examples.props = {
  dataFormat: {
    tooltip: (num) => {
      const formattedNum = `${format('~s')(num)}`;
      if (num > 0.001 && num < 1000) {
        return `${parseFloat(formattedNum).toFixed(2)} ${examples.props.yUnit}`;
      }
      return `${parseFloat(formattedNum.substring(0, formattedNum.length - 2)).toFixed(2)} ${formattedNum.substring(formattedNum.length - 1, formattedNum.length)}${yUnit}`;
    },
    yAxis: (num) => parseFloat(Math.round(num * 100) / 100).toFixed(0),
  },
  dataSeries: downloadedVolumes,
  description: 'Downloaded volume in kB',
  error: 'We encountered an error while loading data ...',
  from: moment.tz('2019-10-01 00:00', timezone).valueOf(),
  lowerBound: moment.tz('2018-10-01 00:00', timezone).valueOf(),
  minZoomRange: moment.duration({ minutes: 30 }).valueOf(),
  onZoom: () => console.log('Graph has been zoomed!'),
  title: 'Volume',
  to: moment.tz('2019-10-03 12:00', timezone).valueOf(),
  upperBound: moment.tz('2020-10-01 00:00', timezone).valueOf(),
  yUnit: yUnit,
  timeFormat: {
    tooltip: (time) => timeFormat(time, timezone),
    zoomTooltip: (d) => d,
  },
  timezone: timezone,
};

examples.category = 'Chart';

export default examples;
