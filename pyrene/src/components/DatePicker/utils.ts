import parse from 'date-fns/parse';
import isValid from 'date-fns/isValid';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import { DateValidator, IsValid } from './types';

const MESSAGE_INVALID_DATE = 'Invalid date format';
const MESSAGE_DATE_ABOVE_UPPER_BOUND = 'Larger than maximum date';
const MESSAGE_DATE_BEFORE_LOWER_BOUND = 'Less than minimum date';

const isValidDate: IsValid = ({ dateString, formatPattern }) => isValid(parse(dateString, formatPattern, new Date()));

const dateValidValidator: DateValidator = {
  errorMessage: MESSAGE_INVALID_DATE,
  isValid: isValidDate,
};

const dateBelowLowerBoundValidator: DateValidator = {
  errorMessage: MESSAGE_DATE_BEFORE_LOWER_BOUND,
  isValid: ({ dateString, formatPattern, lowerBound }) => {
    const parsedDate = parse(dateString, formatPattern, new Date());
    const diff = differenceInMinutes(parsedDate, lowerBound as number);
    const isBefore = diff < 0;
    return !isBefore;
  },
};

const dateAboveUpperBoundValidator: DateValidator = {
  errorMessage: MESSAGE_DATE_ABOVE_UPPER_BOUND,
  isValid: ({ dateString, formatPattern, upperBound }) => {
    const parsedDate = parse(dateString, formatPattern, new Date());
    const diff = differenceInMinutes(parsedDate, upperBound as number);
    const isAfter = diff > 0;
    return !isAfter;
  },
};

const dateValidators: Array<DateValidator> = [dateValidValidator, dateBelowLowerBoundValidator, dateAboveUpperBoundValidator];

const getTimeZoneOnClient = (): string => Intl.DateTimeFormat().resolvedOptions().timeZone;

export {
  getTimeZoneOnClient,
  isValidDate,
  dateValidValidator,
  dateBelowLowerBoundValidator,
  dateAboveUpperBoundValidator,
  dateValidators,
};
