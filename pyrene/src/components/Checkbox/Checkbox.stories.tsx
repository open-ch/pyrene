import React from 'react';
import { Story } from '@storybook/react';
import { useArgs } from '@storybook/client-api';
import Checkbox, { CheckboxProps } from './Checkbox';

export default {
  title: 'Components/Form/Checkbox',
  component: Checkbox,
};

const DefaultArgs = {
  label: 'Check Me Please',
};

const DefaultTemplate: Story<CheckboxProps> = (args) => {
  const [, updateArgs] = useArgs();
  const changeValue = (value: boolean) => updateArgs({ value });
  return <Checkbox {...args} onChange={changeValue} />;
};

export const Standard = DefaultTemplate.bind({});

Standard.args = DefaultArgs;

export const Required = DefaultTemplate.bind({});

Required.args = { ...DefaultArgs, required: true };

export const Tooltip = DefaultTemplate.bind({});

Tooltip.args = { ...DefaultArgs, tooltip: 'Hovered' };
