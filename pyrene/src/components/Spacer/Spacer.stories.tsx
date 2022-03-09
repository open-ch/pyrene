import React from 'react';
import { Story, Meta } from '@storybook/react';
import Spacer, { SpacerProps } from './Spacer';

export default {
  title: 'Components/Layout/Spacer',
  component: Spacer,
} as Meta;

const Template: Story<SpacerProps> = (args) => (
  <>
    <p>Text before</p>
    <Spacer {...args} />
    <p>Text after</p>
  </>
);

export const Simple = Template.bind({});
Simple.args = {};
