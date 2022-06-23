import React from 'react';
import { Story, Meta } from '@storybook/react';
import { useArgs } from '@storybook/client-api';
import Search, { SearchProps } from './Search';

export default {
  title: 'Components/Form/Search',
  component: Search,
  args: {
    value: '',
    placeholder: 'Search for...',
  },
} as Meta;

const Template: Story<SearchProps> = ({ onChange, ...args }) => {
  const [, updateArgs] = useArgs();
  const changeSearchValue = (value: string) => updateArgs({ value: value });
  return <Search onChange={changeSearchValue} {...args} />;
};

export const Simple = Template.bind({});
