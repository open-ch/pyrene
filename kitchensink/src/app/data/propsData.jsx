import React from 'react';

const testOptions = [
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


const startProps = {
  'arrowbutton': {},
  'button': {
    label: 'Click Me',
  },
  'checkbox': {
    label: 'Click Me',
  },
  'link': {
    label: 'Click Me',
    path: '#',
  },
  'modal': {
    content: <React.Fragment />,
    size: 'small',
    titleLabel: 'Modal',
  },
  'radioselection': {
    radioLabels: ['option 1', 'option 2', 'option 3'],
    selectedOption: 'option 1',
  },
  'textarea': {
    title: 'Label',
    placeholder: 'Placeholder Text',
    helperLabel: 'Helper text for instructions',
    width: 500,
    rows: 3,
    maxLength: 50,
  },
  'textfield': {
    title: 'Field Label',
    placeholder: 'Placeholder Text',
    helperLabel: 'Helper text for instructions',
    width: 500,
  },

  'multi-select': {
    title: 'Multi-Select',
    placeholder: 'Choose your favorite ice cream',
    helperLabel: 'Ice cream is delicious',
    defaultValues: [testOptions[1].value, testOptions[2].value],
    options: testOptions,
  },
  'select': {
    title: 'Single-Select',
    placeholder: 'Choose your favorite ice cream',
    helperLabel: 'Ice cream is delicious',
    defaultValue: 'spearmint',
    options: testOptions,
  },
  'sharedialog': {
    position: 'bottom-right',
    link: 'http://www.veryveryverylonglinkonanydomainintheinternet.com',
  },
};


export default startProps;
