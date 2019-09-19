import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
// eslint-disable-next-line no-unused-vars
import momentTz from 'moment-timezone';
import PresetTimeRanges from './PresetTimeRanges/PresetTimeRanges';
import TimeRangeNavigationBar from './TimeRangeNavigationBar/TimeRangeNavigationBar';
import DefaultProps from './TimeRangeSelectorDefaultProps';

import './timeRangeSelector.css';

export default class TimeRangeSelector extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      from: props.initialFrom,
      to: props.initialTo,
      durationInMs: props.initialTo - props.initialFrom,
      currentTimeRangeType: '',
    };
  }

  onPresetTimeRangeSelected(selectedElement) {
    const selectedPresetTimeRange = this.props.presetTimeRanges.filter(preset => preset.id === selectedElement.currentTarget.id).shift();
    // If the upperBound is the default value or below the defined upperBound, use now as an upperbound
    const nowUpperBound = ((this.props.upperBound === 0) || (moment().tz(this.props.timezone).seconds(0).valueOf() <= this.props.upperBound)) ? moment().tz(this.props.timezone).seconds(0).valueOf() : this.props.upperBound;
    this.setState(
      {
        from: nowUpperBound - selectedPresetTimeRange.durationInMs,
        to: nowUpperBound,
        durationInMs: selectedPresetTimeRange.durationInMs, // We need to store it, otherwise if we reach the lower/upper bound we will start to use less milliseconds with the steppers
        currentTimeRangeType: selectedPresetTimeRange.id,
      }
    );
    this.props.onChange(selectedPresetTimeRange.from, selectedPresetTimeRange.to);
  }

  onNavigateBack() {
    this.setState((previousState) => {
      const durationInMs = previousState.durationInMs;
      const newFrom = (previousState.from - durationInMs) < this.props.lowerBound ? this.props.lowerBound : previousState.from - durationInMs;
      const newTo = (previousState.to - durationInMs) - newFrom < durationInMs ? newFrom + durationInMs : previousState.to - durationInMs; // Keep the selected timespan duration if we reach a bound

      return {
        from: newFrom,
        to: newTo,
      };
    });
    this.props.onChange(this.state.from, this.state.to);
  }

  onNavigateForward() {
    this.setState((previousState) => {
      const durationInMs = previousState.durationInMs;
      const realUpperBound = this.props.upperBound === 0 ? moment().tz(this.props.timezone).seconds(0).valueOf() : this.props.upperBound; // In case of default value, the upper bound is NOW.
      const newTo = (previousState.to + durationInMs) > realUpperBound ? realUpperBound : previousState.to + durationInMs;
      const newFrom = (previousState.from + durationInMs) - newTo < durationInMs ? newTo - durationInMs : previousState.from + durationInMs; // Keep the selected timespan duration if we reach a bound

      return {
        from: newFrom,
        to: newTo,
      };
    });
    this.props.onChange(this.state.from, this.state.to);
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
  upperBound: 0,
  presetTimeRanges: DefaultProps.PRESET_TIME_RANGES,
  renderRightSection: () => {},
};

TimeRangeSelector.propTypes = {
  disabled: PropTypes.bool,
  initialFrom: PropTypes.number.isRequired,
  initialTo: PropTypes.number.isRequired,
  lowerBound: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  presetTimeRanges: PropTypes.arrayOf(PropTypes.object),
  renderRightSection: PropTypes.func,
  timezone: PropTypes.string.isRequired,
  upperBound: PropTypes.number,
};
