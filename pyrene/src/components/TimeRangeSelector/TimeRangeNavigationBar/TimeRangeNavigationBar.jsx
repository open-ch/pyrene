import React from 'react';
import PropTypes from 'prop-types';

import { differenceInMinutes } from 'date-fns';
import { zonedTimeToUtc, format, utcToZonedTime } from 'date-fns-tz';

import ArrowSelector from './ArrowSelector/ArrowSelector';

const TimeRangeNavigationBar = (props) => {
  const fromUtcDate = zonedTimeToUtc(new Date(props.from), props.timezone);
  const lowerBoundUtcDate = zonedTimeToUtc(new Date(props.lowerBound), props.timezone);
  // We should not check for milliseconds but minutes changes
  const backInactive = differenceInMinutes(fromUtcDate, lowerBoundUtcDate) <= 0;

  const toUtcDate = zonedTimeToUtc(new Date(props.to), props.timezone);
  const upperBoundUtcDate = zonedTimeToUtc(new Date(props.upperBound), props.timezone);
  // We should not check for milliseconds but minutes changes
  const forwardInactive = differenceInMinutes(toUtcDate, upperBoundUtcDate) >= 0;

  return (
    <ArrowSelector
      label={TimeRangeNavigationBar.renderCurrentTimeRange(props)}
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
TimeRangeNavigationBar.renderCurrentTimeRange = (currProps) => {
  const fromZonedDate = utcToZonedTime(currProps.from, currProps.timezone);
  const toZonedDate = utcToZonedTime(currProps.to, currProps.timezone);
  const dateFormat = 'dd.MM.yyyy, HH:mm';
  return `${format(fromZonedDate, dateFormat)} - ${format(toZonedDate, dateFormat)}`;
};

TimeRangeNavigationBar.displayName = 'TimeRangeNavigationBar';

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
