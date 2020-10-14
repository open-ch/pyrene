/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Example, StateProvider } from '../../examples/Example';
import { RadioGroupProps } from './RadioGroup';

interface State {
  value: string | number
}

const RadioGroup: Example<RadioGroupProps, State> = {};

RadioGroup.props = {
  options: [{ label: 'Beer 🍺', value: 'beer' }, { label: 'Coffee ☕️', value: 'coffee' }, { label: 'Coffeebeer 🍹😎', value: 'coffeebeer' }],
  onChange: (stateProvider: StateProvider<State>) => (value: string | number) => stateProvider.setState({ value }),
  value: (stateProvider) => stateProvider.state.value,
};

RadioGroup.examples = [
  {
    props: {
      alignment: 'vertical',
      options: [
        { label: 'Coffee', value: 'coffee' },
        { label: 'Whisky', value: 'whisky' },
        { label: 'Irish Coffee', value: 'irishcoffee' }],
      onChange: (stateProvider: StateProvider<State>) => (value: string | number) => stateProvider.setState({ value }),
      value: (stateProvider) => stateProvider.state.value,
    },
    description: '',
  }, {
    props: {
      alignment: 'horizontal',
      options: [
        { label: 'Coffee', value: 'coffee' },
        { label: 'Whisky', value: 'whisky' },
        { label: 'Irish Coffee', value: 'irishcoffee' }],
      onChange: (stateProvider: StateProvider<State>) => (value: string | number) => stateProvider.setState({ value }),
      value: (stateProvider) => stateProvider.state.value,
    },
    description: '',
  },
];

RadioGroup.category = 'Form';

export default RadioGroup;
