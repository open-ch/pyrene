import React from 'react';
import { Story, Meta } from '@storybook/react';

import Loader, { LoaderProps } from './Loader';

export default {
  title: 'Components/Other/Loader',
  component: Loader,
} as Meta;

const Template: Story<LoaderProps> = (args) => <Loader {...args} />;

export const Simple = Template.bind({});
Simple.args = {};

export const Light = Template.bind({});
Light.args = { styling: 'light' };
Light.parameters = {
  backgrounds: { default: 'dark' },
};

export const Inline = Template.bind({});
Inline.args = { type: 'inline' };
