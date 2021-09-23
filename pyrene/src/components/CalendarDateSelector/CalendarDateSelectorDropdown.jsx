import React, { FunctionComponent } from 'react';
import PropTypes from 'prop-types';

import TimeRangeSelectionPropTypes from './CalendarDateSelectorPropTypes';
import ToggleButtonGroup from '../ToggleButtonGroup/ToggleButtonGroup';

export enum DATE_TYPES {
  DAY = 'day',
  MONTH = 'month',
  YEAR = 'year',
};

interface DateTime {
  YEAR_MONTH_DAY?: {
    day?: number,
    month?: number,
    year?: number,
  },
  TIMEUNIT_OPTIONS?: string[],
  TIMEUNIT_OPTION: DATE_TYPES,  
}

export interface TimeUnitSelectionDropdownProps {
  disabled?: boolean,
  onSelect?: ( ) => void,
  timeUnit?: DateTime['TIMEUNIT_OPTION'],
  timeUnits: DateTime['TIMEUNIT_OPTIONS'],
}

const capitalizeFirstLetter = (string) => string && string[0].toUpperCase() + string.slice(1);

const TimeUnitSelectionDropdown: FunctionComponent<TimeUnitSelectionDropdownProps> = ({
  disabled,
  timeUnits,
  timeUnit,
  onSelect,
}: TimeUnitSelectionDropdownProps) => {
  const {
    disabled,
    timeUnits,
    timeUnit,
    onSelect,
  } = props;
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

TimeUnitSelectionDropdown.defaultProps = {
  disabled: false,
  onSelect: () => {},
  timeUnit: undefined,
};

TimeUnitSelectionDropdown.propTypes = {
  disabled: PropTypes.bool,
  onSelect: PropTypes.func,
  timeUnit: TimeRangeSelectionPropTypes.TIMEUNIT_OPTION,
  timeUnits: TimeRangeSelectionPropTypes.TIMEUNIT_OPTIONS.isRequired,
};
export default TimeUnitSelectionDropdown;
