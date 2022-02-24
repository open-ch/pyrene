/* eslint-disable react/display-name */
import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import SingleSelect, { SingleSelectProps } from './SingleSelect';
import { SingleSelectOption } from './SingleSelectTypes';
import { IconNames } from '../types';
import colorConstants from '../../styles/colorConstants';

export default {
  title: 'Components/Form/SingleSelect',
  component: SingleSelect,
} as Meta;

const testOptions: SingleSelectOption<string>[] = [
  { value: 'chocolate', label: 'Chocolate', tags: ['Favorite'] },
  { value: 'strawberry', label: 'Strawberry', tags: ['Fruits', 'Favorite'] },
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
  { value: 'bacon', label: 'Bacon' },
  { value: 'cookiedough', label: 'Cookie Dough' },
  { value: 'beer', label: 'Beer' },
  { value: 'cottoncandy', label: 'Cotton Candy' },
  { value: 'crab', label: 'Crab' },
  { value: 'greentea', label: 'Green Tea' },
  { value: 'mango', label: 'Mango', tags: ['Fruits'] },
  { value: 'tuttifrutti', label: 'Tutti Frutti', tags: ['Fruits'] },
  { value: 'grape', label: 'Grape', tags: ['Fruits'] },
  { value: 'coconutmilk', label: 'Coconut Milk' },
  { value: 'dulce', label: 'Dulce de Leche' },
  { value: 'caramel', label: 'Caramel' },
  { value: 'banana', label: 'Banana', tags: ['Fruits'] },
  { value: 'garlic', label: 'Garlic' },
  { value: 'twix', label: 'Twix', tags: ['Favorite'] },
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
  { value: 'rumandraisin', label: 'Rum and Raisin', tags: ['Fruits'] },
  { value: 'moosetracks', label: 'Moose Tracks' },
];
const icons: Array<keyof IconNames> = ['place', 'layers', 'clock'];
const colors = [
  colorConstants.blue600,
  colorConstants.red600,
  colorConstants.orange600,
  undefined,
];
const testOptionsWithIcons = testOptions.map((option, i) => ({
  ...option,
  iconProps: { name: icons[i % 3], color: colors[i % 4] },
}));

type OptionType = SingleSelectOption<string> | null;

const Template: Story<SingleSelectProps> = (args) => {
  const [value, setValue] = useState<OptionType>(testOptions[0]);
  const compArgs: SingleSelectProps = {
    ...args,
    onChange: (val) => setValue(val as SingleSelectOption<string>),
    value,
  };
  return <SingleSelect {...compArgs} />;
};

export const Simple = Template.bind({});

Simple.args = {
  title: 'Single-Select',
  placeholder: 'Choose your favorite ice cream',
  helperLabel: 'Ice cream is delicious',
  options: testOptions,
};

export const WithIcons = Template.bind({});

WithIcons.args = {
  title: 'Single-Select',
  placeholder: 'Choose your favorite ice cream',
  helperLabel: 'Ice cream is delicious',
  options: testOptionsWithIcons,
};

export const WithSearch = Template.bind({});

WithSearch.args = {
  title: 'Single-Select',
  placeholder: 'Choose your favorite ice cream',
  helperLabel: 'Ice cream is delicious',
  options: testOptions,
  searchable: true,
};
