import React from 'react';

import { Story, Meta } from '@storybook/react';

// eslint-disable-next-line import/no-named-default
import { default as ToolTipComponent, TooltipProps } from './Tooltip';
import Placeholder from '../../examples/Placeholder';

export default {
  title: 'Components/Other/Tooltip',
  component: ToolTipComponent,
} as Meta;

const Template: Story<TooltipProps> = (args) => <ToolTipComponent {...args} />;

export const Tooltip = Template.bind({});

Tooltip.args = {
  label: 'Tooltip Label',
  preferredPosition: ['top', 'bottom'],
  align: 'center',
  children: <Placeholder width={320} label="Hover me" />,
};
