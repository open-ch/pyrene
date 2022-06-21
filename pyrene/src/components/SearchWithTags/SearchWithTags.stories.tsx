/* eslint-disable react/display-name */
import React, { useState } from 'react';
import { Story, Meta, ArgTypes } from '@storybook/react';

import SearchWithTags, { MultiSelectProps } from './SearchWithTags';
import { Tag, Option } from './types';

const storyWrapper = (SimpleStory: Story, { args }: ArgTypes) => (
  <div style={{ height: 300 }}>
    <SimpleStory {...args} />
  </div>
);

export default {
  title: 'Components/Form/SearchWithTags',
  component: SearchWithTags,
  parameters: {
    docs: {
      prepareForInline: storyWrapper,
    },
  },
} as Meta;

const tagOptions: Tag[] = [
  { value: 'type', style: { backgroundColor: '#C0EDC0', color: '#4F815E' } },
  { value: 'section', style: { backgroundColor: '#E5EDF5', color: '#454D61' } },
  { value: 'source', style: { backgroundColor: '#A5EAE3', color: '#357E81' } },
  { value: 'destination', style: { backgroundColor: '#91C3EA', color: '#215888' } },
  { value: 'rule', style: { backgroundColor: '#F7EEAF', color: '#86824E' } },
];

const Template: Story<MultiSelectProps> = (args) => {
  const [selection, setSelection] = useState<readonly Option[]>([]);
  const compArgs: MultiSelectProps = {
    ...args,
    onChange: (sel) => {
      setSelection(sel);
    },
    value: selection,
  };
  return <SearchWithTags {...compArgs} />;
};

export const Simple = Template.bind({});

Simple.args = {
  placeholder: 'Search for sections, rules, objects and more. Filter with additional tags.',
  helperLabel: 'Use filters to narrow your search.',
  creatable: true,
  tags: tagOptions,
  resultCount: 0,
  selectedResult: 0,
  showResultCount: true,
};
