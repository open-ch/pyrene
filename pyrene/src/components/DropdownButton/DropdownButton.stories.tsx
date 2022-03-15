import React from 'react';
import { Story, Meta } from '@storybook/react';

import DropdownButton, { DropdownButtonProps } from './DropdownButton';

export default {
  title: 'Components/Interaction/DropdownButton',
  component: DropdownButton,
  args: {
    label: 'Do something',
    actions: ['A', 'B', 'C'].map((l) => ({
      label: `Action ${l}`,
      onClick: () => window.alert(`This is action ${l}`),
    })),
  },
} as Meta;

const Template: Story<DropdownButtonProps> = (args) => <DropdownButton {...args} />;
export const Primary = Template.bind({});

export const Disabled = Template.bind({});
Disabled.args = { disabled: true };

export const Loading = Template.bind({});
Loading.args = { loading: true };

export const WithIcon = Template.bind({});
WithIcon.args = { icon: 'home' };
