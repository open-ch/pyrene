import { colorConstants } from '../..';
import { Example, StateProvider } from '../../examples/Example';
import { SingleSelectProps } from './SingleSelect';
import { SingleSelectOption } from './SingleSelectTypes';

const testOptions: SingleSelectOption[] = [
  { value: 'chocolate', label: 'Chocolate', tags: ['Favorite'] },
  { value: 'strawberry', label: 'Strawberry', tags: ['Fruits', 'Favorite'] },
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

const icons = ['place', 'layers', 'clock'];
const colors = [colorConstants.blue600, colorConstants.red600, colorConstants.orange600, undefined];
const testOptionsWithIcons = testOptions.map((option, i) => ({ ...option, iconProps: { name: icons[i % 3], color: colors[i % 4] } }));


interface State {
  value: SingleSelectOption
}

const examples: Example<SingleSelectProps, State> = {
  props: {
    title: 'Single-Select',
    placeholder: 'Choose your favorite ice cream',
    helperLabel: 'Ice cream is delicious',
    options: testOptions,
    onChange: (stateProvider: StateProvider<State>) => (value: SingleSelectOption) => stateProvider.setState({ value }),
    value: (stateProvider: StateProvider<State>): SingleSelectOption => stateProvider.state.value,
  },
  examples: [
    {
      props: {
        title: 'Single-Select',
        placeholder: 'Choose your favorite ice cream',
        helperLabel: 'Ice cream is delicious',
        options: testOptions,
        onChange: (stateProvider: StateProvider<State>) => (value: SingleSelectOption) => stateProvider.setState({ value }),
        value: (stateProvider: StateProvider<State>): SingleSelectOption => stateProvider.state.value,
      },
      description: 'Simple Single Select',
    },
    {
      props: {
        title: 'Single-Select with Icons',
        placeholder: 'Choose your favorite ice cream',
        helperLabel: 'Ice cream is delicious',
        options: testOptionsWithIcons,
        onChange: (stateProvider: StateProvider<State>) => (value: SingleSelectOption) => stateProvider.setState({ value }),
        value: (stateProvider: StateProvider<State>): SingleSelectOption => stateProvider.state.value,
      },
      description: 'Single Select with Icons',
    },
    {
      props: {
        title: 'Single-Select with search',
        placeholder: 'Choose your favorite ice cream',
        helperLabel: 'Ice cream is delicious',
        options: testOptions,
        searchable: true,
        onChange: (stateProvider: StateProvider<State>) => (value: SingleSelectOption) => stateProvider.setState({ value }),
        value: (stateProvider: StateProvider<State>): SingleSelectOption => stateProvider.state.value,
      },
      description: 'Single Select with search',
    },
  ],
};

examples.category = 'Form';

export default examples;
