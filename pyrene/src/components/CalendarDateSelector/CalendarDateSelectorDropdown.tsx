/* eslint-disable react/prop-types */
import React, { FunctionComponent } from 'react';
import ToggleButtonGroup from '../ToggleButtonGroup/ToggleButtonGroup';
import { DateTypes } from './CalendarDateSelectorUtils';

interface DateTime {
  YEAR_MONTH_DAY?: {
    day?: number,
    month?: number,
    year?: number,
  },
  TIMEUNIT_OPTIONS?: string[],
  TIMEUNIT_OPTION: keyof typeof DateTypes,
}

export interface TimeUnitSelectionDropdownProps {
  disabled?: boolean,
  onSelect?: () => void,
  timeUnit?: DateTime['TIMEUNIT_OPTION'],
  timeUnits: DateTime['TIMEUNIT_OPTIONS'],
}

const capitalizeFirstLetter = (word: string) => word && word[0].toUpperCase() + word.slice(1);

const TimeUnitSelectionDropdown: FunctionComponent<TimeUnitSelectionDropdownProps> = ({
  disabled = false,
  timeUnits = [],
  timeUnit = '',
  onSelect = () => {},
}) => {
  const values = timeUnits.map((range) => ({ value: range, label: capitalizeFirstLetter(range) }));

  return (
    <ToggleButtonGroup
      options={values}
      onChange={onSelect}
      disabled={disabled}
      value={timeUnit}
    />
  );
};

export default TimeUnitSelectionDropdown;
