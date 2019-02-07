import PropTypes from 'prop-types';

import { DATE_TYPES } from './TimeRangeSelectorUtils';

export default {
  YEAR_MONTH_DAY: PropTypes.shape({
    day: PropTypes.number,
    month: PropTypes.number,
    year: PropTypes.number,
  }),
  TIMERANGE_OPTIONS: PropTypes.arrayOf(PropTypes.string),
  TIMERANGE_OPTION: PropTypes.oneOf([DATE_TYPES.DAY, DATE_TYPES.MONTH, DATE_TYPES.YEAR]),
};
