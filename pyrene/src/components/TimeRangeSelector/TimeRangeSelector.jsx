import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
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

    const realUpperBound = props.upperBound === null ? moment().tz(props.timezone).seconds(0).valueOf() : props.upperBound;
    const durationInMs = props.initialTo - props.initialFrom;
    let initialTimeRangeType = props.presetTimeRanges.find(preset => preset.durationInMs === durationInMs); // Try to find if the timerange matches an initial preset
    initialTimeRangeType = initialTimeRangeType ? initialTimeRangeType.id : ''; // If we found a match, then let's use the id of the preset, otherwise no default preset has to be selected

    this.state = {
      from: props.initialFrom >= this.props.lowerBound ? props.initialFrom : this.props.lowerBound,
      to: props.initialTo <= realUpperBound ? props.initialTo : realUpperBound,
      durationInMs: durationInMs,
      currentTimeRangeType: initialTimeRangeType,
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
  /**
   * Whether or not the component is disabled
   * Type: boolean
   */
  disabled: PropTypes.bool,
  /**
   * The initial value to start the range from in epoch milliseconds
   * Type: number (required)
   */
  initialFrom: PropTypes.number.isRequired,
  /**
   * The initial value to end the range to in epoch milliseconds
   * Type: number (required)
   */
  initialTo: PropTypes.number.isRequired,
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
   * The latest queryable ending time point, in epoch milliseconds
   * Type: number defaults to null if not provided and in such case will update itself to 'now' as time passes
   */
  upperBound: PropTypes.number,
};
