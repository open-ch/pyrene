import React from 'react';
import classNames from 'classnames';
import { syncUpperBound } from '../TimeRangeSelectorHelper';

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
        props.initialUpperBound,
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
 * @param defaultUpperBound the initialUpperBound, to check if we have to synchronize it with now
 * @param upperBound the current upperBound
 * @param timezone the timezone that we are currently using
 * @param callback the callback to update the parent component
 */
PresetTimeRanges._onPresetTimeRangeSelected = (presetId, presetTimeRanges, defaultUpperBound, upperBound, timezone, callback) => {
  const selectedPresetTimeRange = presetTimeRanges.filter(preset => preset.id === presetId).shift();
  const nowUpperBound = syncUpperBound(defaultUpperBound, upperBound, timezone);
  callback(
    nowUpperBound - selectedPresetTimeRange.durationInMs,
    nowUpperBound,
    nowUpperBound,
    selectedPresetTimeRange.durationInMs,
    selectedPresetTimeRange.id,
  );
};

PresetTimeRanges.displayName = 'PresetTimeRanges';

PresetTimeRanges.defaultProps = {
  disabled: false,
  currentTimeRangeType: null,
  initialUpperBound: null,
};

export default PresetTimeRanges;
