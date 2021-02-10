import React from 'react';
import { getTime, subYears, subDays } from 'date-fns';

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

function renderRightSection() {
  return (
    <div style={wrapperStyle}>
      <span className="pyreneIcon-data" style={fontStyle} />
      <div style={textStyle}>Export</div>
    </div>
  );
}

const TIMEZONE = 'Europe/Zurich';

const todayDateObject = new Date();
const examples = {
  props: {
    timezone: TIMEZONE,
    lowerBound: getTime(subYears(todayDateObject, 1)),
    from: (stateProvider) => (stateProvider.state.from === undefined ? getTime(subDays(todayDateObject, 40)) : stateProvider.state.from),
    to: (stateProvider) => (stateProvider.state.from === undefined ? getTime(subDays(todayDateObject, 10)) : stateProvider.state.to),
    upperBound: getTime(todayDateObject),
    onChange: (stateProvider) => (from, to) => stateProvider.setState({ from, to }),
    renderRightSection: renderRightSection,
  },
};

examples.category = 'Other';

export default examples;
