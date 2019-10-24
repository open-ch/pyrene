import moment from 'moment-timezone';

const DAY = 'day';
const MONTH = 'month';
const YEAR = 'year';

export const DATE_TYPES = {
  DAY,
  MONTH,
  YEAR,
};

/**
 * Converts our custom date object to a moment instance
 * Because the momth of the internal object is 0-indexed and
 * externally the dates are passed in as 1-indexed, we need to convert them
 *
 * @param {Object} value
 * @returns {moment} moment instance
 */
export const convertToInternalMomentJs = value => moment().tz('UTC').set({ year: value.year, month: value.month - 1, date: value.day });

/**
 * Converts a dayjs instance to our custom date object format
 * It is passed a date instance and the type of object which is expected to be returned
 * 1. Year - { year }
 * 2. Month - { year, month }
 * 3. Day - { year, month, day }
 * It also increases the month number by 1 so that it is 1-indexed
 *
 * @param {dayjs} date
 * @returns {Object}
 */
const convertToExternalObject = date => ({
  year: date.year(),
  month: date.month() + 1,
  day: date.date(),
});


/**
 * Handles the date change and returns a incremented/decreased value
 * @param {*} value to be changed
 * @param {*} change change direction +1/-1
 * @param timeUnit which timeUnit we are currently changing: YEAR, MONTH or DAY
 */
export const handleDateChange = (value, change, timeUnit) => {
  let conversionDate = value;
  // If we are changing Month or Year, set the date to the first of the month.
  if (timeUnit === MONTH || timeUnit === YEAR) {
    conversionDate.day = 1;
  }
  if (timeUnit === YEAR) {
    conversionDate.month = 1;
  }
  conversionDate = convertToInternalMomentJs(conversionDate).add(change, timeUnit + 's');
  return convertToExternalObject(conversionDate);
};

/**
 * Provides the current date object in the `value` prop format
 */
export const getCurrentDate = () => {
  const date = moment().utc();
  return convertToExternalObject(date);
};

export const canNavigateForward = (value, upperBound, timeRange) => {
  const upperBoundDate = convertToInternalMomentJs(upperBound);
  const valueDate = convertToInternalMomentJs(value);
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
  const lowerBoundDate = convertToInternalMomentJs(lowerBound);
  const valueDate = convertToInternalMomentJs(value);
  switch (timeRange) {
    case DATE_TYPES.YEAR:
      return value.year > lowerBound.year;
    case DATE_TYPES.MONTH:
      return valueDate.isAfter(lowerBoundDate.set('date', 1));
    default:
      return valueDate.isAfter(lowerBoundDate);
  }
};
