import React from 'react';

import { Story, Meta } from '@storybook/react';

import IconButton, { IconButtonProps } from './IconButton';

export default {
  title: 'Components/Interaction/IconButton',
  component: IconButton,
} as Meta;

const Template: Story<IconButtonProps> = (args) => <IconButton {...args} />;

export const Info = Template.bind({});

Info.args = {
  icon: 'info',
  type: 'info',
  onClick: () => alert('Hello, world!'),
};

export const Disabled = Template.bind({});

Disabled.args = {
  icon: 'alarmActive',
  disabled: true,
};
