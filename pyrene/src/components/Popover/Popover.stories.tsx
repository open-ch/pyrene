import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import Popover, { PopoverProps } from './Popover';
import Button from '../Button/Button';
import Paragraph from '../Paragraph/Paragraph';

export default {
  title: 'Components/Layout/Popover',
  component: Popover,
  args: {
    displayPopover: false,
    preferredPosition: 'bottom',
  },
} as Meta;

const Template: Story<PopoverProps> = (args) => {
  const [, updateArgs] = useArgs();

  const closePopoverHandle = () => {
    updateArgs({ displayPopover: false });
  };
  const openPopoverHandle = () => {
    updateArgs({ displayPopover: true });
  };
  return (
    <Popover
      {...args}
      renderPopoverContent={() => (
        <div style={{ width: 150, height: 80, padding: 20 }}>
          <Paragraph>Are you sure you want to delete this item?</Paragraph>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <Button
              onClick={closePopoverHandle}
              label="Cancel"
              type="secondary"
            />
            <Button
              type="danger"
              onClick={closePopoverHandle}
              label="Confirm"
            />
          </div>
        </div>
      )}
    >
      <Button label="Click me" onClick={openPopoverHandle} />
    </Popover>
  );
};

export const Simple = Template.bind({});

export const TopEnd = Template.bind({});
TopEnd.args = { preferredPosition: 'top', align: 'end' };
