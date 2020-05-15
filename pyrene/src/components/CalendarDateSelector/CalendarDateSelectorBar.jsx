import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TimeUnitSelectionPropTypes from './CalendarDateSelectorPropTypes';
import {
  canNavigateBackward,
  canNavigateForward,
} from './CalendarDateSelectorUtils';
import DateHelper from './DateHelper';

import styles from './calendarDateSelector.css';
import Icon from '../Icon/Icon';

const TimeUnitSelectionBar = (props) => {
  const {
    onChange,
    disabled,
    value,
    upperBound,
    lowerBound,
    timeUnit,
  } = props;
  const backwardsDisabled = disabled || !canNavigateBackward(value, lowerBound, timeUnit);
  const forwardsDisabled = disabled || !canNavigateForward(value, upperBound, timeUnit);

  const goForward = useCallback(() => {
    onChange(value, 1);
  }, [value]);
  const goBackward = useCallback(() => {
    onChange(value, -1);
  }, [value]);

  return (
    <div styleName="container">
      <div
        styleName="buttonContainer"
        className={classNames({
          [styles.disabled]: backwardsDisabled,
        })}
        onClick={goBackward}
      >
        <Icon
          name="chevronLeft"
          disabled={backwardsDisabled}
          color="neutral500"
        />
      </div>
      <div styleName="border" />
      <div styleName="rangeText">
        {DateHelper.formatTimeRangeText(value, timeUnit)}
      </div>
      <div styleName="border" />
      <div
        styleName="buttonContainer"
        className={classNames({
          [styles.disabled]: forwardsDisabled,
        })}
        onClick={goForward}
      >
        <Icon
          name="chevronRight"
          disabled={forwardsDisabled}
          color="neutral500"
        />
      </div>
    </div>
  )
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
