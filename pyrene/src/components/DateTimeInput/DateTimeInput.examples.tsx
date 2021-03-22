import { Example, StateProvider } from '../../examples/Example';
import { DateTimeInputProps } from './DateTimeInput';

export interface State {
  value?: number
}

const DateTimeInput: Example<DateTimeInputProps, State> = {};

DateTimeInput.props = {
  onChange: (stateProvider: StateProvider<State>) => (value?: number) => {
    if (value) {
      stateProvider.setState({ value });
    }
  },
  timeStamp: (stateProvider) => stateProvider.state.value,
};

DateTimeInput.examples = [
  {
    props: {
      minDateTime: 946684740000,
      maxDateTime: 1809631860000,
      onChange: (stateProvider: StateProvider<State>) => (value?: number) => {
        if (value) {
          stateProvider.setState({ value });
        }
      },
      timeStamp: (stateProvider) => stateProvider.state.value,
    },
    description: `Maximum date: ${new Date(1809631860000).toString()},  Minimum date: ${new Date(946684740000).toString()}`,
  },
  {
    props: {
      maxDateTime: 1809631860000,
      onChange: (stateProvider: StateProvider<State>) => (value?: number) => {
        if (value) {
          stateProvider.setState({ value });
        }
      },
      timeStamp: (stateProvider) => stateProvider.state.value,
    },
    description: `Maximum date: ${new Date(1809631860000).toString()}`,
  },
  {
    props: {
      onChange: (stateProvider: StateProvider<State>) => (value?: number) => {
        if (value) {
          stateProvider.setState({ value });
        }
      },
      timeStamp: (stateProvider) => (stateProvider.state.value ? stateProvider.state.value : 1809631860000),
    },
    description: `Timestamp date: ${new Date(1809631860000).toString()}`,
  },
];

DateTimeInput.category = 'Form';

export default DateTimeInput;
