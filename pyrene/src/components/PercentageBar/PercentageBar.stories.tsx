import React from 'react';
import { Story, Meta } from '@storybook/react';

import PercentageBar, { PercentageBarProps } from './PercentageBar';

export default {
  title: 'Components/Other/PercentageBar',
  component: PercentageBar,
} as Meta;

const Template: Story<PercentageBarProps> = (args) => (
  <div style={{ width: '150px' }}>
    <PercentageBar {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = { percent: 70 };

export const Empty = Template.bind({});
Empty.args = {};

export const CustomColor = Template.bind({});
CustomColor.args = { percent: 40, barColor: '#f1919b' };

export const WithValue = Template.bind({});
WithValue.args = { percent: 30, value: 120 };
