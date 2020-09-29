import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import ToggleButtonGroup from '../../ToggleButtonGroup/ToggleButtonGroup';

const PresetTimeRanges = (props) => (
  <ToggleButtonGroup
    options={props.presetTimeRanges.map(({ id, label }) => ({ label, value: id }))}
    value={props.currentTimeRangeType}
    disabled={props.disabled}
    onChange={(value) => {
      PresetTimeRanges.onPresetTimeRangeSelected(
        value,
        props.presetTimeRanges,
        props.lowerBound,
        props.upperBound,
        props.timezone,
        props.onInteract,
      );
    }}
  />
);

/**
 * Updates the from/to limits, the upperbound and the stepper ranges based on the selected preset
 * @param presetId the id of the presetTimeRange element that has been selected
 * @param presetTimeRanges the preset defined by the time range selector
 * @param lowerBound the current lowerBound
 * @param upperBound the current upperBound
 * @param timezone the timezone that we are currently using
 * @param callback the callback to update the parent component
 */
PresetTimeRanges.onPresetTimeRangeSelected = (presetId, presetTimeRanges, lowerBound, upperBound, timezone, callback) => {
  const selectedPresetTimeRange = presetTimeRanges.filter((preset) => preset.id === presetId).shift();
  const newFrom = moment(upperBound).tz(timezone).subtract(selectedPresetTimeRange.durationInMs).valueOf();

  callback(
    Math.max(newFrom, lowerBound),
    upperBound,
    upperBound,
    selectedPresetTimeRange.durationInMs,
    selectedPresetTimeRange.id,
  );
};

PresetTimeRanges.displayName = 'PresetTimeRanges';

PresetTimeRanges.defaultProps = {
  disabled: false,
  currentTimeRangeType: null,
};

PresetTimeRanges.propTypes = {
  currentTimeRangeType: PropTypes.string,
  disabled: PropTypes.bool,
  lowerBound: PropTypes.number.isRequired,
  onInteract: PropTypes.func.isRequired,
  presetTimeRanges: PropTypes.arrayOf(
    PropTypes.shape({
      durationInMs: PropTypes.number.isRequired,
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  timezone: PropTypes.string.isRequired,
  upperBound: PropTypes.number.isRequired,
};

export default PresetTimeRanges;
