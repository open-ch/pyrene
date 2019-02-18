import dayjs from 'dayjs';

import { DATE_TYPES, getDateType } from './CalendarDateSelectorUtils';

export default class DateHelper {

  static FULL_DATE = 'DD MMMM YYYY';

  static MONTH_NAME_WITH_YEAR = 'MMMM YYYY';

  static formatTimeRangeText(value) {
    const type = getDateType(value);
    switch (type) {
      case DATE_TYPES.YEAR:
        return this.formatYear(value);
      case DATE_TYPES.MONTH:
        return this.formatMonth(value);
      default:
        return this.formatFullDate(value);
    }
  }

  static formatYear({ year }) {
    return year;
  }

  static formatMonth({ year, month }) {
    const date = dayjs(new Date(year, month - 1, 1));
    return date.format(this.MONTH_NAME_WITH_YEAR);
  }

  static formatFullDate({ year, month, day }) {
    const date = dayjs(new Date(year, month - 1, day));
    return date.format(this.FULL_DATE);
  }

}
