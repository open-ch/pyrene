import React from 'react';

import { Story, Meta } from '@storybook/react';

import * as ToolTipComponent from './Tooltip';
import Placeholder from '../../examples/Placeholder';

const Component = ToolTipComponent.default;

export default {
  title: 'Components/Other/Tooltip',
  component: ToolTipComponent.default,
} as Meta;

const Template: Story<ToolTipComponent.TooltipProps> = (args) => <Component {...args} />;

export const Tooltip = Template.bind({});

Tooltip.args = {
  label: 'Tooltip Label',
  preferredPosition: ['top', 'bottom'],
  align: 'center',
  children: <Placeholder width={320} label="Hover me" />,
};
