import React from 'react';
import getTime from 'date-fns/getTime';
import subYears from 'date-fns/subYears';
import subDays from 'date-fns/subDays';
import { TimeRangeSelectorProps } from './TimeRangeSelector';
import { Example, StateProvider } from '../../examples/Example';

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

const TIMEZONE = 'Europe/Zurich';

function renderRightSection(): JSX.Element {
  return (
    <div style={wrapperStyle}>
      <span className="pyreneIcon-data" style={fontStyle} />
      <div style={textStyle}>Export</div>
    </div>
  );
}

interface State {
  from: number;
  to: number;
}

const today = new Date();

const examples: Example<TimeRangeSelectorProps, State> = {
  props: {
    timezone: TIMEZONE,
    lowerBound: getTime(subYears(today, 1)),
    from: (stateProvider: StateProvider<State>) => (stateProvider.state.from === undefined ? getTime(subDays(today, 40)) : stateProvider.state.from),
    to: (stateProvider: StateProvider<State>) => (stateProvider.state.to === undefined ? getTime(subDays(today, 10)) : stateProvider.state.to),
    upperBound: getTime(today),
    onChange: (stateProvider: StateProvider<State>) => (from: number, to: number) => stateProvider.setState({ from, to }),
    renderRightSection,
  },
  category: 'Other',
};

export default examples;
