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
  filters: [
    {
      label: 'First', type: 'text', id: 'testKey1', options: [],
    }, {
      label: 'Second', type: 'text', id: 'testKey2', options: [],
    }, {
      label: 'Third', type: 'text', id: 'testKey3', options: [],
    }, {
      label: 'Fourth', type: 'text', id: 'testKey4', options: [],
    }, {
      label: 'Fifth', type: 'text', id: 'testKey5', options: [],
    }, {
      label: 'Sixth', type: 'text', id: 'testKey6', options: [],
    }, {
      label: 'Seventh', type: 'text', id: 'testKey7', options: [],
    }, {
      label: 'Eighth', type: 'text', id: 'testKey8', options: [],
    }, {
      label: 'Ninth', type: 'text', id: 'testKey9', options: [],
    }, {
      label: 'Tenth', type: 'text', id: 'testKey10', options: [],
    }, {
      label: 'Eleventh', type: 'text', id: 'testKey11', options: [],
    }, {
      label: 'Twelfth', type: 'text', id: 'testKey12', options: [],
    }],
  negatable: true,
  onFilterSubmit: () => null,
};
