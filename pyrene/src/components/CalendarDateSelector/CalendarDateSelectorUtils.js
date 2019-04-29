import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';

dayjs.extend(utcPlugin);

const DAY = 'day';
const MONTH = 'month';
const YEAR = 'year';

export const DATE_TYPES = {
  DAY,
  MONTH,
  YEAR,
};

/**
 * Returns a string enum to indicate which type the object
 * It does so by checking for existence of certain properties in the object
 *
 * @param {Object} param
 * @returns {string}
 */
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
 * Converts our custom date object to a dayjs instance
 * Because the momth of the internal object is 0-indexed and
 * externally the dates are passed in as 1-indexed, we need to convert them
 *
 * @param {Object} value
 * @returns {dayjs} dayjs instance
 */
const convertToInternalDayJs = (value) => {
  const newValue = { ...value };
  if (value.month !== undefined) {
    newValue.month = value.month - 1;
  } else {
    newValue.month = 0;
  }
  if (value.day === undefined) {
    newValue.day = 1;
  }
  return dayjs().utc().set('year', newValue.year).set('month', newValue.month).set('date', newValue.day);
};

/**
 * Converts a dayjs instance to our custom date object format
 * It is passed a date instance and the type of object which is expected to be returned
 * 1. Year - { year }
 * 2. Month - { year, month }
 * 3. Day - { year, month, day }
 * It also increases the month number by 1 so that it is 1-indexed
 *
 * @param {dayjs} date
 * @param {string} type
 * @returns {Object}
 */
const convertToExternalObject = (date, type) => ({
  year: date.year(),
  month: (type === DATE_TYPES.MONTH || type === DATE_TYPES.DAY) ? date.month() + 1 : undefined,
  day: type === DATE_TYPES.DAY ? date.date() : undefined,
});

/**
 * Handles the date change and returns a incremented/decreased value
 * @param {*} value to be changed
 * @param {*} change change direction +1/-1
 */
export const handleDateChange = (value, change) => {
  const type = getDateType(value);
  const date = convertToInternalDayJs(value).add(change, type);
  return convertToExternalObject(date, type);
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
  const date = dayjs().utc();
  return convertToExternalObject(date, DATE_TYPES.DAY);
};

export const canNavigateForward = (value, upperBound, timeRange) => {
  const upperBoundDate = convertToInternalDayJs(upperBound);
  const valueDate = convertToInternalDayJs(value);
  switch (timeRange) {
    case DATE_TYPES.YEAR:
      return value.year < upperBound.year;
    case DATE_TYPES.MONTH:
      return valueDate.isBefore(upperBoundDate.set('date', 1));
    default:
      return valueDate.isBefore(upperBoundDate);
  }
};

export const canNavigateBackward = (value, lowerBound, timeRange) => {
  const lowerBoundDate = convertToInternalDayJs(lowerBound);
  const valueDate = convertToInternalDayJs(value);
  switch (timeRange) {
    case DATE_TYPES.YEAR:
      return value.year > lowerBound.year;
    case DATE_TYPES.MONTH:
      return valueDate.isAfter(lowerBoundDate.set('date', 1));
    default:
      return valueDate.isAfter(lowerBoundDate);
  }
};
