import React from 'react';

import { Story, Meta } from '@storybook/react';

import Button, { ButtonProps } from './Button';

export default {
  title: 'Components/Interaction/Button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

// Primary button
export const Primary = Template.bind({});

Primary.args = {
  label: 'Button',
};

// Secondary button
export const Secondary = Template.bind({});

Secondary.args = {
  label: 'Button',
  type: 'secondary',
};

// Ghost button
export const Ghost = Template.bind({});

Ghost.args = {
  label: 'Button',
  type: 'ghost',
};

// Danger button
export const Danger = Template.bind({});

Danger.args = {
  label: 'Button',
  type: 'danger',
  icon: 'errorOutline',
};

// Delete button
export const Delete = Template.bind({});

Delete.args = {
  label: 'Button',
  type: 'action',
  icon: 'errorOutline',
};
