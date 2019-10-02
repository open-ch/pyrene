import React from 'react';
import PropTypes from 'prop-types';

import CalendarDateSelectorBar from './CalendarDateSelectorBar';
import CalendarDateSelectorDropdown from './CalendarDateSelectorDropdown';
import CalendarDateSelectorPropTypes from './CalendarDateSelectorPropTypes';
import {
  DATE_TYPES,
  getCurrentDate,
  handleDateChange,
} from './CalendarDateSelectorUtils';

import './calendarDateSelector.css';

/**
 * Component for selecting a timeRange and a range forwards and backwards.
 *
 * 'onChange({ year: number, month: number | undefined, day: number | undefined })' callback function can be registered via props, to handle range changes.
 *
 * Time ranges are defined as follows:
 * 1. Year - { year }
 * 2. Month - { year, month }
 * 3. Day - { year, month, day }
 */
export default class CalendarDateSelector extends React.Component {

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

  static TIMERANGES = CalendarDateSelector.DEFAULT_TIME_RANGES;

  static defaultProps = {
    isLoading: false,
    lowerBound: CalendarDateSelector.DEFAULT_LOWER_BOUND,
    upperBound: getCurrentDate(),
    // get current date, but set day as undefined
    value: {
      ...getCurrentDate(),
    },
    onChange: () => {},
    renderRightSection: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      type: CalendarDateSelector.TIMERANGES[1],
    };
  }

  _onNavigate = (value, direction) => {
    const { onChange } = this.props;
    const newDate = handleDateChange(value, direction, this.state.type);
    onChange(newDate);
  };

  _onSelect = (timeRange) => {
    this.setState({ type: timeRange });
  };

  render() {
    const {
      isLoading,
      lowerBound,
      upperBound,
      value,
      renderRightSection,
    } = this.props;

    const type = this.state.type;

    return (
      <div styleName="timeRangeSelector">
        <div styleName="timeRangeSelector--left">
          <div styleName="timeRangeSelector__dropdown">
            <CalendarDateSelectorDropdown
              timeRanges={CalendarDateSelector.TIMERANGES}
              timeRange={type}
              onSelect={this._onSelect}
              disabled={isLoading}
            />
          </div>
        </div>
        <div styleName="timeRangeSelector--center">
          <CalendarDateSelectorBar
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
    );
  }

}

CalendarDateSelector.displayName = 'Calendar Date Selector';

CalendarDateSelector.propTypes = {
  isLoading: PropTypes.bool,
  lowerBound: CalendarDateSelectorPropTypes.YEAR_MONTH_DAY,
  onChange: PropTypes.func,
  renderRightSection: PropTypes.func,
  upperBound: CalendarDateSelectorPropTypes.YEAR_MONTH_DAY,
  value: CalendarDateSelectorPropTypes.YEAR_MONTH_DAY,
};
