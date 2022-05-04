import React from 'react';
import { Story, Meta } from '@storybook/react';

import ProgressBar, { ProgressBarProps } from './ProgressBar';

export default {
  title: 'Components/Other/ProgressBar',
  component: ProgressBar,
} as Meta;

const Template: Story<ProgressBarProps> = (args) => (
  <div style={{width: '150px'}}>
    <ProgressBar {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = { percent: 70};

export const Empty = Template.bind({});
Empty.args = {}

export const CustomColor = Template.bind({});
CustomColor.args = { percent: 40, barColor: '#f1919b' };
