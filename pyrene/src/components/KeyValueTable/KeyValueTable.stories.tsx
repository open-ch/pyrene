import React from 'react';

import { Story, Meta } from '@storybook/react';

import KeyValueTable, { KeyValueTableProps } from './KeyValueTable';

export default {
  title: 'Components/Data/KeyValueTable',
  component: KeyValueTable,
} as Meta;

const Template: Story<KeyValueTableProps> = (args) => <KeyValueTable {...args} />;

export const Simple = Template.bind({});

Simple.args = {
  title: 'KeyValue Table',
  rows: [
    { key: 'Key1', value: 'value1' },
    { key: 'Key2', value: 'value2' },
    { key: 'Key3', value: 'value3' },
    { key: 'Short key', value: 'A very long value as long as the stream of time' },
    {
      key: 'Super Long Key Super Long Key Super Long Key Super Long Key Super Long Key Super Long Key SuperLongKey SuperLongKey SuperLongKey SuperLongKey SuperLongKey SuperLongKey SuperLongKey SuperLongKey ',
      value: 'Super Long Value Super Long Value Super Long Value Super Long Value Super Long Value SuperLongValue SuperLongValue SuperLongValue SuperLongValue SuperLongValue SuperLongValue SuperLongValue',
    },
  ],
  keyWidth: 160,
};
