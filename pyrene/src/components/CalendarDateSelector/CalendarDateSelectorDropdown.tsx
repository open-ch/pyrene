/* eslint-disable react/prop-types */
import React, { FunctionComponent } from 'react';
import ToggleButtonGroup from '../ToggleButtonGroup/ToggleButtonGroup';
import { DateTime } from './CalendarDateSelectorUtils';

export interface TimeUnitSelectionDropdownProps {
  disabled?: boolean,
  onSelect?: () => void,
  timeUnit?: DateTime['timeunitOption'],
  timeUnits: DateTime['timeunitOptions'],
}

const capitalizeFirstLetter = (word: string) => word && word[0].toUpperCase() + word.slice(1);

const TimeUnitSelectionDropdown: FunctionComponent<TimeUnitSelectionDropdownProps> = ({
  disabled = false,
  timeUnits = [],
  timeUnit = '',
  onSelect = () => {},
}) => (
  <ToggleButtonGroup
    options={timeUnits.map((range) => ({ value: range, label: capitalizeFirstLetter(range) }))}
    onChange={onSelect}
    disabled={disabled}
    value={timeUnit}
  />
);

export default TimeUnitSelectionDropdown;
