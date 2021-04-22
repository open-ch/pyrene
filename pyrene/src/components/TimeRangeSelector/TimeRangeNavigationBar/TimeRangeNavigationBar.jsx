import React from 'react';
import PropTypes from 'prop-types';

import { differenceInMinutes } from 'date-fns';


import ArrowSelector from './ArrowSelector/ArrowSelector';

const convertTZ = (date, tzString) => new Date((typeof date === 'string' ? new Date(date) : date).toLocaleString('en-US', { timeZone: tzString }));

const formatDate = (date) => `${(`0${date.getDate()}`).slice(-2)}.${(`0${date.getMonth() + 1}`).slice(-2)}.${date.getFullYear()}, ${(`0${date.getHours()}`).slice(-2)}:${(`0${date.getMinutes()}`).slice(-2)}`;

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
  const localFrom0 = convertTZ(new Date(from), timezone);
  const formatedLocalForm0 = formatDate(localFrom0);

  const localTo0 = convertTZ(new Date(to), timezone);
  const formatedLocalTo0 = formatDate(localTo0);

  return `${formatedLocalForm0} - ${formatedLocalTo0}`;
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
