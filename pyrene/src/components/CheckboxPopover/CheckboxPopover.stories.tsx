import React from 'react';
import { Story, Meta } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import CheckboxPopover, { CheckboxPopoverProps } from './CheckboxPopover';

const initialItems = [
  { id: 'b', label: 'Banana', value: true },
  { id: 'c', label: 'Coconut', value: false },
];

export default {
  title: 'Components/Form/CheckboxPopover',
  component: CheckboxPopover,
  args: { buttonLabel: 'Choose Fruits', listItems: initialItems },
} as Meta;

const Template: Story<CheckboxPopoverProps> = (args) => {
  const [, setArgs] = useArgs();
  return (
    <CheckboxPopover
      {...args}
      onItemClick={(id, value) =>
        setArgs({
          listItems: args.listItems.map((i) => (i.id === id ? { ...i, value } : i)),
        })
      }
      onRestoreDefault={() => setArgs({ listItems: initialItems })}
    />
  );
};

export const Simple = Template.bind({});

export const Disabled = Template.bind({});
Disabled.args = { disabled: true };
