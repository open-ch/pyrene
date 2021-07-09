import { Example, StateProvider } from '../../examples/Example';
import { DateTimeInputProps } from './DateTimePicker';

export interface State {
  value?: number | null
}

const DateTimeInput: Example<DateTimeInputProps, State> = {};

DateTimeInput.props = {
  onChange: (stateProvider: StateProvider<State>) => (value?: number | null) => {
    stateProvider.setState({ value });
    // console.log(value);
  },
  timeStamp: (stateProvider) => stateProvider.state.value,
};

DateTimeInput.examples = [
  {
    props: {
      dateOnly: true,
      minDateTime: 946684740000,
      maxDateTime: 1809631860000,
      onChange: (stateProvider: StateProvider<State>) => (value?: number | null) => { stateProvider.setState({ value }); },
      timeStamp: (stateProvider) => stateProvider.state.value,
    },
    description: `Maximum date: ${new Date(1809631860000).toString()},  Minimum date: ${new Date(946684740000).toString()}`,
  },
  {
    props: {
      maxDateTime: 1809631860000,
      onChange: (stateProvider: StateProvider<State>) => (value?: number | null) => { stateProvider.setState({ value }); },
      timeStamp: (stateProvider) => stateProvider.state.value,
    },
    description: `Maximum date: ${new Date(1809631860000).toString()}`,
  },
  {
    props: {
      onChange: (stateProvider: StateProvider<State>) => (value?: number | null) => { stateProvider.setState({ value }); },
      timeStamp: (stateProvider) => stateProvider.state.value,
      timeZone: 'America/New_Yamk',
    },
  },
];

DateTimeInput.category = 'Form';

export default DateTimeInput;
