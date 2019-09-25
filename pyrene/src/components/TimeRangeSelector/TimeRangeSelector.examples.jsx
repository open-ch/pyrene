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
    initialFrom: moment().tz(TIMEZONE).subtract(40, 'days').valueOf(),
    initialTo: moment().tz(TIMEZONE).subtract(10, 'days').valueOf(),
    onChange: () => {},
    renderRightSection: renderRightSection,
  },
};

examples.category = 'Other';

export default examples;
