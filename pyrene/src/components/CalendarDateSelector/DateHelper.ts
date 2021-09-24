/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import format from 'date-fns/format';
import { DateTypes, DayMonthYear, convertToJsDate } from './CalendarDateSelectorUtils';

export default class DateHelper {

  static FULL_DATE = 'dd MMMM yyyy';

  static MONTH_NAME_WITH_YEAR = 'MMMM yyyy';

  static YEAR = 'yyyy';

  static formatTimeRangeText(value: DayMonthYear, type: keyof typeof DateTypes) {
    switch (type) {
      case DateTypes.year:
        return this.formatYear(value);
      case DateTypes.month:
        return this.formatMonth(value);
      default:
        return this.formatFullDate(value);
    }
  }

  static formatYear(value: DayMonthYear) {
    return format(convertToJsDate(value), this.YEAR);
  }

  static formatMonth(value: DayMonthYear) {
    return format(convertToJsDate(value), this.MONTH_NAME_WITH_YEAR);
  }

  static formatFullDate(value: DayMonthYear) {
    return format(convertToJsDate(value), this.FULL_DATE);
  }

}
