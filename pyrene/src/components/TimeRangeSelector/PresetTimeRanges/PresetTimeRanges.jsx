import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './presetTimeRanges.css';

const PresetTimeRanges = props => (
  <div>
    {PresetTimeRanges._createPresets(props)}
  </div>
);

PresetTimeRanges._createPresets = props => props.presetTimeRanges.map((preset, index) => (
  <button
    key={preset.id}
    id={preset.id}
    type="button"
    styleName={
      classNames('presetTimeRange',
        { disabled: props.disabled },
        { active: props.currentTimeRangeType === preset.id },
        { first: index === 0 },
        { successive: index !== 0 })
    }
    onClick={(clickedElement) => {
      PresetTimeRanges._onPresetTimeRangeSelected(
        clickedElement.currentTarget.id,
        props.presetTimeRanges,
        props.upperBound,
        props.timezone,
        props.onInteract
      );
    }}
    disabled={props.disabled}
  >
    <span>
      {preset.label}
    </span>
  </button>
));

/**
 * Updates the from/to limits, the upperbound and the stepper ranges based on the selected preset
 * @param presetId the id of the presetTimeRange element that has been selected
 * @param presetTimeRanges the preset defined by the time range selector
 * @param upperBound the current upperBound
 * @param timezone the timezone that we are currently using
 * @param callback the callback to update the parent component
 */
PresetTimeRanges._onPresetTimeRangeSelected = (presetId, presetTimeRanges, upperBound, timezone, callback) => {
  const selectedPresetTimeRange = presetTimeRanges.filter(preset => preset.id === presetId).shift();
  // from TimeRangeSelector: _onPresetTimeRangeSelected(newFrom, newTo, newUpperBound, durationInMs, currentTimeRangeType)
  callback(
    upperBound - selectedPresetTimeRange.durationInMs,
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
