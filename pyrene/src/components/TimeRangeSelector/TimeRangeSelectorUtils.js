import dayjs from 'dayjs';

const DAY = 'day';
const MONTH = 'month';
const YEAR = 'year';

export const DATE_TYPES = {
  DAY,
  MONTH,
  YEAR,
};

export const getDateType = ({ month, day }) => {
  if (!month && !day) {
    return DATE_TYPES.YEAR;
  }
  if (!day) {
    return DATE_TYPES.MONTH;
  }
  return DATE_TYPES.DAY;
};

/**
 * Handles the date change and returns a incremented/decreased value
 * @param {*} value to be changed
 * @param {*} change change direction +1/-1
 */
export const handleDateChange = (value, change) => {
  const { year, month, day } = value;
  const type = getDateType(value);
  const date = dayjs(new Date(year, month ? month - 1 : 0, day || 1)).add(change, type);
  return {
    year: date.year(),
    month: (type === DATE_TYPES.MONTH || type === DATE_TYPES.DAY) ? date.month() + 1 : undefined,
    day: type === DATE_TYPES.DAY ? date.date() : undefined,
  };
};
/**
 * Provides a new time range object based on the provided type
 * @param {*} value before change
 * @param {*} newType new type to be selected
 */
export const handleTypeChange = ({ year, month, day }, newType) => {
  switch (newType) {
    case DATE_TYPES.YEAR:
      return {
        year,
      };
    case DATE_TYPES.MONTH:
      return {
        year,
        month: month || 1,
      };
    default:
      return {
        year,
        month: month || 1,
        day: day || 1,
      };
  }
};

/**
 * Provides the current date object in the `value` prop format
 */
export const getCurrentDate = () => {
  const date = dayjs();
  return {
    year: date.year(),
    month: date.month() + 1,
    day: date.date(),
  };
};

export class DateHelper {

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

export default {};
