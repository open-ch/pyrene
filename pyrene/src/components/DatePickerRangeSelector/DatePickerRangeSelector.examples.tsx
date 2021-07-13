import React from 'react';
import getTime from 'date-fns/getTime';
import subYears from 'date-fns/subYears';
import subDays from 'date-fns/subDays';
import { Example, StateProvider } from '../../examples/Example';
import { DatePickerRangeSelectorProps } from './DatePickerRangeSelector';
import { getTimeZoneOnClient } from '../DatePicker/utils';

export interface State {
  from: number,
  to: number
}

const fontStyle = {
  fontSize: '16px',
  color: 'blue',
  marginRight: '8px',
};

const textStyle = {
  fontSize: '13px',
  color: 'blue',
};

const wrapperStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const renderRightSection = (): JSX.Element => (
  <div style={wrapperStyle}>
    <span className="pyreneIcon-data" style={fontStyle} />
    <div style={textStyle}>Export</div>
  </div>
);

const today = new Date();

const DatePickerRangeSelectorWrapper: Example<DatePickerRangeSelectorProps, State> = {
  props: {
    timezone: getTimeZoneOnClient(),
    lowerBound: getTime(subYears(today, 1)),
    from: (stateProvider) => (stateProvider.state.from === undefined ? getTime(subDays(today, 40)) : stateProvider.state.from),
    to: (stateProvider) => (stateProvider.state.to === undefined ? getTime(subDays(today, 10)) : stateProvider.state.to),
    upperBound: getTime(today),
    onChange: (stateProvider: StateProvider<State>) => (newFrom: number, newTo: number) => stateProvider.setState({ from: newFrom, to: newTo }),
    renderRightSection: renderRightSection,
  },
  category: 'Form',
};

export default DatePickerRangeSelectorWrapper;
