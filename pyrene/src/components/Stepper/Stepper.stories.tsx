import React from 'react';
import { Story, Meta } from '@storybook/react';
import Stepper, { StepperProps } from './Stepper';

export default {
  title: 'Components/Interaction/Stepper',
  component: Stepper,
  args: {
    type: 'bordered',
    direction: 'up',
  },
} as Meta;

const Template: Story<StepperProps> = (args) => <Stepper {...args} />;

export const Simple = Template.bind({});
