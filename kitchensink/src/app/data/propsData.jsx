import React from 'react';

const ContentFiller = (props) => (
  <div className={'unSelectable'} style={{ width: props.width,
    height: props.height,
    backgroundColor: 'var(--neutral-020)',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    color: 'var(--neutral-100)',
    fontSize: 32,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1 }}
  >
    {props.label ? props.label : 'Content Filler'}
  </div>
);

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

const adminAction = (event) => alert('Admin action triggered.');


const startProps = {
  'arrowbutton': {},
  'banner': {
    message: 'This is a test message',
    type: 'info',
  },
  'button': {
    label: 'Click Me',
  },
  'checkbox': {
    label: 'Click Me',
  },
  'collapsible': {
    defaultExpanded: true,
    renderCallback: () => <ContentFiller width={500} height={300} />,
  },
  'container': {
    title: 'Show More',
    collapsible: true,
    defaultExpanded: true,
    renderCallback: () => <ContentFiller width={800} height={300} />,
    adminAction: {
      label: 'admin',
      action: adminAction,
    }
  },
  'link': {
    label: 'Click Me',
    path: '#',
  },
  'loader': {
    size: 'large',
  },
  'modal': {
    content: <ContentFiller width={400} height={600} />,
    size: 'small',
    titleLabel: 'Modal',
  },
  'radioselection': {
    radioLabels: ['option 1', 'option 2', 'option 3'],
    selectedOption: 'option 1',
  },
  'tabview': {
    initialTabName: 'Tab 1',
    directAccessTabs: 3,
    tabs: [
      { name: 'Tab 1', renderCallback: () => <ContentFiller height={200} width={848} label={'tab 1'} />, disabled: false },
      { name: 'Tab 2', renderCallback: () => <ContentFiller height={200} width={848} label={'tab 2'} />, disabled: false },
      { name: 'Tab 3', renderCallback: () => <ContentFiller height={200} width={848} label={'tab 3'} />, disabled: true },
      { name: 'Looooooooooooooooooooooooooooooooooooooong Name', renderCallback: () => <ContentFiller height={200} width={848} label={'tab 4'} />},
      { name: 'Tab 5', renderCallback: () => <ContentFiller height={200} width={848} label={'tab 5'} />, disabled: true },
    ],
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
