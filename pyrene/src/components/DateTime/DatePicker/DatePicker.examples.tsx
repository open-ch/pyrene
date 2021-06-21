import { Example, StateProvider } from '../../../examples/Example';
import { DatePickerProps, OnFunction } from './DatePicker';

export interface State {
  value: returnedDate,
}

type returnedDate = Date | Date[] | null | undefined;

/*
props: {
  from: (stateProvider: StateProvider<State>) => stateProvider.state.from,
  to: (stateProvider: StateProvider<State>) => stateProvider.state.to,
  onChange: (stateProvider: StateProvider<State>) => (value: State) => stateProvider.setState({ from: value.from, to:value.to }),
},
*/

const DatePicker: Example<DatePickerProps, State> = {};

DatePicker.props = {
  onChange: (stateProvider: StateProvider<State>)  => (value: returnedDate) => stateProvider.setState({ value }),
  value: (stateProvider: StateProvider<State>) => stateProvider.state.value,  
}


DatePicker.category = 'Form';

export default DatePicker;