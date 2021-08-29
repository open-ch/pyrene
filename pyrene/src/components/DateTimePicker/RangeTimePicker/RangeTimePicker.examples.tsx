import { Example, StateProvider } from '../../../examples/Example';
import { RangeTimePickerProps } from './RangeTimePicker';

export interface State {
  value?: [number, number] | null
}

const RangeTimePicker: Example<RangeTimePickerProps, State> = {};

RangeTimePicker.props = {
  onChange: (stateProvider: StateProvider<State>) => (value?: [number, number] | null) => { stateProvider.setState({ value }); },
  timeStamps: (stateProvider) => stateProvider.state.value,
};

RangeTimePicker.examples = [
  {
    props: {
      dateOnly: true,
      minDateTime: 946684740000,
      maxDateTime: 1809631860000,
      onChange: (stateProvider: StateProvider<State>) => (value?: [number, number] | null) => { stateProvider.setState({ value }); },
      timeStamps: (stateProvider) => stateProvider.state.value,
    },
    description: `Maximum date: ${new Date(1809631860000).toString()},  Minimum date: ${new Date(946684740000).toString()}`,
  },
  {
    props: {
      maxDateTime: 1809631860000,
      onChange: (stateProvider: StateProvider<State>) => (value?: [number, number] | null) => { stateProvider.setState({ value }); },
      timeStamps: (stateProvider) => stateProvider.state.value,
    },
    description: `Maximum date: ${new Date(1809631860000).toString()}`,
  },
  {
    props: {
      onChange: (stateProvider: StateProvider<State>) => (value?: [number, number] | null) => { stateProvider.setState({ value }); },
      timeStamps: (stateProvider) => stateProvider.state.value,
      timeZone: 'America/New_Yamk',
    },
  },
];

RangeTimePicker.category = 'Form';

export default RangeTimePicker;
