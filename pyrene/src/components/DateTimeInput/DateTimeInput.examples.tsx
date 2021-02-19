import { Example, StateProvider } from '../../examples/Example';
import { DateTimeInputProps } from './DateTimeInput';

export interface State {
  value: number
}

const DateTimeInput: Example<DateTimeInputProps, State> = {};

DateTimeInput.props = {
  onChange: (stateProvider: StateProvider<State>) => (value: number | null) => {
    if (value) {
      stateProvider.setState({ value });
    }
  },
  timeStamp: (stateProvider) => stateProvider.state.value,
};

DateTimeInput.examples = [
  {
    props: {
      onChange: (stateProvider: StateProvider<State>) => (value: number | null) => {
        if (value) {
          stateProvider.setState({ value });
        }
      },
      timeStamp: (stateProvider) => stateProvider.state.value,
    },
  },
];

DateTimeInput.category = 'Form';

export default DateTimeInput;
