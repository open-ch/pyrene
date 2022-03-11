import React from 'react';
import { Story, Meta } from '@storybook/react';
import LabelAndValue, { LabelAndValueProps } from './LabelAndValue';

export default {
  title: 'Components/Layout/LabelAndValue',
  component: LabelAndValue,
  args: {
    value: 'Apple',
    label: 'Fruit',
  },
} as Meta;

const Template: Story<LabelAndValueProps> = (args) => <LabelAndValue {...args} />;

export const Simple = Template.bind({});

export const NoLabelTinyInfo = Template.bind({});
NoLabelTinyInfo.args = {
  value: 'Apple', type: 'info', size: 'tiny', label: '',
};

export const TinyWaringSize = Template.bind({});
TinyWaringSize.args = { ...Simple.args, type: 'warning' };

export const LargeSuccessSize = Template.bind({});
LargeSuccessSize.args = { ...Simple.args, size: 'large', type: 'success' };

