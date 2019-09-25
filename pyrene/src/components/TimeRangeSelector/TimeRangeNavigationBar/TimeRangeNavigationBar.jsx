import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment-timezone';
import TRSStepper from './Components/TRSStepper';
import { syncUpperBound } from '../TimeRangeSelectorHelper';

import './timeRangeNavigationBar.css';

const TimeRangeNavigationBar = props => (
  <div styleName="timeRangeNavigationBar">
    <TRSStepper
      direction="left"
      disabled={
        props.disabled
        || moment(props.from).tz(props.timezone).diff(moment(props.lowerBound).tz(props.timezone), 'minutes') <= 0 // We should not check for milliseconds but minutes changes
      }
      onClick={() => {
        const nowUpperBound = syncUpperBound(props.defaultUpperBound, props.upperBound, props.timezone);
        const durationInMs = props.durationInMs;
        const newFrom = (props.from - durationInMs) < props.lowerBound ? props.lowerBound : props.from - durationInMs;
        const newTo = (props.to - durationInMs) - newFrom < durationInMs ? newFrom + durationInMs : props.to - durationInMs; // Keep the selected timespan duration if we reach a bound
        props.onNavigate(newFrom, newTo, nowUpperBound);
      }}
    />
    <div styleName="navigationContentOuter">
      <div styleName="navigationContentInner">
        {TimeRangeNavigationBar.renderCurrentTimeRange(props)}
      </div>
    </div>
    <TRSStepper
      direction="right"
      disabled={
        props.disabled
        || moment(props.to).tz(props.timezone).diff(moment(props.upperBound).tz(props.timezone), 'minutes').valueOf() >= 0 // We should not check for milliseconds but minutes changes
      }
      onClick={() => {
        const nowUpperBound = syncUpperBound(props.defaultUpperBound, props.upperBound, props.timezone);
        const durationInMs = props.durationInMs;
        const newTo = (props.to + durationInMs) > nowUpperBound ? nowUpperBound : props.to + durationInMs;
        const newFrom = (props.from + durationInMs) - newTo < durationInMs ? newTo - durationInMs : props.from + durationInMs; // Keep the selected timespan duration if we reach a bound
        props.onNavigate(newFrom, newTo, nowUpperBound);
      }}
    />
  </div>
);

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
  upperBound: null,
  defaultUpperBound: null,
};

TimeRangeNavigationBar.propTypes = {
  defaultUpperBound: PropTypes.number,
  disabled: PropTypes.bool,
  durationInMs: PropTypes.number.isRequired,
  from: PropTypes.number.isRequired,
  lowerBound: PropTypes.number.isRequired,
  onNavigate: PropTypes.func.isRequired,
  timezone: PropTypes.string.isRequired,
  to: PropTypes.number.isRequired,
  upperBound: PropTypes.number,
};

export default TimeRangeNavigationBar;
