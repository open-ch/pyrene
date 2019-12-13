import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment-timezone';
import TRSStepper from './Components/TRSStepper';

import './timeRangeNavigationBar.css';

const TimeRangeNavigationBar = (props) => {
  const backInactive = moment(props.from).tz(props.timezone).diff(moment(props.lowerBound).tz(props.timezone), 'minutes') <= 0; // We should not check for milliseconds but minutes changes
  const forwardInactive = moment(props.to).tz(props.timezone).diff(moment(props.upperBound).tz(props.timezone), 'minutes').valueOf() >= 0; // We should not check for milliseconds but minutes changes

  return (
    <div styleName="timeRangeNavigationBar">
      <TRSStepper
        direction="left"
        disabled={props.disabled}
        inactive={backInactive}
        onClick={(props.disabled || backInactive) ? () => {} : props.onNavigateBack}
      />
      <div styleName="navigationContentOuter">
        <div styleName="navigationContentInner">
          {TimeRangeNavigationBar.renderCurrentTimeRange(props)}
        </div>
      </div>
      <TRSStepper
        direction="right"
        disabled={props.disabled}
        inactive={forwardInactive}
        onClick={(props.disabled || forwardInactive) ? () => {} : props.onNavigateForward}
      />
    </div>
  );
};

/* eslint-disable-next-line react/display-name */
TimeRangeNavigationBar.renderCurrentTimeRange = (currProps) => {
  const fromMoment = moment(currProps.from).tz(currProps.timezone);
  const toMoment = moment(currProps.to).tz(currProps.timezone);
  const dateFormat = 'DD.MM.YYYY, HH:mm';
  const timeString = `${fromMoment.format(dateFormat)} - ${toMoment.format(dateFormat)}`;
  return (<div styleName={classNames('timeRange', { disabled: currProps.disabled })}>{timeString}</div>);
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
