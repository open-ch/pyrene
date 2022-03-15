import React from 'react';
import { Story } from '@storybook/react';
import { useArgs } from '@storybook/client-api';
import ToggleButtonGroup, { ToggleButtonGroupProps } from './ToggleButtonGroup';

export default {
  title: 'Components/Interaction/ToggleButtonGroup',
  component: ToggleButtonGroup,
};

const DefaultTemplate: Story<ToggleButtonGroupProps> = (args) => {
  const [, updateArgs] = useArgs();
  const changeValue = (value: string | number) => updateArgs({ value });
  return <ToggleButtonGroup {...args} onChange={changeValue} />;
};

export const Standard = DefaultTemplate.bind({});
Standard.args = {
  options: [
    { label: '1min', value: '1' },
    { label: '1h', value: '60' },
    { label: '24h', value: '3600' }],
};
