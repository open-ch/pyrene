import React, { useEffect, useState } from 'react';
import { Story, Meta, ArgTypes } from '@storybook/react';

import SearchWithTags, { MultiSelectProps } from './SearchWithTags';
import { Tag, OptionType, Option } from './types';

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
const typeOptions: OptionType[] = [
  { label: 'good', value: 'good' },
  { label: 'bad', value: 'bad' },
  { label: 'excellent', value: 'excellent' },
  { label: 'unknown', value: 'unknown' },
  { label: 'unknown2', value: 'unknown2' },
];

const sourceOptions: OptionType[] = [
  { label: 'global', value: 'global' },
  { label: 'local', value: 'local' },
  { label: 'policy-1', value: 'policy-1' },
  { label: 'policy-2', value: 'policy-2' },
  { label: 'policy-3', value: 'policy-3' },
];
const tagOptions: Tag[] = [
  { value: 'type', style: { backgroundColor: '#C0EDC0', color: '#4F815E' }, options: typeOptions },
  { value: 'section', style: { backgroundColor: '#E5EDF5', color: '#454D61' } },
  {
    value: 'source',
    style: { backgroundColor: '#A5EAE3', color: '#357E81' },
    options: sourceOptions,
  },
  { value: 'destination', style: { backgroundColor: '#91C3EA', color: '#215888' } },
  { value: 'rule', style: { backgroundColor: '#F7EEAF', color: '#86824E' } },
];

const Template: Story<MultiSelectProps> = (args) => {
  const [tagsValue, setTagsValue] = useState<Option[]>([]);
  const [searchValue, setSearchValue] = useState<string>();
  const compArgs: MultiSelectProps = {
    ...args,
    onChange: (sel) => {
      setTagsValue(sel);
    },
    tagsValue: tagsValue,
  };
  return <SearchWithTags {...compArgs} setSearchValue={setSearchValue} searchValue={searchValue} />;
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
