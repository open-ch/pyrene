import PropTypes from 'prop-types';

import { DateUnits } from '../../utils/DateUtils';

export default {
  YEAR_MONTH_DAY: PropTypes.shape({
    day: PropTypes.number,
    month: PropTypes.number,
    year: PropTypes.number,
  }),
  TIMEUNIT_OPTIONS: PropTypes.arrayOf(PropTypes.string),
  TIMEUNIT_OPTION: PropTypes.oneOf([DateUnits.DAY, DateUnits.MONTH, DateUnits.YEAR]),
};
