import React from 'react';

import { Story, Meta } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import RadioPopover, { RadioPopoverProps } from './RadioPopover';
import { Option } from './types';

export default {
  title: 'Components/Form/RadioPopover',
  component: RadioPopover,
} as Meta;

const Template: Story<RadioPopoverProps> = ({ onChange, ...args }) => {
  const [, updateArgs] = useArgs();
  const onChangeOption = (option: Option) => updateArgs({ value: option.value });
  return <RadioPopover {...args} onChange={onChangeOption} value={args.value || 'beer'} />;
};

export const Simple = Template.bind({});

Simple.args = {
  options: [{ label: 'Beer 🍺', value: 'beer' }, { label: 'Coffee ☕️', value: 'coffee' }, { label: 'Coffeebeer 🍹😎', value: 'coffeebeer' }],
  renderLabel: (option: Option) => (
    <span>
      <strong>
        Chosen:
      </strong>
      {` ${option?.label || ''}`}
    </span>
  ),
  renderHelpSection: () => (
    <span>
      Define the drink with which you feel like a party animal.
    </span>
  ),
  align: 'start'
};
