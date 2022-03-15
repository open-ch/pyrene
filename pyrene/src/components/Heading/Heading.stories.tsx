import React from 'react';
import { Story, Meta } from '@storybook/react';
import Heading, { HeadingProps } from './Heading';

export default {
  title: 'Components/Layout/Heading',
  component: Heading,
} as Meta;

const Template: Story<HeadingProps> = (args) => <Heading {...args} />;

export const HeadingOne = Template.bind({});
HeadingOne.args = {
  children: 'Heading one',
};

export const HeadingTwo = Template.bind({});
HeadingTwo.args = { children: 'Heading two', level: 2 };

export const HeadingTree = Template.bind({});
HeadingTree.args = { children: 'Heading tree', level: 3 };

export const HeadingFour = Template.bind({});
HeadingFour.args = { children: 'Heading four', level: 4 };
