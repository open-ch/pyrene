import React from 'react';
import { Story, Meta } from '@storybook/react';
import moment from 'moment-timezone';

import { formatDownloadVolumeTooltip, genDownloadedVolumes } from '../../common/storyHelpers';
import SparkLineChart from './SparkLineChart';
import colorSchemes from '../../styles/colorSchemes';

export default {
  title: 'Components/Chart/SparkLineChart',
  component: SparkLineChart,
  args: {
    axisLabel: 'Downloaded Volume last 7 Days',
  },
} as Meta;

const Template: Story<any> = (args) => (
  <SparkLineChart
    {...args}
    colorScheme={
      args.colorScheme?.valueGroundLight ? args.colorScheme : colorSchemes.colorSchemeDefault
    }
  />
);

const timezone = 'Asia/Shanghai';
const initialFrom = moment.tz('2019-10-01 00:00', timezone).valueOf();
const initialTo = moment.tz('2019-10-08 00:00', timezone).valueOf();

export const Simple = Template.bind({});
Simple.args = {
  keyFigure: '1000GB',
  enableTooltip: true,
  data: genDownloadedVolumes(initialFrom, initialTo, 42).data,
  tooltipFormat: formatDownloadVolumeTooltip,
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
};

export const Error = Template.bind({});
Error.args = {
  error: 'Something went wrong while crunching your numbers...',
};
