export type IsValid = (params: { dateString: string, formatPattern: string, lowerBound?: number, upperBound?: number }) => boolean;

export type DateValidator = {
  errorMessage: string,
  isValid: IsValid,
};
