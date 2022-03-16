import React from 'react';
import { Story, Meta } from '@storybook/react';
import Collapsible, { CollapsibleProps } from './Collapsible';
import Placeholder from '../../utils/storybook/Placeholder';

export default {
  title: 'Components/Layout/Collapsible',
  component: Collapsible,
} as Meta;

const Template: Story<CollapsibleProps> = (args) => <Collapsible {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  renderCallback: () => <Placeholder />,
  defaultExpanded: true,
};
