import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
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
   * @param currentTimeRangeType    the type of the timerange that was selected
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

  /**
   * Changes the state of the timerange selector based on the interactions with the navigation bar
   * @private
   */
  _onNavigateBack() {
    // Check if it is currently having a preset time range; if yes, we should preserve the current durationInMs
    const foundTimeRangeType = this.props.presetTimeRanges.find((preset) => preset.durationInMs === this.state.durationInMs);
    if (foundTimeRangeType) {
      this.setState({ preserveDuration: true });
    }
    const fromDiff = moment(this.props.from).tz(this.props.timezone).subtract(this.state.durationInMs).valueOf();
    const toDiff = moment(this.props.to).tz(this.props.timezone).subtract(this.state.durationInMs).valueOf();
    const newFrom = Math.max(fromDiff, this.props.lowerBound);
    const newTo = moment(toDiff).tz(this.props.timezone).subtract(newFrom).valueOf() < this.state.durationInMs ? moment(newFrom).tz(this.props.timezone).add(this.state.durationInMs).valueOf() : toDiff;
    return this.props.onChange(newFrom, Math.min(newTo, this.props.upperBound));
  }

  /**
   * Changes the state of the timerange selector based on the interactions with the navigation bar
   * @private
   */
  _onNavigateForward() {
    // Check if it is currently having a preset time range; if yes, we should preserve the current durationInMs
    const foundTimeRangeType = this.props.presetTimeRanges.find((preset) => preset.durationInMs === this.state.durationInMs);
    if (foundTimeRangeType) {
      this.setState({ preserveDuration: true });
    }
    const toDiff = moment(this.props.to).tz(this.props.timezone).add(this.state.durationInMs).valueOf();
    const fromDiff = moment(this.props.from).tz(this.props.timezone).add(this.state.durationInMs).valueOf();
    const newTo = Math.min(toDiff, this.props.upperBound);
    const newFrom = moment(newTo).tz(this.props.timezone).subtract(fromDiff).valueOf() < this.state.durationInMs ? moment(newTo).tz(this.props.timezone).subtract(this.state.durationInMs).valueOf() : fromDiff; // Keep the selected timespan duration if we reach a bound
    return this.props.onChange(Math.max(newFrom, this.props.lowerBound), newTo);
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
            onNavigateBack={this._onNavigateBack}
            onNavigateForward={this._onNavigateForward}
            upperBound={this.props.upperBound}
            timezone={this.props.timezone}
          />
        </div>
        <div styleName="timeRangeSelector--right">
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
