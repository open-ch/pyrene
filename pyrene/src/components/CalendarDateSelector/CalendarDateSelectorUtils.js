import {
  isAfter, isBefore, set, add,
} from 'date-fns';

import {
  DATE_UNITS,
  convertToDateTypeObject,
  convertToJsDate,
} from '../../utils/DateUtils';

/**
 * Handles the date change and returns a incremented/decreased value
 * @param {*} value to be changed
 * @param {*} change change direction +1/-1
 * @param timeUnit which timeUnit we are currently changing: YEAR, MONTH or DAY
 */
export const handleDateChange = (value, change, timeUnit) => {
  const tempDate = value;

  // If we are changing Month or Year, set the date to the first of the month.
  if (timeUnit === DATE_UNITS.MONTH || timeUnit === DATE_UNITS.YEAR) {
    tempDate.day = 1;
  }
  if (timeUnit === DATE_UNITS.YEAR) {
    tempDate.month = 1;
  }

  const conversionDate = add(convertToJsDate(tempDate), { [`${timeUnit}s`]: change });
  return convertToDateTypeObject(conversionDate);
};

/**
 * Provides the current date object in the `value` prop format
 */
export const getCurrentDate = () => convertToDateTypeObject(new Date());

export const canNavigateForward = (value, upperBound, timeRange) => {
  const upperBoundDate = convertToJsDate(upperBound);
  const valueDate = convertToJsDate(value);
  switch (timeRange) {
    case DATE_UNITS.YEAR:
      return value.year < upperBound.year;
    case DATE_UNITS.MONTH:
      return isBefore(valueDate, set(upperBoundDate, { date: 1 }));
    default:
      return isBefore(valueDate, upperBoundDate);
  }
};

export const canNavigateBackward = (value, lowerBound, timeRange) => {
  const lowerBoundDate = convertToJsDate(lowerBound);
  const valueDate = convertToJsDate(value);
  switch (timeRange) {
    case DATE_UNITS.YEAR:
      return value.year > lowerBound.year;
    case DATE_UNITS.MONTH:
      return isAfter(valueDate, set(lowerBoundDate, { date: 1 }));
    default:
      return isAfter(valueDate, lowerBoundDate);
  }
};
