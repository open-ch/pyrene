import React from 'react';
import { Story, Meta } from '@storybook/react';
import { useArgs } from '@storybook/client-api';
import RadioGroup, { RadioGroupProps } from './RadioGroup';

export default {
  title: 'Components/Form/RadioGroup',
  component: RadioGroup,
} as Meta;

const DefaultArgs = {
  title: 'Beverage',
  options: [
    { label: 'Coffee', value: 'coffee' },
    { label: 'Whisky', value: 'whisky' },
    { label: 'Irish Coffee', value: 'irishcoffee' }],
};

const DefaultTemplate: Story<RadioGroupProps> = ({ onChange, ...args }) => {
  const [, updateArgs] = useArgs();
  const changeValue = (value: string | number) => updateArgs({ value });
  return <RadioGroup {...args} onChange={changeValue} />;
};

export const Vertical = DefaultTemplate.bind({});
Vertical.args = DefaultArgs;

export const Horizontal = DefaultTemplate.bind({});
Horizontal.args = { ...DefaultArgs, alignment: 'horizontal' };
