import React from 'react';
import { Story, Meta } from '@storybook/react';
import ArrowPopover, { ArrowPopoverProps } from './ArrowPopover';
import Placeholder from '../../examples/Placeholder';

export default {
  title: 'Components/Layout/ArrowPopover',
  component: ArrowPopover,
} as Meta;

const Template: Story<ArrowPopoverProps> = (args) => (
  <div>
    <ArrowPopover {...args} />
  </div>
);

export const TopLeft = Template.bind({});

TopLeft.args = {
  align: 'center',
  closePopover: () => null,
  distanceToTarget: 12,
  preferredPosition: ['top', 'left'],
  displayPopover: false,
  popoverContent: <Placeholder width={400} />,
  children: <Placeholder width={200} />,
};

export const BottomRight = Template.bind({});

BottomRight.args = {
  align: 'center',
  closePopover: () => null,
  distanceToTarget: 12,
  preferredPosition: ['bottom', 'right'],
  displayPopover: false,
  popoverContent: <Placeholder width={400} />,
  children: <Placeholder width={400} />,
};
