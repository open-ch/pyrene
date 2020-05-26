import React from 'react';
import PropTypes from 'prop-types';

import TimeRangeSelectionPropTypes from './CalendarDateSelectorPropTypes';
import HorizontalSwitch from '../TimeRangeSelector/PresetTimeRanges/HorizontalSwitch/HorizontalSwitch';

const capitalizeFirstLetter = (string) => string && string[0].toUpperCase() + string.slice(1);

const TimeUnitSelectionDropdown = (props) => {
  const {
    disabled,
    timeUnits,
    timeUnit,
    onSelect,
  } = props;
  const values = timeUnits.map((range) => ({ id: range, label: capitalizeFirstLetter(range) }));

  return (
    <HorizontalSwitch
      values={values}
      onClick={(value) => onSelect(value.id)}
      disabled={disabled}
      selected={timeUnit}
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
