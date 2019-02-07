import React from 'react';
import PropTypes from 'prop-types';

import TimeRangeSelectionBar from './TimeRangeSelectionBar';
import TimeRangeSelectionDropdown from './TimeRangeSelectionDropdown';
import TimeRangeSelectionPropTypes from './TimeRangeSelectorPropTypes';
import {
  DATE_TYPES,
  getDateType,
  getCurrentDate,
  handleDateChange,
  handleTypeChange,
} from './TimeRangeSelectorUtils';

import './timeRangeSelector.css';

/**
 * Component for selecting a timeRange and a range forwards and backwards.
 *
 * 'onChange({ year: number, month: number | undefined, day: number | undefined })' callback function can be registered via props, to handle range changes.
 * Timestamps are always in MC time (UTC+1 or UTC+2)
 *
 * Default time ranges are defined as follows:
 * 1 day
 * 1 month
 * 1 year
 */
export default class TimeRangeSelector extends React.Component {

  static DEFAULT_TIME_RANGES = [
    DATE_TYPES.DAY,
    DATE_TYPES.MONTH,
    DATE_TYPES.YEAR,
  ];

  static DEFAULT_LOWER_BOUND = {
    year: 2015,
    month: 1,
    day: 1,
  };

  static defaultProps = {
    isLoading: false,
    lowerBound: TimeRangeSelector.DEFAULT_LOWER_BOUND,
    upperBound: getCurrentDate(),
    timeRanges: TimeRangeSelector.DEFAULT_TIME_RANGES,
    // get current date, but set day as undefined
    value: {
      ...getCurrentDate(),
      day: undefined,
    },
    onRangeChange: () => {},
    renderRightSection: () => {},
  };

  _onNavigate = (value, direction) => {
    const { onRangeChange } = this.props;
    const newDate = handleDateChange(value, direction);
    onRangeChange(newDate);
  };

  _onSelect = (timeRange) => {
    const { onRangeChange, value } = this.props;
    const newDate = handleTypeChange(value, timeRange);
    onRangeChange(newDate);
  };

  render() {
    const {
      isLoading,
      timeRanges,
      lowerBound,
      upperBound,
      value,
      renderRightSection,
    } = this.props;

    const type = getDateType(value);

    return (
      <div>
        <div styleName="timeRangeSelector">
          <div styleName="timeRangeSelector--left">
            <TimeRangeSelectionDropdown
              timeRanges={timeRanges}
              timeRange={type}
              onSelect={this._onSelect}
              disabled={isLoading}
            />
          </div>
          <div styleName="timeRangeSelector--center">
            <TimeRangeSelectionBar
              value={value}
              timeRange={type}
              lowerBound={lowerBound}
              upperBound={upperBound}
              onChange={this._onNavigate}
              disabled={isLoading}
            />
          </div>
          <div styleName="timeRangeSelector--right">
            {renderRightSection()}
          </div>
        </div>
      </div>
    );
  }

}

TimeRangeSelector.displayName = 'TimeRangeSelector';

TimeRangeSelector.propTypes = {
  isLoading: PropTypes.bool,
  lowerBound: TimeRangeSelectionPropTypes.YEAR_MONTH_DAY,
  onRangeChange: PropTypes.func,
  renderRightSection: PropTypes.func,
  timeRanges: TimeRangeSelectionPropTypes.TIMERANGE_OPTIONS,
  upperBound: TimeRangeSelectionPropTypes.YEAR_MONTH_DAY,
  value: TimeRangeSelectionPropTypes.YEAR_MONTH_DAY,
};
