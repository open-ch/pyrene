import { Example, StateProvider } from '../../examples/Example';
import { DateTimePickerProps } from './DateTimePicker';

export interface State {
  value?: number | null
}

const DateTimePicker: Example<DateTimePickerProps, State> = {
  props: {
    onChange: (stateProvider: StateProvider<State>) => (value?: number | null) => { stateProvider.setState({ value }); },
  },

  examples: [
    {
      props: {
        dateOnly: true,
        minDateTime: 946684740000,
        maxDateTime: 1809631860000,
        onChange: (stateProvider: StateProvider<State>) => (value?: number | null) => { stateProvider.setState({ value }); },
      },
      description: `Maximum date: ${new Date(1809631860000).toString()},  Minimum date: ${new Date(946684740000).toString()}`,
    },
    {
      props: {
        locale: 'us',
        maxDateTime: 1809631860000,
        onChange: (stateProvider: StateProvider<State>) => (value?: number | null) => { stateProvider.setState({ value }); },
        timeStamp: 946684740000,
      },
      description: `Maximum date: ${new Date(1809631860000).toString()}`,
    },
    {
      props: {
        disabled: true,
        onChange: (stateProvider: StateProvider<State>) => (value?: number | null) => { stateProvider.setState({ value }); },
        timeZone: 'America/New_Yamk',
      },
    },
  ],
};

DateTimePicker.category = 'Form';

export default DateTimePicker;
