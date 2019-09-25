import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import PresetTimeRanges from './PresetTimeRanges/PresetTimeRanges';
import TimeRangeNavigationBar from './TimeRangeNavigationBar/TimeRangeNavigationBar';
import { PRESET_TIME_RANGES } from './TimeRangeSelectorHelper';

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

    this._onPresetTimeRangeSelected = this._onPresetTimeRangeSelected.bind(this);
    this._onNavigate = this._onNavigate.bind(this);
  }

  /**
   * Updates the from/to limits, the upperbound and the stepper ranges when a preset is selected
   * @param newFrom                 the new from value in epoch milliseconds
   * @param newTo                   the new to value in epoch milliseconds
   * @param newUpperBound           the new value of the upperbound synced accordingly
   * @param durationInMs            the duration of the timerange based on the selected preset
   * @param currentTimeRangeType    the type of the timerange that was selected
   * @private
   */
  _onPresetTimeRangeSelected(newFrom, newTo, newUpperBound, durationInMs, currentTimeRangeType) {
    this.setState({
      from: newFrom,
      to: newTo,
      durationInMs: durationInMs, // We need to store it, otherwise if we reach the lower/upper bound we will start to use less milliseconds with the steppers
      currentTimeRangeType: currentTimeRangeType,
      upperBound: newUpperBound,
    },
    () => {
      this.props.onChange(newFrom, newTo);
    });
  }

  /**
   * Changes the state of the timerange selector based on the interactions with the navigation bar
   * @param newFrom       the new from value in epoch milliseconds
   * @param newTo         the new to value in epoch milliseconds
   * @param newUpperBound the new value of the upperbound synced accordingly
   * @private
   */
  _onNavigate(newFrom, newTo, newUpperBound) {
    this.setState({
      from: newFrom,
      to: newTo,
      upperBound: newUpperBound,
    }, () => {
      this.props.onChange(this.state.from, this.state.to);
    });
  }

  render() {
    return (
      <div styleName="timeRangeSelector">
        <div styleName="timeRangeSelector--left">
          <PresetTimeRanges
            disabled={this.props.disabled}
            onInteract={this._onPresetTimeRangeSelected}
            currentTimeRangeType={this.state.currentTimeRangeType}
            presetTimeRanges={this.props.presetTimeRanges}
            defaultUpperBound={this.props.upperBound}
            upperBound={this.state.upperBound}
            timezone={this.props.timezone}
          />
        </div>
        <div styleName="timeRangeSelector--center">
          <TimeRangeNavigationBar
            disabled={this.props.disabled}
            durationInMs={this.state.durationInMs}
            to={this.state.to}
            from={this.state.from}
            lowerBound={this.props.lowerBound}
            onNavigate={this._onNavigate}
            defaultUpperBound={this.props.upperBound}
            upperBound={this.state.upperBound}
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

TimeRangeSelector.displayName = 'TimeRangeSelector';

TimeRangeSelector.defaultProps = {
  disabled: false,
  upperBound: null,
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
