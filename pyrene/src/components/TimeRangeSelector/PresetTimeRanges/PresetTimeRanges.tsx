/* eslint-disable react/prop-types */
import React, { FunctionComponent } from 'react';
import subMilliseconds from 'date-fns/subMilliseconds';
import getTime from 'date-fns/getTime';
import ToggleButtonGroup from '../../ToggleButtonGroup/ToggleButtonGroup';
import { TimeRange } from '../TimeRangeSelectorDefaultProps';

type OnChangeHandler = (newFrom: number, newTo: number, newUpperBound: number, durationInMs: number, presetId: string) => void;

export interface PresetTimeRangesProps {
  currentTimeRangeType?: string,
  disabled?: boolean,
  lowerBound: number,
  onInteract: OnChangeHandler,
  presetTimeRanges: Array<TimeRange>,
  timezone: string,
  upperBound: number,
}

/**
 * Updates the from/to limits, the upperbound and the stepper ranges based on the selected preset
 * @param presetId the id of the presetTimeRange element that has been selected
 * @param presetTimeRanges the preset defined by the time range selector
 * @param lowerBound the current lowerBound
 * @param upperBound the current upperBound
 * @param timezone the timezone that we are currently using
 * @param callback the callback to update the parent component
 */
const onPresetTimeRangeSelected = (
  presetId: string,
  presetTimeRanges: Array<TimeRange>,
  lowerBound: number,
  upperBound: number,
  timezone: string,
  callback: OnChangeHandler,
) => {
  const selectedPresetTimeRange = presetTimeRanges.filter((preset) => preset.id === presetId).shift();

  const newFromDate = selectedPresetTimeRange ? subMilliseconds(upperBound, selectedPresetTimeRange.durationInMs) : 0;
  // convert to milliseconds
  const newFrom = getTime(newFromDate);

  callback(
    Math.max(newFrom, lowerBound),
    upperBound,
    upperBound,
    selectedPresetTimeRange?.durationInMs || 0,
    selectedPresetTimeRange?.id || '',
  );
};

const PresetTimeRanges: FunctionComponent<PresetTimeRangesProps> = ({
  currentTimeRangeType = '',
  disabled = false,
  lowerBound,
  onInteract,
  presetTimeRanges,
  timezone,
  upperBound,
}) => (
  <ToggleButtonGroup
    options={presetTimeRanges.map(({ id, label }) => ({ label, value: id }))}
    value={currentTimeRangeType}
    disabled={disabled}
    onChange={(value) => {
      onPresetTimeRangeSelected(
        value,
        presetTimeRanges,
        lowerBound,
        upperBound,
        timezone,
        onInteract,
      );
    }}
  />
);

export default PresetTimeRanges;
