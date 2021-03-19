import { Example, StateProvider } from '../../examples/Example';
import { DateTimeInputProps } from './DateTimeInput';

export interface State {
  value: number | undefined
}

const DateTimeInput: Example<DateTimeInputProps, State> = {};

DateTimeInput.props = {
  onChange: (stateProvider: StateProvider<State>) => (value: number | undefined) => stateProvider.setState({ value }),
  timeStamp: (stateProvider) => stateProvider.state.value,
};

DateTimeInput.examples = [
  {
    props: {
      minDateTime: 946684740000,
      maxDateTime: 1809631865000,
      onChange: (stateProvider: StateProvider<State>) => (value: number | undefined) => stateProvider.setState({ value }),
      timeStamp: (stateProvider) => stateProvider.state.value,
    },
    description: 'Maximum date: 06.05.2027 19:31,  Minimum date: 31.12.1999 23:59',
  },
  {
    props: {
      maxDateTime: 1809631865000,
      onChange: (stateProvider: StateProvider<State>) => (value: number | undefined) => stateProvider.setState({ value }),
      timeStamp: (stateProvider) => stateProvider.state.value,
    },
    description: 'Maximum date: 06.05.2027 19:31',
  },
  {
    props: {
      onChange: (stateProvider: StateProvider<State>) => (value: number | undefined) => stateProvider.setState({ value }),
      timeStamp: (stateProvider) => stateProvider.state.value,
    },
    description: 'Timestamp date: 06.05.2027 19:31',
  },
];

DateTimeInput.category = 'Form';

export default DateTimeInput;
