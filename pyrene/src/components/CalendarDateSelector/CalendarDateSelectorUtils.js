import {
  isAfter, isBefore, set, add,
} from 'date-fns';

const DAY = 'day';
const MONTH = 'month';
const YEAR = 'year';

export const DATE_TYPES = {
  DAY,
  MONTH,
  YEAR,
};

/**
 * Converts our custom date object to JavaScript Date
 * @param {Object} value
 * @returns {Date}
 */
export const convertToJsDate = (value) => new Date(value.year, value.month - 1, value.day);

/**
 * Converts a JavaScript Date object to our custom date object format
 * @param {Date} date
 * @returns {Object}
 */
const convertToExternalDateObject = (date) => ({
  year: date.getFullYear(),
  month: date.getMonth() + 1,
  day: date.getDate(),
});


/**
 * Handles the date change and returns a incremented/decreased value
 * @param {*} value to be changed
 * @param {*} change change direction +1/-1
 * @param timeUnit which timeUnit we are currently changing: YEAR, MONTH or DAY
 */
export const handleDateChange = (value, change, timeUnit) => {
  const tempDate = value;

  // If we are changing Month or Year, set the date to the first of the month.
  if (timeUnit === MONTH || timeUnit === YEAR) {
    tempDate.day = 1;
  }
  if (timeUnit === YEAR) {
    tempDate.month = 1;
  }

  const conversionDate = add(convertToJsDate(tempDate), { [`${timeUnit}s`]: change });
  return convertToExternalDateObject(conversionDate);
};

/**
 * Provides the current date object in the `value` prop format
 */
export const getCurrentDate = () => convertToExternalDateObject(new Date());

export const canNavigateForward = (value, upperBound, timeRange) => {
  const upperBoundDate = convertToJsDate(upperBound);
  const valueDate = convertToJsDate(value);
  switch (timeRange) {
    case DATE_TYPES.YEAR:
      return value.year < upperBound.year;
    case DATE_TYPES.MONTH:
      return isBefore(valueDate, set(upperBoundDate, { date: 1 }));
    default:
      return isBefore(valueDate, upperBoundDate);
  }
};

export const canNavigateBackward = (value, lowerBound, timeRange) => {
  const lowerBoundDate = convertToJsDate(lowerBound);
  const valueDate = convertToJsDate(value);
  switch (timeRange) {
    case DATE_TYPES.YEAR:
      return value.year > lowerBound.year;
    case DATE_TYPES.MONTH:
      return isAfter(valueDate, set(lowerBoundDate, { date: 1 }));
    default:
      return isAfter(valueDate, lowerBoundDate);
  }
};
