import React from 'react';
import PropTypes from 'prop-types';

import { differenceInMinutes } from 'date-fns';

import ArrowSelector from './ArrowSelector/ArrowSelector';

const TimeRangeNavigationBar = (props) => {
  // We should not check for milliseconds but minutes changes
  const backInactive = differenceInMinutes(props.from, props.lowerBound) <= 0;

  // We should not check for milliseconds but minutes changes
  const forwardInactive = differenceInMinutes(props.to, props.upperBound) >= 0;

  return (
    <ArrowSelector
      label={TimeRangeNavigationBar.renderCurrentTimeRange(props.from, props.to, props.timezone)}
      onNavigateForward={props.onNavigateForward}
      backInactive={backInactive}
      forwardInactive={forwardInactive}
      onNavigateBack={props.onNavigateBack}
      disabled={props.disabled}
      innerWidth={248}
    />
  );
};

/* eslint-disable-next-line react/display-name */
TimeRangeNavigationBar.renderCurrentTimeRange = (from, to, timezone) => {

  const locale = new Intl.DateTimeFormat('de', {
    timeZone: timezone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',
  });

  return `${locale.format(from)} - ${locale.format(to)}`;
};

TimeRangeNavigationBar.defaultProps = {
  disabled: false,
};

TimeRangeNavigationBar.propTypes = {
  disabled: PropTypes.bool,
  from: PropTypes.number.isRequired,
  lowerBound: PropTypes.number.isRequired,
  onNavigateBack: PropTypes.func.isRequired,
  onNavigateForward: PropTypes.func.isRequired,
  timezone: PropTypes.string.isRequired,
  to: PropTypes.number.isRequired,
  upperBound: PropTypes.number.isRequired,
};

export default TimeRangeNavigationBar;
