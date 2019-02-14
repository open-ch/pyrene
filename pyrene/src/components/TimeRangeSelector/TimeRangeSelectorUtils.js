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

const convertToDayJs = (value) => {
  const newValue = { ...value };
  if (value.month !== undefined) {
    newValue.month = value.month - 1;
  } else {
    newValue.month = 0;
  }
  if (value.day === undefined) {
    newValue.day = 1;
  }
  return dayjs().set('year', newValue.year).set('month', newValue.month).set('date', newValue.day);
};

const convertToObject = (date, type) => ({
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
  const date = convertToDayJs(value).add(change, type);
  return convertToObject(date, type);
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
  return convertToObject(date, DATE_TYPES.DAY);
};

export const canNavigateForward = (value, upperBound, timeRange) => {
  const upperBoundDate = convertToDayJs(upperBound);
  const valueDate = convertToDayJs(value);
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
  const lowerBoundDate = convertToDayJs(lowerBound);
  const valueDate = convertToDayJs(value);
  switch (timeRange) {
    case DATE_TYPES.YEAR:
      return value.year > lowerBound.year;
    case DATE_TYPES.MONTH:
      return valueDate.isAfter(lowerBoundDate.set('date', 1));
    default:
      return valueDate.isAfter(lowerBoundDate);
  }
};
