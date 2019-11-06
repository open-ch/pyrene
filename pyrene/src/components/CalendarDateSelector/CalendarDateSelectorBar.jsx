import React from 'react';
import PropTypes from 'prop-types';

import Stepper from '../Stepper/Stepper';
import TimeUnitSelectionPropTypes from './CalendarDateSelectorPropTypes';
import {
  canNavigateBackward,
  canNavigateForward,
} from './CalendarDateSelectorUtils';
import DateHelper from './DateHelper';

import './calendarDateSelector.css';

const TimeUnitSelectionBar = (props) => {
  const {
    onChange,
    disabled,
    value,
    upperBound,
    lowerBound,
    timeUnit,
  } = props;
  return (
    <>
      <Stepper
        direction="left"
        onClick={() => onChange(value, -1)}
        disabled={disabled || !canNavigateBackward(value, lowerBound, timeUnit)}
      />
      <span styleName="timeUnitSelector--timerange-text">
        {DateHelper.formatTimeRangeText(value, timeUnit)}
      </span>
      <Stepper
        direction="right"
        onClick={() => onChange(value, 1)}
        disabled={disabled || !canNavigateForward(value, upperBound, timeUnit)}
      />
    </>
  );
};

TimeUnitSelectionBar.propTypes = {
  disabled: PropTypes.bool.isRequired,
  lowerBound: TimeUnitSelectionPropTypes.YEAR_MONTH_DAY.isRequired,
  onChange: PropTypes.func.isRequired,
  timeUnit: TimeUnitSelectionPropTypes.TIMEUNIT_OPTION.isRequired,
  upperBound: TimeUnitSelectionPropTypes.YEAR_MONTH_DAY.isRequired,
  value: TimeUnitSelectionPropTypes.YEAR_MONTH_DAY.isRequired,
};

export default TimeUnitSelectionBar;
