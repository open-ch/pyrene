import { TextFieldProps } from './TextField';
import { Example, StateProvider } from '../../examples/Example';

interface State {
  value: string;
}

const examples: Example<TextFieldProps, State> = {
  props: {
    title: 'Field Label',
    placeholder: 'Placeholder Text',
    helperLabel: 'Helper text for instructions',
    width: 500,
    value: (stateProvider) => stateProvider.state.value,
    onChange: (stateProvider: StateProvider<State>): TextFieldProps['onChange'] => (value) => stateProvider.setState({ value }),
  },
  category: 'Form',
};


export default examples;
