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
 * Returns the Date Object of provided timestamp in provided timezone
 * @param {number} timestamp
 * @param {string} timezone
 */
export const convertToZoneTime = (timestamp: number, timezone: string): Date => utcToZonedTime(timestamp, timezone);

/**
 * Returns the Date Object of provided datetime parameter in UTC
 * @param {string | number | Date} datetime
 * @param {string} timezone
 */
export const convertToUTCtime = (datetime: string | number | Date, timezone: string): Date => zonedTimeToUtc(datetime, timezone);

/**
 * Returns the timestamp of a point in time in the future relative to now
 * @param {Duration} duration
 */
export const getFutureDate = (duration: Duration): number => add(new Date(), duration).getTime();

/**
 * Returns the timestamp of a point in time in the past relative to now
 * @param {Duration} duration
 */
export const getPastDate = (duration: Duration): number => sub(new Date(), duration).getTime();

/** Checks if a timezone string is valid
* @param {string} timezone
*/
export const isValidTimeZone = (timezone: string): boolean => {
  try {
    utcToZonedTime(new Date(), timezone);
    return true;
  } catch {
    return false;
  }
};

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

/**
 * Returns a Date string formatted to the pattern parameter
 * @param {Date | string} date
 * @param {string} pattern
 * @returns {string | undefined}
 */
export const customDateFormat = (date: Date | string, pattern: string): string | undefined => {
  if (typeof date === 'string') {
    const parsed = parse(date, pattern, new Date());
    return format(parsed, pattern);
  }

  if (date instanceof Date && date.getTime() != null) {
    return format(date, pattern);
  }

  return undefined;
};

export const customStringToDate = (datestring: string, pattern: string): Date => parse(datestring, pattern, new Date());

/**
 * Checks if a timestamp is within a certain range
 * @param {number} timestampToCheck
 * @param {number} minimumValue
 * @param {number} maximumValue
 * @returns {number}
 */
export const inRange = (timestampToCheck: number, minimumValue: number, maximumValue: number): number => {
  if (timestampToCheck < minimumValue) {
    return -1;
  }
  if (timestampToCheck > maximumValue) {
    return 1;
  }
  return 0;
};

/**
 * Returns the error string of a date validation object
 * @param dateValObj
 * @returns {string}
 */
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

/**
 * Checks if a date validation object has any errors
 * @param dateValObj
 * @returns {boolean}
 */
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

/**
 * Checks if a time string has errors
 * @param timestring
 * @param timeFormat
 * @returns {boolean}
 */
export const hasTimeError = (timestring: string, timeFormat: string): boolean => {
  if (timestring.length <= timeFormat.length) {
    if (timestring.length < timeFormat.length || (timestring.length === timeFormat.length && !Number.isNaN(customStringToDate(timestring, timeFormat).valueOf()))) {
      return false;
    }
  }
  return true;
};

/**
 * Returns the time zone string from a client's browser
 * @returns {string}
 */
export const getClientTimeZone = (): string => Intl.DateTimeFormat().resolvedOptions().timeZone;
