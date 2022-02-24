import React from 'react';

import { Story, Meta } from '@storybook/react';
import Pill, { PillProps } from './Pill';

export default {
  title: 'Components/Other/Pill',
  component: Pill,
} as Meta;

const Template: Story<PillProps> = (args) => <Pill {...args} />;

export const Danger = Template.bind({});

Danger.args = {
  icon: 'hot',
  iconType: 'danger',
  value: 66,
  type: 'danger',
};

export const Success = Template.bind({});

Success.args = {
  icon: 'eye',
  iconType: 'neutral',
  value: 66,
  type: 'success',
};

export const Warning = Template.bind({});

Warning.args = {
  icon: 'warning',
  iconType: 'neutral',
  value: 188,
  maxValue: 200,
  type: 'warning',
};

export const Info = Template.bind({});

Info.args = {
  icon: 'share',
  iconType: 'info',
  value: 188,
  maxValue: 200,
  type: 'info',
};

export const ValueOverflow = Template.bind({});

ValueOverflow.args = {
  icon: 'data',
  iconType: 'neutral',
  value: 188,
  type: 'info',
};
