import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
// eslint-disable-next-line no-unused-vars
import momentTz from 'moment-timezone';
import PresetTimeRanges from './PresetTimeRanges/PresetTimeRanges';
import TimeRangeNavigationBar from './TimeRangeNavigationBar/TimeRangeNavigationBar';
import DefaultProps from './TimeRangeSelectorDefaultProps';

import './timeRangeSelector.css';

/**
 * TimeRangeSelectors are used to limit the data to a certain timerange within a lower and upper limit. Comes with default time presets and allows users to define custom ones.
 *
 */
export default class TimeRangeSelector extends React.Component {

  constructor(props) {
    super(props);
    const realUpperBound = this.props.upperBound === null ? moment().tz(this.props.timezone).seconds(0).valueOf() : this.props.upperBound;
    this.state = {
      from: props.initialFrom >= this.props.lowerBound ? props.initialFrom : this.props.lowerBound,
      to: props.initialTo <= realUpperBound ? props.initialTo : realUpperBound,
      durationInMs: props.initialTo - props.initialFrom,
      currentTimeRangeType: '',
      upperBound: realUpperBound, // In case of default value, the upper bound is NOW.
    };
  }

  /**
   * Updates the from/to limits, the upperbound and the stepper ranges based on the selected preset
   * @param selectedElement the presetTimeRange element that has been selected
   */
  onPresetTimeRangeSelected(selectedElement) {
    const selectedPresetTimeRange = this.props.presetTimeRanges.filter(preset => preset.id === selectedElement.currentTarget.id).shift();

    this.setState((previousState) => {
      const nowUpperBound = this._syncUpperBound(previousState.upperBound);
      return {
        from: nowUpperBound - selectedPresetTimeRange.durationInMs,
        to: nowUpperBound,
        durationInMs: selectedPresetTimeRange.durationInMs, // We need to store it, otherwise if we reach the lower/upper bound we will start to use less milliseconds with the steppers
        currentTimeRangeType: selectedPresetTimeRange.id,
        upperBound: nowUpperBound,
      };
    });
    this.props.onChange(selectedPresetTimeRange.from, selectedPresetTimeRange.to);
  }

  /**
   * Steps backwards in time based on the current configuration, updating the upperbound if necessary
   */
  onNavigateBack() {
    this.setState((previousState) => {
      const durationInMs = previousState.durationInMs;
      const newFrom = (previousState.from - durationInMs) < this.props.lowerBound ? this.props.lowerBound : previousState.from - durationInMs;
      const newTo = (previousState.to - durationInMs) - newFrom < durationInMs ? newFrom + durationInMs : previousState.to - durationInMs; // Keep the selected timespan duration if we reach a bound

      return {
        from: newFrom,
        to: newTo,
        upperBound: this._syncUpperBound(previousState.upperBound),
      };
    });
    this.props.onChange(this.state.from, this.state.to);
  }

  /**
   * Steps forward in time based on the current configuration, updating the upperbound if necessary
   */
  onNavigateForward() {
    this.setState((previousState) => {
      const nowUpperBound = this._syncUpperBound(previousState.upperBound);
      const durationInMs = previousState.durationInMs;
      const newTo = (previousState.to + durationInMs) > nowUpperBound ? nowUpperBound : previousState.to + durationInMs;
      const newFrom = (previousState.from + durationInMs) - newTo < durationInMs ? newTo - durationInMs : previousState.from + durationInMs; // Keep the selected timespan duration if we reach a bound

      return {
        from: newFrom,
        to: newTo,
        upperBound: nowUpperBound,
      };
    });
    this.props.onChange(this.state.from, this.state.to);
  }

  /**
   * If the upperbound is set as default, then we need to update it to NOW based on the timezone.
   * @param state
   * @returns {number} updated upperbound in milliseconds
   * @private
   */
  _syncUpperBound(currentUpperBound) {
    return this.props.upperBound === null ? moment().tz(this.props.timezone).seconds(0).valueOf() : currentUpperBound; // 0 seconds to switch immediately after minute ticks
  }

  render() {
    return (
      <div styleName="timeRangeSelector">
        <div styleName="timeRangeSelector--left">
          <PresetTimeRanges {...this.props} onClick={element => this.onPresetTimeRangeSelected(element)} currentTimeRangeType={this.state.currentTimeRangeType} />
        </div>
        <div styleName="timeRangeSelector--center">
          <TimeRangeNavigationBar
            {...this.props}
            to={this.state.to}
            from={this.state.from}
            onNavigateBack={() => this.onNavigateBack()}
            onNavigateForward={() => this.onNavigateForward()}
            upperBound={this.state.upperBound}
          />
        </div>
        <div styleName="timeRangeSelector--right">
          {this.props.renderRightSection()}
        </div>
      </div>
    );
  }

}

TimeRangeSelector.displayName = 'TimeRangeSelector';

TimeRangeSelector.defaultProps = {
  disabled: false,
  upperBound: null,
  presetTimeRanges: DefaultProps.PRESET_TIME_RANGES,
  renderRightSection: () => {},
};

TimeRangeSelector.propTypes = {
  disabled: PropTypes.bool,
  initialFrom: PropTypes.number.isRequired,
  initialTo: PropTypes.number.isRequired,
  lowerBound: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  presetTimeRanges: PropTypes.arrayOf(
    PropTypes.shape({
      durationInMs: PropTypes.number.isRequired,
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ),
  renderRightSection: PropTypes.func,
  timezone: PropTypes.string.isRequired,
  upperBound: PropTypes.number,
};
