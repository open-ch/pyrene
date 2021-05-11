import React from 'react';
import PropTypes from 'prop-types';

import CalendarDateSelectorDropdown from './CalendarDateSelectorDropdown';
import CalendarDateSelectorPropTypes from './CalendarDateSelectorPropTypes';
import {
  canNavigateBackward, canNavigateForward,
  DATE_TYPES,
  getCurrentDate,
  handleDateChange,
} from './CalendarDateSelectorUtils';

import styles from './calendarDateSelector.css';
import ArrowSelector from '../TimeRangeSelector/TimeRangeNavigationBar/ArrowSelector/ArrowSelector';
import DateHelper from './DateHelper';

/**
 * Component for selecting a timeUnit and a range forwards and backwards.
 *
 * 'onChange({ year: number, month: number | undefined, day: number | undefined }, timeUnit)' callback function can be registered via props, to handle range changes.
 *
 * Time units are defined as follows:
 * year, month, day
 */
export default class CalendarDateSelector extends React.Component {

  static DEFAULT_LOWER_BOUND = {
    year: 2015,
    month: 1,
    day: 1,
  };

  static DEFAULT_TIME_UNITS = [
    DATE_TYPES.DAY,
    DATE_TYPES.MONTH,
    DATE_TYPES.YEAR,
  ];

  _onNavigate = (value, direction) => {
    const { onChange, timeUnit } = this.props;
    const newDate = handleDateChange(value, direction, timeUnit);
    onChange(newDate, timeUnit);
  };

  _onSelect = (timeUnit) => {
    const { onChange, value } = this.props;
    onChange(value, timeUnit);
  };

  render() {
    const {
      isLoading,
      timeUnits,
      timeUnit,
      lowerBound,
      upperBound,
      value,
      renderRightSection,
    } = this.props;

    return (
      <div className={styles.timeUnitSelector}>
        <div className={styles['timeUnitSelector--left']}>
          <CalendarDateSelectorDropdown
            timeUnits={timeUnits}
            timeUnit={timeUnit}
            onSelect={this._onSelect}
            disabled={isLoading}
          />
        </div>
        <div className={styles['timeUnitSelector--center']}>
          <ArrowSelector
            label={DateHelper.formatTimeRangeText(value, timeUnit)}
            onNavigateForward={() => this._onNavigate(value, 1)}
            backInactive={isLoading || !canNavigateBackward(value, lowerBound, timeUnit)}
            forwardInactive={isLoading || !canNavigateForward(value, upperBound, timeUnit)}
            onNavigateBack={() => this._onNavigate(value, -1)}
            disabled={isLoading}
            innerWidth={136}
          />
        </div>
        <div className={styles['timeUnitSelector--right']}>
          {renderRightSection()}
        </div>
      </div>
    );
  }

}

CalendarDateSelector.displayName = 'Calendar Date Selector';

CalendarDateSelector.propTypes = {
  isLoading: PropTypes.bool,
  lowerBound: CalendarDateSelectorPropTypes.YEAR_MONTH_DAY,
  onChange: PropTypes.func,
  renderRightSection: PropTypes.func,
  timeUnit: CalendarDateSelectorPropTypes.TIMEUNIT_OPTION.isRequired,
  timeUnits: CalendarDateSelectorPropTypes.TIMEUNIT_OPTIONS,
  upperBound: CalendarDateSelectorPropTypes.YEAR_MONTH_DAY,
  value: CalendarDateSelectorPropTypes.YEAR_MONTH_DAY,
};

CalendarDateSelector.defaultProps = {
  isLoading: false,
  lowerBound: CalendarDateSelector.DEFAULT_LOWER_BOUND,
  upperBound: getCurrentDate(),
  timeUnits: CalendarDateSelector.DEFAULT_TIME_UNITS,
  value: {
    ...getCurrentDate(),
  },
  onChange: () => {},
  renderRightSection: () => {},
};
