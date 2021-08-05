import { parse, isValid, isBefore, isAfter, addYears, subYears } from 'date-fns';
import { DateValidator } from './types';

const MESSAGE_INVALID_DATE = 'Invalid date format';
const MESSAGE_DATE_TOO_FORWARD = 'Larger than maximum date';
const MESSAGE_DATE_TOO_BACKWARD = 'Less than minimum date';

const isValidDate = (dateString: string, formatString: string) => isValid(parse(dateString, formatString, new Date()));

const dateValidValidator: DateValidator = {
    errorMessage: MESSAGE_INVALID_DATE,
    isValid: isValidDate,
};

const dateTooBackwardValidator: DateValidator = {
    errorMessage: MESSAGE_DATE_TOO_BACKWARD,
    isValid: (date: string, formatString: string) => {
        const parsedDate = parse(date, formatString, new Date());
        const today = new Date();
        const twoYearsBefore = subYears(today, 2);
        return !isBefore(parsedDate, twoYearsBefore);
    },
};

const dateTooForwardValidator: DateValidator = {
    errorMessage: MESSAGE_DATE_TOO_FORWARD,
    isValid: (date: string, formatString: string) => {
        const parsedDate = parse(date, formatString, new Date());
        const today = new Date();
        const twoYearsAfter = addYears(today, 2);
        return !isAfter(parsedDate, twoYearsAfter);
    },
};

const dateValidators: Array<DateValidator> = [
    dateValidValidator,
    dateTooBackwardValidator,
    dateTooForwardValidator,
];

export {
    isValidDate,
    dateValidValidator,
    dateTooForwardValidator,
    dateTooBackwardValidator,
    dateValidators,
}
