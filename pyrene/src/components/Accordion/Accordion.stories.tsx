/* eslint-disable react/display-name */
import React from 'react';
import { Story, Meta } from '@storybook/react';
import Accordion, { AccordionProps } from './Accordion';
import Placeholder from '../../examples/Placeholder';

export default {
  title: 'Components/Interaction/Accordion',
  component: Accordion,
} as Meta;

const Template: Story<AccordionProps> = (args) => <Accordion {...args} />;

export const Simple = Template.bind({});

Simple.args = {
  sections:
    [
      { renderContent: () => <Placeholder label="Content" />, title: 'Section one' },
      { renderContent: () => <Placeholder label="Content" />, title: 'Section two' },
      { renderContent: () => <Placeholder label="Content" />, title: 'Section three' },
    ],
};

export const WithIcons = Template.bind({});

WithIcons.args = {
  sections: [
    { iconProps: { name: 'resolved', color: 'green600' }, renderContent: () => <Placeholder label="Content" />, title: 'Section one' },
    { iconProps: { name: 'info', color: 'blue500' }, renderContent: () => <Placeholder label="Content" />, title: 'Section two' },
    { iconProps: { name: 'error', color: 'red500' }, renderContent: () => <Placeholder label="Content" />, title: 'Section three' }],
};
