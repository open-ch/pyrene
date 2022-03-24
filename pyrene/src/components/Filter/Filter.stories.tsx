import React from 'react';
import { Story, Meta } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import { MultiselectOption, Filter as FilterType } from './types';
import Filter, { FilterProps } from './Filter';

const testOptions: MultiselectOption = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
  { value: 'bacon', label: 'Bacon' },
  { value: 'cookiedough', label: 'Cookie Dough' },
  { value: 'beer', label: 'Beer' },
  { value: 'cottoncandy', label: 'Cotton Candy' },
  { value: 'crab', label: 'Crab' },
  { value: 'greentea', label: 'Green Tea' },
  { value: 'mango', label: 'Mango' },
  { value: 'tuttifrutti', label: 'Tutti Frutti' },
  { value: 'grape', label: 'Grape' },
  { value: 'coconutmilk', label: 'Coconut Milk' },
  { value: 'dulce', label: 'Dulce de Leche' },
  { value: 'caramel', label: 'Caramel' },
  { value: 'banana', label: 'Banana' },
  { value: 'garlic', label: 'Garlic' },
  { value: 'twix', label: 'Twix' },
  { value: 'mintchocolatechip', label: 'Mint Chocolate Chip' },
  { value: 'spearmint', label: 'Spearmint' },
  { value: 'oyster', label: 'Oyster' },
  { value: 'pistachio', label: 'Pistachio' },
  { value: 'rice', label: 'Rice' },
  { value: 'chickenliver', label: 'Chicken Liver' },
  { value: 'superman', label: 'Superman' },
  { value: 'lucuma', label: 'Lucuma' },
  { value: 'bluemoon', label: 'Blue Moon' },
  { value: 'charcoal', label: 'Charcoal' },
  { value: 'cheesecake', label: 'Cheesecake' },
  { value: 'rumandraisin', label: 'Rum and Raisin' },
  { value: 'moosetracks', label: 'Moose Tracks' },
];

const initialFilters: FilterType[] = [
  {
    label: 'First',
    type: 'singleSelect',
    id: 'testKey',
    options: testOptions,
  },
  {
    label: 'Second',
    type: 'multiSelect',
    id: 'testKey2',
    options: testOptions,
  },
  {
    label: 'Third',
    type: 'text',
    id: 'testKey3',
    options: [],
  },
  {
    label: 'Fourth',
    type: 'text',
    id: 'testKey4',
    options: [],
  },
  {
    label: 'Fifth',
    type: 'text',
    id: 'testKey5',
    options: [],
  },
  {
    label: 'Sixth',
    type: 'text',
    id: 'testKey6',
    options: [],
  },
  {
    label: 'Seventh',
    type: 'text',
    id: 'testKey7',
    options: [],
  },
  {
    label: 'Eighth',
    type: 'text',
    id: 'testKey8',
    options: [],
  },
  {
    label: 'Ninth',
    type: 'text',
    id: 'testKey9',
    options: [],
  },
  {
    label: 'Tenth',
    type: 'text',
    id: 'testKey10',
    options: [],
  },
  {
    label: 'Eleventh',
    type: 'text',
    id: 'testKey11',
    options: [],
  },
  {
    label: 'Twelfth',
    type: 'text',
    id: 'testKey12',
    options: [],
  },
];

export default {
  title: 'Components/Data/Filter',
  component: Filter,
  args: {
    filters: initialFilters,
  },
} as Meta;

const Template: Story<FilterProps> = (args) => {
  const [, setArgs] = useArgs();

  return (
    <Filter
      {...args}
      onFilterSubmit={(filterValues, negatedKeys) =>
        setArgs({
          filterValues,
          filters: args.filters?.map((filter) => ({
            ...filter,
            negated: negatedKeys.includes(filter.id),
          })),
        })
      }
    />
  );
};

export const Normal = Template.bind({});
Normal.args = {
  filterValues: {},
};

export const Disabled = Template.bind({});
Disabled.args = {
  filterValues: {},
  disabled: true,
};
