import {
  isExists, sub, add, Duration, format,
} from 'date-fns';

import {
  zonedTimeToUtc, utcToZonedTime,
} from 'date-fns-tz';

const DAY = 'day';
const MONTH = 'month';
const YEAR = 'year';

export const DATE_UNITS = {
  DAY,
  MONTH,
  YEAR,
};

export type DateType = {
  day: number,
  month: number,
  year: number,
};

export type TimeType = {
  minutes: number,
  hours: number,
};

/**
 * Converts our custom date object to JavaScript Date
 * Because the month of the internal object is 0-indexed and
 * externally the dates are passed in as 1-indexed, we need to convert them
 *
 * @param {DateType} value
 * @returns {Date}
 */
export const convertToJsDate = (value: DateType, time?:TimeType): Date => {
  if (time) {
    return new Date(value.year, value.month - 1, value.day, time.hours, time.minutes);
  }
  return new Date(value.year, value.month - 1, value.day);
};

/**
 * Converts a JavaScript Date object to our custom date object format
 * Increases the month number by 1 so that it is 1-indexed
 *
 * @param {Date} date
 * @returns {DateType}
 */
export const convertToDateTypeObject = (date: Date) : DateType => ({
  year: date.getFullYear(),
  month: date.getMonth() + 1,
  day: date.getDate(),
});

/**
 * Returns our custom time object format from a JavaScript Date object
 *
 * @param {Date} date
 * @returns {TimeType}
 */
export const convertToTimeTypeObject = (date: Date) : TimeType => ({
  hours: date.getHours(),
  minutes: date.getMinutes(),
});

/**
 * Converts custom date and time object to unix timestamp
 *
 * @param {DateType} date
 * @param {TimeType} time
 * @returns {DateType}
 */
export const convertToTimeStamp = (date: DateType, time: TimeType): number => {
  // Month shift : JS Date uses 0 - 11 to count months
  const tStamp = new Date(date.year, date.month - 1, date.day, time.hours, time.minutes);
  return tStamp.valueOf();
};

/**
 * Provides the Date Object of current date/time
 */
export const getCurrentJsDateObject = (): Date => new Date();

/**
 * Provides the DateType object of current date/time
 */
export const getCurrentDateTypeObject = (): DateType => convertToDateTypeObject(new Date());

/**
 * Returns the Date Object of provided timestamp in provided timezone
 */
export const convertToZoneTime = (timestamp: number, timezone: string): Date => utcToZonedTime(timestamp, timezone);

/**
 * Returns the Date Object of provided timestamp in UTC
 */
export const convertToUTCtime = (datetime: string | number, timezone: string): Date => zonedTimeToUtc(datetime, timezone);

/**
 * Returns the timestamp of a point in time in the future relative to now
 *
 * @param {Duration} duration
 */
export const getFutureDate = (duration: Duration): number => add(getCurrentJsDateObject(), duration).valueOf();

/**
 * Returns the timestamp of a point in time in the past relative to now
 *
 * @param {Duration} duration
 */
export const getPastDate = (duration: Duration): number => sub(getCurrentJsDateObject(), duration).valueOf();

// isExists uses 0 indexed month numbers
/**
 * Checks if a timetype is valid
 * @param {DateType} date
 */
export const isValidDate = (date?: DateType): boolean => {
  if (date) {
    return isExists(date.year, date.month - 1, date.day);
  }
  return false;
};

/**
 * Checks if a timetype is valid
 * @param {TimeType} time
 */
export const isValidTime = (time?: TimeType): boolean => {
  if (time && time.hours >= 0 && time.hours <= 23 && time.minutes >= 0 && time.minutes <= 59) {
    return true;
  }
  return false;
};

/** Checks if a timezone string is valid
* @param {string} timezone
*/
export const isValidTimeZone = (timezone: string): boolean => {
  try {
    utcToZonedTime(getCurrentJsDateObject(), timezone);
    return true;
  } catch {
    return false;
  }
};

export const zeroFill = (num: string, length: number): string => (num.toString().padStart(length, '0'));

export const convertDateTypeToString = (date: DateType): string => {
  const day = zeroFill(date.day.toString(), 2);
  const month = zeroFill(date.month.toString(), 2);
  const year = zeroFill(date.year.toString(), 4);

  return `${year}-${month}-${day}`;
};

export const convertTimeTypeToString = (time: TimeType): string => {
  const hours = zeroFill(time.hours.toString(), 2);
  const minutes = zeroFill(time.minutes.toString(), 2);

  return `${hours}:${minutes}`;
};

export const dateTypeToStandardEUDateFormat = (date: DateType): string => {
  const day = zeroFill(date.day.toString(), 2);
  const month = zeroFill(date.month.toString(), 2);
  const year = zeroFill(date.year.toString(), 4);

  return `${day}.${month}.${year}`;
};

export const standardEUDateFormat = (date: Date): string => format(date, 'dd.MM.yyyy');

export const standardEUTimeFormat = (date: Date): string => format(date, 'HH:mm');
