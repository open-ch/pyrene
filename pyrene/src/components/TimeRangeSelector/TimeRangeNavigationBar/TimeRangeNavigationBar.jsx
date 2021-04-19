import React from 'react';
import PropTypes from 'prop-types';

import { differenceInMinutes, getTime, format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';


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

TimeRangeNavigationBar.renderCurrentTimeRange = (from, to, timezone) => {
  const localFrom = getTime(utcToZonedTime(new Date(from), timezone));
  const localTo = getTime(utcToZonedTime(new Date(to), timezone));
  const pattern = 'dd.MM.yyyy, HH:mm';

  return `${format(localFrom, pattern)} - ${format(localTo, pattern)}`;
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
