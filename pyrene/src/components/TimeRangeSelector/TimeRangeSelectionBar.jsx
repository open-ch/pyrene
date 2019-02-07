import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Stepper from '../Stepper/Stepper';
import TimeRangeSelectionPropTypes from './TimeRangeSelectorPropTypes';
import { DateHelper } from './TimeRangeSelectorUtils';

import './timeRangeSelector.css';

const TimeRangeSelectionBar = (props) => {
  const {
    onChange,
    disabled,
    value,
  } = props;
  return (
    <Fragment>
      <Stepper
        direction="left"
        onClick={() => onChange(value, -1)}
        disabled={disabled}
      />
      <span styleName="timeRangeSelector--timerange-text">
        {DateHelper.formatTimeRangeText(value)}
      </span>
      <Stepper
        direction="right"
        onClick={() => onChange(value, 1)}
        disabled={disabled}
      />
    </Fragment>
  );
};

TimeRangeSelectionBar.propTypes = {
  disabled: PropTypes.bool.isRequired,
  lowerBound: TimeRangeSelectionPropTypes.YEAR_MONTH_DAY.isRequired,
  onChange: PropTypes.func.isRequired,
  timerange: TimeRangeSelectionPropTypes.TIMERANGE_OPTION.isRequired,
  upperBound: TimeRangeSelectionPropTypes.YEAR_MONTH_DAY.isRequired,
  value: TimeRangeSelectionPropTypes.YEAR_MONTH_DAY.isRequired,
};

export default TimeRangeSelectionBar;
