import React from 'react';
import { Story, Meta } from '@storybook/react';
import { useArgs } from '@storybook/client-api';
import SearchFinder, { SearchFinderProps } from './SearchFinder';

export default {
  title: 'Components/Form/SearchFinder',
  component: SearchFinder,
  args: {
    placeholder: 'Search',
    searchTerm: '',
    resultCount: 20,
    selectedResult: 0,
  },
} as Meta;

const Template: Story<SearchFinderProps> = ({ onSearchTermChange, ...args }) => {
  const [, updateArgs] = useArgs();
  const updateValue = (value:string) => updateArgs({ searchTerm: value });
  return <SearchFinder onSearchTermChange={updateValue} {...args} />;
};

export const Simple = Template.bind({});

