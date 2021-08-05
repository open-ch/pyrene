type DateValidator = {
    errorMessage: string,
    isValid: (input: string, formatString: string) => boolean,
};

export type {
    DateValidator
}