import React from 'react';
import PropTypes from 'prop-types';

import TimeRangeSelectionPropTypes from './CalendarDateSelectorPropTypes';
import ToggleButtonGroup from '../ToggleButtonGroup/ToggleButtonGroup';

const capitalizeFirstLetter = (string) => string && string[0].toUpperCase() + string.slice(1);

const TimeUnitSelectionDropdown = (props) => {
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
