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

const allowedSeparatorCheck = (valueToCheck: string): boolean => (/[/.:]$/.test(valueToCheck));

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

export const getDateTypeFromddmmyyyyWithSep = (str: string): DateType | undefined => {
  if (str.length === 10 && allowedSeparatorCheck(str.charAt(2)) && allowedSeparatorCheck(str.charAt(5))) {
    const date = { day: +str.substr(0, 2), month: +str.substr(3, 2), year: +str.substr(6) };
    if (!Number.isNaN(date.day) && !Number.isNaN(date.month) && !Number.isNaN(date.year)) {
      return date;
    }
  }
  return undefined;
};

export const getTimeTypeFromhhmmWithSep = (str: string): TimeType | undefined => {
  if (str.length === 5 && allowedSeparatorCheck(str.charAt(2))) {
    const time = { hours: +str.substr(0, 2), minutes: +str.substr(3) };
    if (!Number.isNaN(time.hours) && !Number.isNaN(time.minutes)) {
      return time;
    }
  }
  return undefined;
};

export const inRange = (timestampToCheck: number, minimumValue: number, maximumValue: number): number => {
  if (timestampToCheck < minimumValue) {
    return -1;
  }
  if (timestampToCheck > maximumValue) {
    return 1;
  }
  return 0;
};

export const getErrors = (dateInvalid?: boolean, timeInvalid?: boolean, dateString?: string, minimumValue?: number, maximumValue?: number, timeZone?: string): string => {
  if (timeZone && !isValidTimeZone(timeZone)) {
    return 'Invalid time zone.';
  }

  if (dateString && timeZone) {
    const tmpDate = getDateTypeFromddmmyyyyWithSep(dateString);
    if (tmpDate && isValidDate(tmpDate)) {
      if (typeof minimumValue !== 'undefined' && typeof maximumValue !== 'undefined') {
        const rangePositon = inRange(convertToUTCtime(convertDateTypeToString(tmpDate), timeZone).valueOf(), minimumValue, maximumValue);
        if (rangePositon === -1) {
          return 'Less than minimum date.';
        }
        if (rangePositon === 1) {
          return 'Larger than maximum date.';
        }
      }
    }
  }

  if (dateInvalid && timeInvalid) {
    return 'Invalid date & time format';
  }
  if (dateInvalid) {
    return 'Invalid date format';
  }
  if (timeInvalid) {
    return 'Invalid time format';
  }
  return '';
};


export const errorDateBool = (datestring: string, minimumValue?: number, maximumValue?: number, timeZone?: string): boolean => {
  if (datestring.length <= 10) {
    if ((datestring.length < 10 || isValidDate(getDateTypeFromddmmyyyyWithSep(datestring))) && getErrors(false, false, datestring, minimumValue, maximumValue, timeZone) === '') {
      return false;
    }
  }
  return true;
};

export const errorTimeBool = (timestring: string): boolean => {
  if (timestring.trim().length <= 5) {
    if (timestring.trim().length < 5 || isValidTime(getTimeTypeFromhhmmWithSep(timestring.trim()))) {
      return false;
    }
  }
  return true;
};

export const getClientTimeZone = (): string => Intl.DateTimeFormat().resolvedOptions().timeZone;
