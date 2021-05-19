import { Example, StateProvider } from '../../examples/Example';
import { CheckboxProps } from './Checkbox';

export interface State {
  value: boolean
}

const examples: Example<CheckboxProps, State> = {
  props: {
    label: 'Check Me Please',
    onChange: (stateProvider: StateProvider<State>) => (value: boolean) => stateProvider.setState({ value }),
    value: (stateProvider: StateProvider<State>) => stateProvider.state.value,
  },
  examples: [
    {
      props: {
        label: 'Hover To Show Tooltip',
        tooltip: 'Hovered',
        onChange: (stateProvider: StateProvider<State>) => (value: boolean) => stateProvider.setState({ value }),
        value: (stateProvider: StateProvider<State>) => stateProvider.state.value,
      },
      description: 'Checkbox with tooltip',
    },
    {
      props: {
        label: 'Required To Check',
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
