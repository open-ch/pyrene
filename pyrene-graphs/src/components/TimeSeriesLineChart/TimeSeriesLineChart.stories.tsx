import { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import moment from 'moment-timezone';
import timeSeriesData from '../../examples/timeSeriesData';
import TimeSeriesLineChart from './TimeSeriesLineChart';

type TimeSeriesLineChartProps = ComponentProps<typeof TimeSeriesLineChart>;

const timezone = 'Asia/Shanghai';
const initialFrom = moment.tz('2021-10-01 00:00', timezone).valueOf();
const initialTo = moment.tz('2021-10-28 00:00', timezone).valueOf();
const initialData = timeSeriesData.genThreatScores(initialFrom, initialTo, 42);

export default {
  title: 'Components/Chart/TimeSeriesLineChart',
  component: TimeSeriesLineChart,
} as Meta;

const Template: Story<TimeSeriesLineChartProps> = (args) => (
  <TimeSeriesLineChart {...args} />
);

export const Sample = Template.bind({});
Sample.args = {
  data: initialData,
  description: 'Threat Score',
  error: 'There was an error while loading data.',
  from: initialFrom,
  to: initialTo,
  title: 'Key Indicators Statistics',
  timezone: timezone,
};
