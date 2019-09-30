import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Stepper from '../Stepper/Stepper';
import TimeRangeSelectionPropTypes from './CalendarDateSelectorPropTypes';
import {
  canNavigateBackward,
  canNavigateForward,
} from './CalendarDateSelectorUtils';
import DateHelper from './DateHelper';

import './calendarDateSelector.css';

const TimeRangeSelectionBar = (props) => {
  const {
    onChange,
    disabled,
    value,
    upperBound,
    lowerBound,
    timeRange,
  } = props;
  return (
    <Fragment>
      <Stepper
        direction="left"
        onClick={() => onChange(value, -1)}
        disabled={disabled || !canNavigateBackward(value, lowerBound, timeRange)}
      />
      <span styleName="timeRangeSelector--timerange-text">
        {DateHelper.formatTimeRangeText(value, timeRange)}
      </span>
      <Stepper
        direction="right"
        onClick={() => onChange(value, 1)}
        disabled={disabled || !canNavigateForward(value, upperBound, timeRange)}
      />
    </Fragment>
  );
};

TimeRangeSelectionBar.propTypes = {
  disabled: PropTypes.bool.isRequired,
  lowerBound: TimeRangeSelectionPropTypes.YEAR_MONTH_DAY.isRequired,
  onChange: PropTypes.func.isRequired,
  timeRange: TimeRangeSelectionPropTypes.TIMERANGE_OPTION.isRequired,
  upperBound: TimeRangeSelectionPropTypes.YEAR_MONTH_DAY.isRequired,
  value: TimeRangeSelectionPropTypes.YEAR_MONTH_DAY.isRequired,
};

export default TimeRangeSelectionBar;
