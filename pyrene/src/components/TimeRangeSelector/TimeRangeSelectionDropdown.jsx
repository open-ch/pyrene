import React from 'react';
import PropTypes from 'prop-types';

import SingleSelect from '../SelectElements/SingleSelect/SingleSelect';

import TimeRangeSelectionPropTypes from './TimeRangeSelectorPropTypes';

const TimeRangeSelectionDropdown = (props) => {
  const {
    disabled,
    timeRanges,
    timeRange,
    onSelect,
  } = props;
  const options = timeRanges.map(range => ({ value: range, label: range.toUpperCase() }));
  return (
    <SingleSelect
      options={options}
      onChange={({ target }) => onSelect(target.value.value)}
      disabled={disabled}
      value={timeRange}
    />
  );
};

TimeRangeSelectionDropdown.defaultProps = {
  disabled: false,
  onSelect: () => {},
  timeRange: undefined,
};

TimeRangeSelectionDropdown.propTypes = {
  disabled: PropTypes.bool,
  onSelect: PropTypes.func,
  timeRange: TimeRangeSelectionPropTypes.TIMERANGE_OPTION,
  timeRanges: TimeRangeSelectionPropTypes.TIMERANGE_OPTIONS.isRequired,
};
export default TimeRangeSelectionDropdown;
