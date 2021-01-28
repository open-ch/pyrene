import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  addMilliseconds, subMilliseconds, getTime, differenceInMilliseconds,
} from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import classNames from 'classnames';
import PresetTimeRanges from './PresetTimeRanges/PresetTimeRanges';
import TimeRangeNavigationBar from './TimeRangeNavigationBar/TimeRangeNavigationBar';
import PRESET_TIME_RANGES from './TimeRangeSelectorDefaultProps';
import './timeRangeSelector.css';

/**
 * TimeRangeSelectors are used to provide a certain timerange within a lower and upper limit and change it via timesteps.
 *
 * Default time ranges are defined as follows:
 * 24 hours
 * 7 days
 * 30 days
 * 1 year
 */
export default class TimeRangeSelector extends Component {

  constructor(props) {
    super(props);

    const durationInMs = (props.to - props.from) - ((props.to - props.from) % 10); // calculate the duration of the timerange minus rounding errors

    this.state = {
      durationInMs: durationInMs,
      preserveDuration: false,
    };

    this._onPresetTimeRangeSelected = this._onPresetTimeRangeSelected.bind(this);
    this._preserveDurationForNavigation = this._preserveDurationForNavigation.bind(this);
    this._onNavigateBack = this._onNavigateBack.bind(this);
    this._onNavigateForward = this._onNavigateForward.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.to - props.from !== state.durationInMs && !state.preserveDuration) {
      const newDuration = (props.to - props.from) - ((props.to - props.from) % 10);
      return { durationInMs: newDuration };
    }
    if (state.preserveDuration) {
      return { preserveDuration: false };
    }
    return null;
  }

  /**
   * Updates the from/to limits, the upperbound and the current preset settings when a preset is selected
   * @param newFrom                 the new from value in epoch milliseconds
   * @param newTo                   the new to value in epoch milliseconds
   * @param newUpperBound           the new value of the upperbound synced accordingly
   * @param durationInMs            the duration of the timerange based on the selected preset
   * @private
   */
  _onPresetTimeRangeSelected(newFrom, newTo, newUpperBound, durationInMs) {
    this.setState({
      durationInMs: durationInMs, // We need to store it, otherwise if we reach the lower/upper bound we will start to use less milliseconds with the steppers
    },
    () => {
      this.props.onChange(newFrom, newTo);
    });
  }

  _onNavigateBack() {
    // Use timezone to do time subtraction prevents DST problem
    const utcFromDate = zonedTimeToUtc(new Date(this.props.from), this.props.timezone);
    const fromDiff = subMilliseconds(utcFromDate, this.state.durationInMs);

    const utcToDate = zonedTimeToUtc(new Date(this.props.to), this.props.timezone);
    const toDiff = subMilliseconds(utcToDate, this.state.durationInMs);

    const newFrom = Math.max(getTime(fromDiff), this.props.lowerBound);

    // Keep the selected timespan duration if we reach a bound
    const newTo = differenceInMilliseconds(toDiff, newFrom) < this.state.durationInMs
      ? addMilliseconds(newFrom, this.state.durationInMs)
      : toDiff;
    return this.props.onChange(newFrom, Math.min(getTime(newTo), this.props.upperBound));
  }

  _onNavigateForward() {
    // Use timezone to do time subtraction prevents DST problem
    const utcFromDate = zonedTimeToUtc(new Date(this.props.from), this.props.timezone);
    const fromDiff = addMilliseconds(utcFromDate, this.state.durationInMs);

    const utcToDate = zonedTimeToUtc(new Date(this.props.to), this.props.timezone);
    const toDiff = addMilliseconds(utcToDate, this.state.durationInMs);

    const newTo = Math.min(getTime(toDiff), this.props.upperBound);

    // Keep the selected timespan duration if we reach a bound
    const newFrom = differenceInMilliseconds(newTo, fromDiff) < this.state.durationInMs
      ? addMilliseconds(newTo, this.state.durationInMs)
      : fromDiff;
    return this.props.onChange(Math.max(getTime(newFrom), this.props.lowerBound), newTo);
  }

  /**
   * Checks whether the component has a preset timerange selected when navigating; if yes, we should preserve the current durationInMs.
   * @private
   */
  _preserveDurationForNavigation(navigateCallback) {
    const foundTimeRangeType = this.props.presetTimeRanges.find((preset) => preset.durationInMs === this.state.durationInMs);
    if (foundTimeRangeType) {
      this.setState({ preserveDuration: true }, () => {
        navigateCallback();
      });
    } else {
      navigateCallback();
    }
  }

  render() {
    let currentTimeRangeType = this.props.presetTimeRanges.find((preset) => preset.durationInMs === this.state.durationInMs); // Try to find if the timerange matches an initial preset
    currentTimeRangeType = currentTimeRangeType ? currentTimeRangeType.id : ''; // If we found a match, then let's use the id of the preset, otherwise no default preset has to be selected

    return (
      <div styleName={classNames('timeRangeSelector', { disabled: this.props.disabled })}>
        <div styleName="timeRangeSelector--left">
          <PresetTimeRanges
            disabled={this.props.disabled}
            lowerBound={this.props.lowerBound}
            onInteract={this._onPresetTimeRangeSelected}
            currentTimeRangeType={currentTimeRangeType}
            presetTimeRanges={this.props.presetTimeRanges}
            upperBound={this.props.upperBound}
            timezone={this.props.timezone}
          />
        </div>
        <div styleName="timeRangeSelector--center">
          <TimeRangeNavigationBar
            disabled={this.props.disabled}
            to={this.props.to}
            from={this.props.from}
            lowerBound={this.props.lowerBound}
            onNavigateBack={() => this._preserveDurationForNavigation(this._onNavigateBack)}
            onNavigateForward={() => this._preserveDurationForNavigation(this._onNavigateForward)}
            upperBound={this.props.upperBound}
            timezone={this.props.timezone}
          />
        </div>
        <div styleName={classNames('timeRangeSelector--right', { disabled: this.props.disabled })}>
          {this.props.renderRightSection()}
        </div>
      </div>
    );
  }

}

