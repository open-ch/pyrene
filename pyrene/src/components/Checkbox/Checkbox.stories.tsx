import React from 'react';

import { Story, Meta } from '@storybook/react';

import Checkbox, { CheckboxProps } from './Checkbox';

export default {
  title: 'Components/Form/Checkbox',
  component: Checkbox,
} as Meta;

const Template: Story<CheckboxProps> = (args) => <Checkbox {...args} />;

export const Simple = Template.bind({});

Simple.args = {
  label: 'Check Me Please',
  onChange: () => null,
};
