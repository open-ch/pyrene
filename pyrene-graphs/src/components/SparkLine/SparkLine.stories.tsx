/* eslint-disable react/display-name */
import React from 'react';
import { Story, Meta } from '@storybook/react';
import moment from 'moment-timezone';

import SparkLine from './SparkLine';
import { genDownloadedVolumes } from '../../common/storyHelpers';

export default {
  title: 'Components/Chart/SparkLine',
  component: SparkLine,
} as Meta;

const Template: Story<any> = (args) => <SparkLine {...args} />;

export const Simple = Template.bind({});

const timezone = 'Asia/Shanghai';
const initialFrom = moment.tz('2019-10-01 00:00', timezone).valueOf();
const initialTo = moment.tz('2019-10-08 00:00', timezone).valueOf();

Simple.args = {
  data: genDownloadedVolumes(initialFrom, initialTo, 42).data,
  tooltipFormat: (d: number) => `${(d / 10.0).toFixed(2)}GB`,
};
