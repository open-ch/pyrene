import { Example, StateProvider } from '../../examples/Example';
import { DateTimePickerTableProps } from './DateTimePickerTable';

export interface State {
  value?: number | [number, number] | null
}

const DateTimePickerTable: Example<DateTimePickerTableProps, State> = {};

DateTimePickerTable.props = {
  onChange: (stateProvider: StateProvider<State>) => (value?: number | [number, number] | null) => {
    stateProvider.setState({ value });
    // console.log(value);
  },
  timeStamp: (stateProvider) => stateProvider.state.value,
};

DateTimePickerTable.examples = [
  {
    props: {
      dateOnly: true,
      minDateTime: 946684740000,
      maxDateTime: 1809631860000,
      onChange: (stateProvider: StateProvider<State>) => (value?: number | [number, number] | null) => { stateProvider.setState({ value }); },
      timeStamp: (stateProvider) => stateProvider.state.value,
    },
    description: `Maximum date: ${new Date(1809631860000).toString()},  Minimum date: ${new Date(946684740000).toString()}`,
  },
  {
    props: {
      maxDateTime: 1809631860000,
      onChange: (stateProvider: StateProvider<State>) => (value?: number | [number, number] | null) => { stateProvider.setState({ value }); },
      timeStamp: (stateProvider) => stateProvider.state.value,
    },
    description: `Maximum date: ${new Date(1809631860000).toString()}`,
  },
  {
    props: {
      onChange: (stateProvider: StateProvider<State>) => (value?: number | [number, number] | null) => { stateProvider.setState({ value }); },
      timeStamp: (stateProvider) => stateProvider.state.value,
      timeZone: 'America/New_Yamk',
    },
  },
];

DateTimePickerTable.category = 'Form';

export default DateTimePickerTable;
