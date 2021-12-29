import React from 'react';

import { Story, Meta } from '@storybook/react';

import Filter, { FilterProps } from './Filter';

export default {
  title: 'Components/Data/Filter',
  component: Filter,
} as Meta;

const Template: Story<FilterProps> = (args) => <Filter {...args} />;

export const Simple = Template.bind({});

Simple.args = {
  filterValues: {},
  filters: [],
  negatable: true,
  onFilterSubmit: () => null,
};
