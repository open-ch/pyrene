import { Example, StateProvider } from '../../examples/Example';
import { CheckboxProps } from './Checkbox';

export interface State {
  value: boolean
}

const examples: Example<CheckboxProps, State> = {
  props: {
    label: 'Check me please',
    onChange: (stateProvider: StateProvider<State>) => (value: boolean) => stateProvider.setState({ value }),
    value: (stateProvider: StateProvider<State>) => stateProvider.state.value,
  },
  examples: [
    {
      props: {
        label: 'Hover to show tooltip',
        tooltip: 'Hovered',
        onChange: (stateProvider: StateProvider<State>) => (value: boolean) => stateProvider.setState({ value }),
        value: (stateProvider: StateProvider<State>) => stateProvider.state.value,
      },
      description: 'Checkbox with tooltip',
    },
    {
      props: {
        label: 'Required to check',
        required: true,
        onChange: (stateProvider: StateProvider<State>) => (value: boolean) => stateProvider.setState({ value }),
        value: (stateProvider: StateProvider<State>) => stateProvider.state.value,
      },
      description: 'Checked required',
    },
  ],
};

examples.category = 'Form';

export default examples;
