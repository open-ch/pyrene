import getTime from 'date-fns/getTime';
import subYears from 'date-fns/subYears';
import subDays from 'date-fns/subDays';
import { Example, StateProvider } from '../../examples/Example';
import { DatePickerMultipleProps } from './DatePickerMultiple';
import { getTimeZoneOnClient } from '../DatePicker/utils';

export interface State {
  from: number,
  to: number
}

const today = new Date();

const DatePickerMultipleWrapper: Example<DatePickerMultipleProps, State> = {
  props: {
    timezone: getTimeZoneOnClient(),
    lowerBound: getTime(subYears(today, 1)),
    upperBound: getTime(today),
    onChange: (stateProvider: StateProvider<State>) => (newFrom: number, newTo: number) => stateProvider.setState({ from: newFrom, to: newTo }),
    from: (stateProvider) => (stateProvider.state.from === undefined ? getTime(subDays(today, 40)) : stateProvider.state.from),
    to: (stateProvider) => (stateProvider.state.to === undefined ? getTime(subDays(today, 10)) : stateProvider.state.to),
  },
  category: 'Form',
};

export default DatePickerMultipleWrapper;