TimeRangeSelector.displayName = 'Time Range Selector';

TimeRangeSelector.defaultProps = {
  disabled: false,
  presetTimeRanges: PRESET_TIME_RANGES,
  renderRightSection: () => {},
};

TimeRangeSelector.propTypes = {
  /**
   * Whether or not the component is disabled
   * Type: boolean
   */
  disabled: PropTypes.bool,
  /**
   * The start value of the range in epoch milliseconds
   * Type: number (required)
   */
  from: PropTypes.number.isRequired,
  /**
   * The oldest queryable starting time point, in epoch milliseconds
   * Type: number (required)
   */
  lowerBound: PropTypes.number.isRequired,
  /**
   * Callback function passed by parent page (usually a GET request to fetch new data)
   * Type: function(from: number, to: number) (required)
   */
  onChange: PropTypes.func.isRequired,
  /**
   * The preset time ranges to display as preset buttons
   * Type: [{ id: string (required) the id of the preset, label: string (required) label of the preset button displayed to the user, durationInMs: number (required) the duration of the timerange in epoch ms }]
   */
  presetTimeRanges: PropTypes.arrayOf(
    PropTypes.shape({
      durationInMs: PropTypes.number.isRequired,
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ),
  /**
   * Function called if there is some element to be rendered on the rightmost side
   * Type: function
   */
  renderRightSection: PropTypes.func,
  /**
   * The timezone that the range selector should use to display the time
   * Type: string (required)
   */
  timezone: PropTypes.string.isRequired,
  /**
   * The end value of the range to in epoch milliseconds
   * Type: number (required)
   */
  to: PropTypes.number.isRequired,
  /**
   * The latest queryable ending time point, in epoch milliseconds
   * Type: number
   */
  upperBound: PropTypes.number.isRequired,
};
