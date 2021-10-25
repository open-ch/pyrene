import React from 'react';

import { Story, Meta } from '@storybook/react';

import ToolTipComponent, { TooltipProps } from './Tooltip';
import Placeholder from '../../examples/Placeholder';

export default {
  title: 'Components/Tooltip',
  component: ToolTipComponent,
} as Meta;

const Template: Story<TooltipProps> = (args) => <ToolTipComponent {...args}><Placeholder label="Hover me" /></ToolTipComponent>;

export const Tooltip = Template.bind({});

Tooltip.args = {
  label: 'Tooltip Label',
  preferredPosition: ['top', 'bottom'],
  align: 'center',
};
