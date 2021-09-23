/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import set from 'date-fns/set';
import add from 'date-fns/add';

export interface DateTime {
  yearMonthDay?: {
    day?: number,
    month?: number,
    year?: number,
  },
  timeunitOptions?: string[],
  timeunitOption?: keyof typeof DateTypes,
}

type DayMonthYear = Required<Required<DateTime>['yearMonthDay']>;

export enum DateTypes {
  day = 'day',
  month = 'month',
  year = 'year',
}

/**
 * Converts our custom date object to JavaScript Date
 * Because the month of the internal object is 0-indexed and
 * externally the dates are passed in as 1-indexed, we need to convert them
 *
 * @param {Object} value
 * @returns {Date}
 */
export const convertToJsDate = (value: DayMonthYear) => new Date(value.year, value.month - 1, value.day);

/**
 * Converts a JavaScript Date object to our custom date object format
 * Increases the month number by 1 so that it is 1-indexed
 *
 * @param {Date} date
 * @returns {Object}
 */
const convertToExternalDateObject = (date: Date) => ({
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
export const handleDateChange = (value: DayMonthYear, change: -1 | 1, timeUnit: keyof typeof DateTypes) => {
  const tempDate = { ...value };

  // If we are changing Month or Year, set the date to the first of the month.
  if (timeUnit === DateTypes.month || timeUnit === DateTypes.year) {
    tempDate.day = 1;
  }
  if (timeUnit === DateTypes.year) {
    tempDate.month = 1;
  }

  const conversionDate = add(convertToJsDate(tempDate), { [`${timeUnit}s`]: change });
  return convertToExternalDateObject(conversionDate);
};

/**
 * Provides the current date object in the `value` prop format
 */
export const getCurrentDate = () => convertToExternalDateObject(new Date());

export const canNavigateForward = (value: DayMonthYear, upperBound: DayMonthYear, timeRange: keyof typeof DateTypes) => {
  const upperBoundDate = convertToJsDate(upperBound);
  const valueDate = convertToJsDate(value);
  switch (timeRange) {
    case DateTypes.year:
      return value.year < upperBound.year;
    case DateTypes.month:
      return isBefore(valueDate, set(upperBoundDate, { date: 1 }));
    default:
      return isBefore(valueDate, upperBoundDate);
  }
};

export const canNavigateBackward = (value: DayMonthYear, lowerBound: DayMonthYear, timeRange: keyof typeof DateTypes) => {
  const lowerBoundDate = convertToJsDate(lowerBound);
  const valueDate = convertToJsDate(value);
  switch (timeRange) {
    case DateTypes.year:
      return value.year > lowerBound.year;
    case DateTypes.month:
      return isAfter(valueDate, set(lowerBoundDate, { date: 1 }));
    default:
      return isAfter(valueDate, lowerBoundDate);
  }
};
