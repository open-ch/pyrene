import isExists from 'date-fns/isExists';
import sub from 'date-fns/sub';
import add from 'date-fns/add';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import Duration from 'date-fns';

import {
  zonedTimeToUtc, utcToZonedTime,
} from 'date-fns-tz';

export enum DateUnits {
  DAY = 'day',
  MONTH = 'month',
  YEAR = 'year',
}

export interface DateValidationObject {
  dateString?: string,
  isDateInvalid?: boolean,
  isTimeInvalid?: boolean,
  minimumValue?: number,
  maximumValue?: number,
  timeZone?: string,
  dateFormat?: string,
  timeString?: string,
  timeFormat?: string,
}

export type DateType = {
  day: number,
  month: number,
  year: number,
};

export type TimeType = {
  minutes: number,
  hours: number,
};

export const allowedValueCheck = (valueToCheck:string) : boolean => (/^[0-9.: APM]*$/.test(valueToCheck));

/**
 * Converts our custom date object to JavaScript Date
 * Because the month of the internal object is 0-indexed and
 * externally the dates are passed in as 1-indexed, we need to convert them
 *
 * @param {DateType} value
 * @returns {Date}
 */
export const convertToJsDate = (date?: DateType, time?:TimeType): Date | undefined => {
  if (date) {
    if (time) {
      return new Date(date.year, date.month - 1, date.day, time.hours, time.minutes);
    }
    return new Date(date.year, date.month - 1, date.day);
  }
  return undefined;
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
 * Returns the Date Object of provided datetime parameter in UTC
 */
export const convertToUTCtime = (datetime: string | number | Date, timezone: string): Date => zonedTimeToUtc(datetime, timezone);

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

export const customDateFormat = (date: Date | string, pattern: string): string | undefined => {
  if (typeof date === 'string') {
    const parsed = parse(date, pattern, new Date());
    return format(parsed, pattern);
  }

  if (date instanceof Date && date.getTime()) {
    return format(date, pattern);
  }

  return undefined;
};

export const customStringToDate = (datestring: string, pattern: string): Date => parse(datestring, pattern, new Date());

export const inRange = (timestampToCheck: number, minimumValue: number, maximumValue: number): number => {
  if (timestampToCheck < minimumValue) {
    return -1;
  }
  if (timestampToCheck > maximumValue) {
    return 1;
  }
  return 0;
};

export const getErrors = (dateValObj: DateValidationObject): string => {
  if (dateValObj.timeZone && !isValidTimeZone(dateValObj.timeZone)) {
    return 'Invalid time zone.';
  }

  if (dateValObj.isDateInvalid && dateValObj.isTimeInvalid) {
    return 'Invalid date & time format';
  }
  if (dateValObj.isDateInvalid) {
    return 'Invalid date format';
  }
  if (dateValObj.isTimeInvalid) {
    return 'Invalid time format';
  }

  if (dateValObj.dateString && dateValObj.dateString.length === dateValObj.dateFormat?.length && dateValObj.timeZone && dateValObj.dateFormat) {
    const tmpDate = customStringToDate(dateValObj.dateString, dateValObj.dateFormat);
    if (tmpDate) {
      if (dateValObj.minimumValue != null && dateValObj.maximumValue != null) {
        let datetimestring;
        let datetimeformatstring;

        if (dateValObj.timeFormat && dateValObj.timeString && dateValObj.timeString.length === dateValObj.timeFormat.length) {
          datetimestring = `${dateValObj.dateString}${dateValObj.timeString}`;
          datetimeformatstring = `${dateValObj.dateFormat}${dateValObj.timeFormat}`;
        } else {
          datetimestring = dateValObj.dateString;
          datetimeformatstring = dateValObj.dateFormat;
        }

        const rangePositon = inRange(convertToUTCtime(customStringToDate(datetimestring, datetimeformatstring), dateValObj.timeZone).valueOf(), dateValObj.minimumValue, dateValObj.maximumValue);
        if (rangePositon === -1) {
          return 'Less than minimum date.';
        }
        if (rangePositon === 1) {
          return 'Larger than maximum date.';
        }
      }
    }
  }

  return '';
};

export const hasDateError = (dateValObj: DateValidationObject): boolean => {
  if (dateValObj && dateValObj.dateString != null) {

    if (dateValObj.dateFormat && dateValObj.dateString.length <= dateValObj.dateFormat.length) {
      if ((dateValObj.dateString.length < dateValObj.dateFormat.length || (dateValObj.dateString.length === dateValObj.dateFormat.length && !Number.isNaN(customStringToDate(dateValObj.dateString, dateValObj.dateFormat).valueOf())))) {
        return false;
      }
    }
  }

  return true;
};

export const hasTimeError = (timestring: string, timeFormat: string): boolean => {
  if (timestring.length <= timeFormat.length) {
    if (timestring.length < timeFormat.length || (timestring.length === timeFormat.length && !Number.isNaN(customStringToDate(timestring, timeFormat).valueOf()))) {
      return false;
    }
  }
  return true;
};

export const getClientTimeZone = (): string => Intl.DateTimeFormat().resolvedOptions().timeZone;