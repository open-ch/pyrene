import React from 'react';

import { Story, Meta } from '@storybook/react';

import Button, { ButtonProps } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

// Primary button
export const Primary = Template.bind({});

Primary.args = {
  label: 'Button',
};

// Danger button
export const Danger = Template.bind({});

Danger.args = {
  label: 'Button',
  type: 'danger',
};
