import React from 'react';
import { Story, Meta } from '@storybook/react';
import Accordion, { AccordionProps } from './Accordion';

export default {
  title: 'Components/Interaction/Accodion',
  component: Accordion,
} as Meta;

const Template: Story<AccordionProps> = (args) => <Accordion {...args} />;

export const Simple = Template.bind({});
export const WithIcons = Template.bind({});

Simple.args = {
  sections:
    [
      { renderContent: () => null, title: 'Section one' },
      { renderContent: () => null, title: 'Section two' },
      { renderContent: () => null, title: 'Section three' },
    ],
};

WithIcons.args = {
  sections: [
    { iconProps: { name: 'resolved', color: 'green600' }, renderContent: () => null, title: 'Section one' },
    { iconProps: { name: 'info', color: 'blue500' }, renderContent: () => null, title: 'Section two' },
    { iconProps: { name: 'error', color: 'red500' }, renderContent: () => null, title: 'Section three' }],
};
