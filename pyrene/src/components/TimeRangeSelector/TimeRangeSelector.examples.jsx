import React from 'react';
import moment from 'moment-timezone';
// eslint-disable-next-line no-unused-vars
import classNames from 'classnames';

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

const examples = {
  props: {
    timezone: TIMEZONE,
    lowerBound: moment().tz(TIMEZONE).subtract(1, 'years').valueOf(),
    from: stateProvider => (stateProvider.state.from === undefined ? moment().tz(TIMEZONE).subtract(40, 'days').valueOf() : stateProvider.state.from),
    to: stateProvider => (stateProvider.state.from === undefined ? moment().tz(TIMEZONE).subtract(10, 'days').valueOf() : stateProvider.state.to),
    upperBound: moment().tz(TIMEZONE).valueOf(),
    onChange: stateProvider => (from, to) => stateProvider.setState({ from, to }),
    renderRightSection: renderRightSection,
  },
};

examples.category = 'Other';

export default examples;
