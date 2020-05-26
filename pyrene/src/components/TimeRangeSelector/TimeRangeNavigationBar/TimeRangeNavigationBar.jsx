import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';

import ArrowSelector from './ArrowSelector/ArrowSelector';

const TimeRangeNavigationBar = (props) => {
  const backInactive = moment(props.from).tz(props.timezone).diff(moment(props.lowerBound).tz(props.timezone), 'minutes') <= 0; // We should not check for milliseconds but minutes changes
  const forwardInactive = moment(props.to).tz(props.timezone).diff(moment(props.upperBound).tz(props.timezone), 'minutes').valueOf() >= 0; // We should not check for milliseconds but minutes changes

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
  const fromMoment = moment(currProps.from).tz(currProps.timezone);
  const toMoment = moment(currProps.to).tz(currProps.timezone);
  const dateFormat = 'DD.MM.YYYY, HH:mm';
  return `${fromMoment.format(dateFormat)} - ${toMoment.format(dateFormat)}`;
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
