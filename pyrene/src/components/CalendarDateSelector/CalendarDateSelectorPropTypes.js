import PropTypes from 'prop-types';

import { DATE_UNITS } from '../../utils/DateUtils';

export default {
  YEAR_MONTH_DAY: PropTypes.shape({
    day: PropTypes.number,
    month: PropTypes.number,
    year: PropTypes.number,
  }),
  TIMEUNIT_OPTIONS: PropTypes.arrayOf(PropTypes.string),
  TIMEUNIT_OPTION: PropTypes.oneOf([DATE_UNITS.DAY, DATE_UNITS.MONTH, DATE_UNITS.YEAR]),
};
