import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
// eslint-disable-next-line no-unused-vars
import momentTz from 'moment-timezone';
import SVG from 'react-svg-inline';
import Stepper from '../../Stepper/Stepper';
import calendarIcon from './calendar.svg';

import './timeRangeNavigationBar.css';


const TimeRangeNavigationBar = props => (
  <div styleName="timeRangeNavigationBar">
    <Stepper
      direction="left"
      disabled={
        props.disabled
        || moment(props.from).tz(props.timezone).diff(moment(props.lowerBound).tz(props.timezone), 'minutes') <= 0
      }
      onClick={props.onNavigateBack}
    />
    <SVG svg={calendarIcon} styleName="calendarIcon" fill="#6b7282" />
    {TimeRangeNavigationBar.renderCurrentTimeRange(props)}
    <Stepper
      direction="right"
      disabled={
        props.disabled
        || (props.upperBound !== 0 && props.to >= props.upperBound)
        || (props.upperBound === 0 && moment(props.to).tz(props.timezone).diff(moment().tz(props.timezone), 'minutes').valueOf() >= 0) // We should not check for milliseconds for the upperbound
      }
      onClick={props.onNavigateForward}
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
