/* eslint-disable react/display-name */
import React, { useState } from 'react';
import { Story, Meta, ArgTypes } from '@storybook/react';
import MultiSelect, { MultiSelectProps } from './MultiSelect';
import { IconNames } from '../types';
import colorConstants from '../../styles/colorConstants';

const storyWrapper = (SimpleStory: Story, { args }: ArgTypes) => <div style={{ height: 300 }}><SimpleStory {...args} /></div>;

export default {
  title: 'Components/Form/MultiSelect',
  component: MultiSelect,
  parameters: {
    docs: {
      prepareForInline: storyWrapper,
    },
  }
} as Meta;

const testOptions: MultiSelectProps['options'] = [
  { value: 'chocolate', label: 'Chocolate', invalid: false },
  { value: 'strawberry', label: 'Strawberry', invalid: false },
  { value: 'vanilla', label: 'Vanilla', invalid: false },
  { value: 'bacon', label: 'Bacon', invalid: true },
  { value: 'cookiedough', label: 'Cookie Dough', invalid: false },
  { value: 'beer', label: 'Beer', invalid: false },
  { value: 'cottoncandy', label: 'Cotton Candy', invalid: false },
  { value: 'crab', label: 'Crab', invalid: false },
  { value: 'greentea', label: 'Green Tea', invalid: false },
  { value: 'mango', label: 'Mango', invalid: false },
  { value: 'tuttifrutti', label: 'Tutti Frutti', invalid: false },
  { value: 'grape', label: 'Grape', invalid: false },
  { value: 'coconutmilk', label: 'Coconut Milk', invalid: false },
  { value: 'dulce', label: 'Dulce de Leche', invalid: false },
  { value: 'caramel', label: 'Caramel', invalid: false },
  { value: 'banana', label: 'Banana', invalid: false },
  { value: 'garlic', label: 'Garlic', invalid: true },
  { value: 'twix', label: 'Twix', invalid: false },
  { value: 'mintchocolatechip', label: 'Mint Chocolate Chip', invalid: false },
  { value: 'spearmint', label: 'Spearmint', invalid: false },
  { value: 'oyster', label: 'Oyster', invalid: false },
  { value: 'pistachio', label: 'Pistachio', invalid: false },
  { value: 'rice', label: 'Rice', invalid: false },
  { value: 'chickenliver', label: 'Chicken Liver', invalid: true },
  { value: 'superman', label: 'Superman', invalid: false },
  { value: 'lucuma', label: 'Lucuma', invalid: false },
  { value: 'bluemoon', label: 'Blue Moon', invalid: false },
  { value: 'charcoal', label: 'Charcoal', invalid: false },
  { value: 'cheesecake', label: 'Cheesecake', invalid: false },
  { value: 'rumandraisin', label: 'Rum and Raisin', invalid: false },
  { value: 'moosetracks', label: 'Moose Tracks', invalid: false },
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

const Template: Story<MultiSelectProps> = (args) => {
  const [selection, setSelection] = useState([]);
  const compArgs: MultiSelectProps = {
    ...args,
    onChange: (sel) => setSelection(sel),
    value: selection,
  };
  return <MultiSelect {...compArgs} />;
};

export const Simple = Template.bind({});

Simple.args = {
  title: 'Multi-Select',
  customDelimiters: ['\\s', ',', ';', '?'],
  placeholder: 'Choose your favorite ice cream',
  helperLabel: 'Ice cream is delicious',
  options: testOptions,
  creatable: true,
  invalidLabel: 'Please no bacon or chicken liver',
};

export const WithIcons = Template.bind({});

WithIcons.args = {
  title: 'Multi-Select',
  customDelimiters: ['\\s', ',', ';', '?'],
  placeholder: 'Choose your favorite ice cream',
  helperLabel: 'Ice cream is delicious',
  options: testOptionsWithIcons,
  creatable: true,
  invalidLabel: 'Please no bacon or chicken liver',
};

export const withoutOptions = Template.bind({});
withoutOptions.args = {
  title: 'New Entries',
  placeholder: 'Choose your favorite ice cream',
  helperLabel: 'Ice cream is delicious',
  invalidLabel: 'Invalid entry format.',
  createTagLabel: 'Enter to create a new entry',
  customDelimiters: [',', '\\s'],
  required: true,
  clearable: true,
  creatable: true,
};
