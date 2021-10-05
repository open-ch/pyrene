import { format } from 'date-fns';
import { DateUnits, convertToJsDate } from '../../utils/DateUtils';

export default class DateHelper {

  static FULL_DATE = 'dd MMMM yyyy';

  static MONTH_NAME_WITH_YEAR = 'MMMM yyyy';

  static YEAR = 'yyyy';

  static formatTimeRangeText(value, type) {
    switch (type) {
      case DateUnits.YEAR:
        return this.formatYear(value);
      case DateUnits.MONTH:
        return this.formatMonth(value);
      default:
        return this.formatFullDate(value);
    }
  }

  static formatYear(value) {
    return format(convertToJsDate(value), this.YEAR);
  }

  static formatMonth(value) {
    return format(convertToJsDate(value), this.MONTH_NAME_WITH_YEAR);
  }

  static formatFullDate(value) {
    return format(convertToJsDate(value), this.FULL_DATE);
  }

}
