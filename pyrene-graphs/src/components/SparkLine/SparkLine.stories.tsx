/* eslint-disable react/display-name */
import React from 'react';
import { Story, Meta } from '@storybook/react';
import moment from 'moment-timezone';
import { format } from 'd3-format';
import SparkLine from './SparkLine';

export default {
  title: 'Components/Chart/SparkLine',
  component: SparkLine,
} as Meta;

const Template: Story<any> = (args) => <SparkLine {...args} />;

/**
 * Generate mock data for downloaded volumes for time series bucket chart.
 * @param {number}from - The starting time point of the time range in epoch milliseconds
 * @param {number}to - The ending time point of the time range in epoch milliseconds
 * @param {number}number - The number of data items required
 * @returns {{data: [], label: string}}
 */
const genDownloadedVolumes = (from: number, to: number, number: number): { label: string, data: number[][] } => {
  const data = {
    label: 'Volume',
    data: [] as number[][],
  };

  const timeFrame = (to - from) / number;
  for (let i = 0; i < number; i += 1) {
    data.data.push([from + i * timeFrame, Math.random() * 10000 + 1]);
  }

  return data;
};

export const Simple = Template.bind({});

const yUnit = 'B';
const timezone = 'Asia/Shanghai';
const initialFrom = moment.tz('2019-10-01 00:00', timezone).valueOf();
const initialTo = moment.tz('2019-10-08 00:00', timezone).valueOf();
const data = genDownloadedVolumes(initialFrom, initialTo, 42).data;

const tooltipFormat = (num: number) => {
  const formattedNum = `${format('~s')(num)}`;
  if (num > 0.001 && num < 1000) {
    return `${parseFloat(formattedNum).toFixed(2)} ${yUnit}`;
  }
  return `${parseFloat(formattedNum.substring(0, formattedNum.length - 2)).toFixed(2)} ${formattedNum.substring(formattedNum.length - 1, formattedNum.length)}${yUnit}`;
};

Simple.args = {
  bigNumber: data.map((d) => d[1]).reduce((a, b) => a + b),
  data: data,
  tooltipFormat: (d: number) => tooltipFormat(d * 100000000),
  axisLabel: 'Downloaded Volume last 7 Days',
  timezone: timezone,
};
