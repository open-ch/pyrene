import React from 'react';
import PropTypes from 'prop-types';

import SingleSelect from '../SingleSelect/SingleSelect';

import TimeRangeSelectionPropTypes from './CalendarDateSelectorPropTypes';

const capitalizeFirstLetter = (string) => string && string[0].toUpperCase() + string.slice(1);

const TimeUnitSelectionDropdown = (props) => {
  const {
    disabled,
    timeUnits,
    timeUnit,
    onSelect,
  } = props;
  const options = timeUnits.map((range) => ({ value: range, label: capitalizeFirstLetter(range) }));
  return (
    <SingleSelect
      options={options}
      onChange={(value) => onSelect(value.value)}
      disabled={disabled}
      value={{ value: timeUnit, label: capitalizeFirstLetter(timeUnit) }}
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
