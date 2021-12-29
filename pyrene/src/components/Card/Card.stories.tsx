import React from 'react';

import { Story, Meta } from '@storybook/react';

import Card, { CardProps } from './Card';

export default {
  title: 'Components/Layout/Card',
  component: Card,
} as Meta;

const Template: Story<CardProps> = (args) => <Card {...args} />;

export const Example = Template.bind({});

Example.args = {
  children: <div>Card content</div>,
};
