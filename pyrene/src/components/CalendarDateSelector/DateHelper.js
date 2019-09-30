import { DATE_TYPES, convertToInternalMomentJs } from './CalendarDateSelectorUtils';

export default class DateHelper {

  static FULL_DATE = 'DD MMMM YYYY';

  static MONTH_NAME_WITH_YEAR = 'MMMM YYYY';

  static YEAR = 'YYYY';

  static formatTimeRangeText(value, type) {
    switch (type) {
      case DATE_TYPES.YEAR:
        return this.formatYear(value);
      case DATE_TYPES.MONTH:
        return this.formatMonth(value);
      default:
        return this.formatFullDate(value);
    }
  }

  static formatYear(value) {
    return convertToInternalMomentJs(value).format(this.YEAR);
  }

  static formatMonth(value) {
    return convertToInternalMomentJs(value).format(this.MONTH_NAME_WITH_YEAR);
  }

  static formatFullDate(value) {
    return convertToInternalMomentJs(value).format(this.FULL_DATE);
  }

}
