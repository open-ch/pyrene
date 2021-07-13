import getTime from 'date-fns/getTime';
import subYears from 'date-fns/subYears';
import subDays from 'date-fns/subDays';
import { Example, StateProvider } from '../../examples/Example';
import { DatePickerSingleProps } from './DatePickerSingle';
import { getTimeZoneOnClient } from '../DatePicker/utils';

export interface State {
  from: number,
}

const today = new Date();

const DatePickerSingleWrapper: Example<DatePickerSingleProps, State> = {
  props: {
    timezone: getTimeZoneOnClient(),
    lowerBound: getTime(subYears(today, 1)),
    from: (stateProvider) => (stateProvider.state.from === undefined ? getTime(subDays(today, 40)) : stateProvider.state.from),
    upperBound: getTime(today),
    onChange: (stateProvider: StateProvider<State>) => (newDate: number) => stateProvider.setState({ from: newDate }),
  },
  category: 'Form',
};

export default DatePickerSingleWrapper;
