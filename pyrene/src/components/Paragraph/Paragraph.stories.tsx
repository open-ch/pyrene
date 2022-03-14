import React from 'react';
import { Story, Meta } from '@storybook/react';
import Paragraph, { ParagraphProps } from './Paragraph';

export default {
  title: 'Components/Layout/Paragraph',
  component: Paragraph,
  args: {
    children: 'Paragraph content',
  },
} as Meta;

const Template: Story<ParagraphProps> = (args) => <Paragraph {...args} />;

export const Simple = Template.bind({});
