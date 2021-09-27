import React from 'react';

import { Story, Meta } from '@storybook/react';

import Button, { ButtonProps, ButtonKind } from './Button';

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
  type: ButtonKind.secondary,
};

// Ghost button
export const Ghost = Template.bind({});

Ghost.args = {
  label: 'Button',
  type: ButtonKind.ghost,
};

// Danger button
export const Danger = Template.bind({});

Danger.args = {
  label: 'Button',
  type: ButtonKind.danger,
  icon: 'errorOutline',
};

// Delete button
export const Delete = Template.bind({});

Delete.args = {
  label: 'Button',
  type: ButtonKind.action,
  icon: 'errorOutline',
};
