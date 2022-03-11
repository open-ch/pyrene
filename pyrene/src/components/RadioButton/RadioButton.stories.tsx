import React from 'react';
import { Story, Meta } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import RadioButton, { RadioButtonProps } from './RadioButton';

export default {
  title: 'Components/Form/RadioButton',
  component: RadioButton,
} as Meta;

const Template: Story<RadioButtonProps> = (args) => {
  const [, updateArgs] = useArgs();
  console.log(args);

  return (
    <RadioButton {...args} onChange={(value) => updateArgs({ checked: value === args.value })} />
  );
};

export const Simple = Template.bind({});
Simple.args = {
  checked: false,
  disabled: false,
  invalid: false,
  label: 'One',
  name: 'one',
  readonly: false,
  value: 'one',
};

export const Invalid = Template.bind({});
Invalid.args = {
  ...Simple.args,
  invalid: true,
};
