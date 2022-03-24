import React from 'react';
import { Story, Meta } from '@storybook/react';
import { useArgs } from '@storybook/client-api';
import moment from 'moment-timezone';
import { getSIUnitForTimeRange } from '../../common/Formats';
import TimeSeriesBucketChart from './TimeSeriesBucketChart';
import { formatDownloadVolumeTooltip, genDownloadedVolumes } from '../../common/storyHelpers';
import colorSchemes from '../../styles/colorSchemes';

export default {
  title: 'Components/Chart/TimeSeriesBucketChart',
  component: TimeSeriesBucketChart,
} as Meta;

const yUnit = 'B';
const timezone = 'Asia/Shanghai';
const initialFrom = moment.tz('2019-10-01 00:00', timezone).valueOf();
const initialTo = moment.tz('2019-10-08 00:00', timezone).valueOf();
const initialData = genDownloadedVolumes(initialFrom, initialTo, 42);

const DefaultTemplate: Story<any> = (args) => {
  const [, updateArgs] = useArgs();
  const onZoom = (from: number, to: number) => {
    const newData = genDownloadedVolumes(from, to, 42);
    updateArgs({ from: from, to: to, data: newData });
  };
  const zoom = {
    lowerBound: moment.tz('2018-10-01 00:00', timezone).valueOf(),
    minZoomRange: moment.duration({ minutes: 30 }).valueOf(),
    onZoom,
    upperBound: moment.tz('2020-10-01 00:00', timezone).valueOf(),
  };
  return (
    <TimeSeriesBucketChart
      {...args}
      zoom={zoom}
      colorScheme={
        args.colorScheme?.categorical ? args.colorScheme : colorSchemes.colorSchemeDefault
      }
    />
  );
};

export const Standard = DefaultTemplate.bind({});

Standard.args = {
  data: initialData,
  description: 'Downloaded volume',
  error: 'There was an error while loading data.',
  from: initialFrom,
  to: initialTo,
  title: 'Volume',
  timezone: timezone,
  tooltipFormat: formatDownloadVolumeTooltip,
  unit: getSIUnitForTimeRange(initialData, initialFrom, initialTo, yUnit, true),
};
