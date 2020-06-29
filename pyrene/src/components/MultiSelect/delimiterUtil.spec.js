import { getDelimitedValues, getCaseInsensitiveDistinctValues } from './delimiterUtil.js';

describe('getDelimitedValues()', () => {
  it('delimits entries', () => {
    const rawString = 'Banana\nMango\nBeer\nBeer';
    const delimitedValues = getDelimitedValues(rawString);
    expect(delimitedValues).toStrictEqual(['Banana', 'Mango', 'Beer', 'Beer']);
  });
});

describe('getCaseInsensitiveDistinctValues()', () => {
  it('gets only distinct values', () => {
    const rawString = 'Banana\nMango\nBeer\nBeer';
    const delimitedValues = getDelimitedValues(rawString);
    const distinctValues = getCaseInsensitiveDistinctValues(delimitedValues);
    expect(distinctValues).toStrictEqual(['Banana', 'Mango', 'Beer']);
  });
});
