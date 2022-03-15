import React from 'react';
import { Story, Meta } from '@storybook/react';

import Container, { ContainerProps } from './Container';
import Placeholder from '../../examples/Placeholder';

export default {
  title: 'Components/Layout/Container',
  component: Container,
  args: {
    title: 'Container',
    defaultExpanded: false,
    renderCallback: () => <Placeholder label="Content" width={320} />,
  },
} as Meta;

const Template: Story<ContainerProps> = (args) => <Container {...args} />;

export const Simple = Template.bind({});

export const Collapsible = Template.bind({});
Collapsible.args = { collapsible: true };
