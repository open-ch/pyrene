import moment from 'moment';
import React from 'react';
import momentTz from 'moment-timezone';
import classNames from 'classnames';

const examples = {
  props: {
    timezone: 'America/Los_Angeles',
    lowerBound: moment().tz('America/Los_Angeles').subtract(1, 'years').valueOf(),
    initialFrom: moment().tz('America/Los_Angeles').subtract(1, 'years').valueOf(),
    initialTo: moment().valueOf(),
    onChange: () => {},
    renderRightSection: renderRightSection,
  },
};

function renderRightSection() {
  return (
    <div>
      <span className={'pyreneIcon-data'}/>
      Export Data
    </div>
  );
}

examples.category = 'Other';

export default examples;