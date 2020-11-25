import { Example, StateProvider } from '../../examples/Example';
import { TextAreaProps } from './TextArea';

export interface State {
  value: string
}

const TextArea: Example<TextAreaProps, State> = {};
TextArea.examples = [{
  props: {
    title: 'Label',
    placeholder: 'Placeholder Text',
    helperLabel: 'Helper text for instructions',
    width: 500,
    rows: 3,
    maxLength: 50,
    value: (stateProvider: StateProvider<State>) => stateProvider.state.value,
    onChange: (stateProvider: StateProvider<State>) => (value: string) => stateProvider.setState({ value }),
  },
}];

TextArea.category = 'Form';

export default TextArea;
