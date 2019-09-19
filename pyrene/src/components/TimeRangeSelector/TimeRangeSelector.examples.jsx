import moment from 'moment';
import React from 'react';
// eslint-disable-next-line no-unused-vars
import momentTz from 'moment-timezone';
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

const TIMEZONE = 'America/Los_Angeles';

const examples = {
  props: {
    timezone: TIMEZONE,
    lowerBound: moment().tz(TIMEZONE).subtract(1, 'years').valueOf(),
    initialFrom: moment().tz(TIMEZONE).subtract(1, 'years').valueOf(),
    initialTo: moment().tz(TIMEZONE).valueOf(),
    onChange: () => {},
    renderRightSection: renderRightSection,
  },
};

examples.category = 'Other';

export default examples;
