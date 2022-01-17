/* eslint-disable no-alert */
import React from 'react';
import { Story, Meta } from '@storybook/react';
import Badge, { BadgeProps } from './Badge';

export default {
  title: 'Components/Other/Badge',
  component: Badge,
} as Meta;

const Template: Story<BadgeProps> = (args) => <Badge {...args} />;

/**
 * Clickable badge alerting danger
 * */
export const Danger = Template.bind({});

Danger.args = {
  label: 'Security Alert',
  maxWidth: 120,
  type: 'danger',
  onClick: () => alert('Dangerous!'),
};

/**
 * Unclickable badge
 * */
export const Unclickable = Template.bind({});

Unclickable.args = {
  label: 'Release Notes',
  maxWidth: 100,
  type: 'neutral',
};

/**
 * Clickable badge alerting success
 * */
export const Success = Template.bind({});

Success.args = {
  label: 'Success',
  maxWidth: 100,
  type: 'success',
  onClick: () => alert('This is a success!'),
};

/**
 * Unclickable badge alerting warning
 * */
export const Warning = Template.bind({});

Warning.args = {
  label: 'Warning',
  maxWidth: 100,
  type: 'warning',
};
