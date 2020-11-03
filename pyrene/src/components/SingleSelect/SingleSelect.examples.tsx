import { colorConstants } from '../..';
import { Example, StateProvider } from '../../examples/Example';
import { SingleSelectProps } from './SingleSelect';
import { SingleSelectOption } from './SingleSelectTypes';

const testOptions: SingleSelectOption[] = [
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
        value: (stateProvider: StateProvider<State>) => stateProvider.state.value,
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
        value: (stateProvider: StateProvider<State>) => stateProvider.state.value,
      },
      description: 'Single Select with Icons',
    },
  ],
};

examples.category = 'Form';

export default examples;
