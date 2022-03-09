import React from 'react';
import { Story, Meta } from '@storybook/react';
import Icon, { IconProps } from './Icon';

export default {
  title: 'Components/Other/Icon',
  component: Icon,
} as Meta;

const Template: Story<IconProps> = (args) => <Icon {...args} />;

export const Home = Template.bind({});
Home.args = { name: 'home' };

export const Danger = Template.bind({});
Danger.args = {
  color: 'dangerFg',
  name: 'warning',
  type: 'standalone',
};

export const CSSVar = Template.bind({});
CSSVar.args = {
  color: 'var(--green-500)',
  name: 'circle',
};

export const SVG = Template.bind({});
SVG.args = {
  svg: 'http://s.cdpn.io/3/kiwi.svg',
};
