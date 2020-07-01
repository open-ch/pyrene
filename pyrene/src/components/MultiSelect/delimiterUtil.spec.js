import { getDelimitedValues, getCaseInsensitiveDistinctValues } from './delimiterUtil.js';

describe('getDelimitedValues()', () => {
  it('delimits entries with multiple delimiters', () => {
    const rawString1 = 'Banana\nMango\nBeer\nBeer';
    const rawString2 = 'Banana\tMango\tBeer\tBeer';
    const rawString3 = 'Banana\nMango\tBeer\nBeer';
    const delimitedValues1 = getDelimitedValues(rawString1);
    const delimitedValues2 = getDelimitedValues(rawString2);
    const delimitedValues3 = getDelimitedValues(rawString3);
    expect(delimitedValues1).toStrictEqual(['Banana', 'Mango', 'Beer', 'Beer']);
    expect(delimitedValues2).toStrictEqual(['Banana', 'Mango', 'Beer', 'Beer']);
    expect(delimitedValues3).toStrictEqual(['Banana', 'Mango', 'Beer', 'Beer']);
  });

  it('considers as single entry when there no delimiter is found in string', () => {
    const rawString = 'A tasty mango';
    const delimitedValues = getDelimitedValues(rawString);
    expect(delimitedValues).toStrictEqual(['A tasty mango']);
  });

  it('removes beginning and trailing spaces', () => {
    const rawString = '    Ice-cream\nChocolate\t     ';
    const delimitedValues = getDelimitedValues(rawString);
    expect(delimitedValues).toStrictEqual(['Ice-cream', 'Chocolate']);
  });

  it('filters away empty strings', () => {
    const rawString = 'Banana\n\tMango\n\tBeer';
    const delimitedValues = getDelimitedValues(rawString);
    expect(delimitedValues).toStrictEqual(['Banana', 'Mango', 'Beer']);
  });

  it('returns empty array when string contains nothing', () => {
    const rawString = '';
    const delimitedValues = getDelimitedValues(rawString);
    expect(delimitedValues).toStrictEqual([]);
  });

  it('returns empty array when string contains only delimiters', () => {
    const rawString = '\n\t\t\n';
    const delimitedValues = getDelimitedValues(rawString);
    expect(delimitedValues).toStrictEqual([]);
  });
});

describe('getCaseInsensitiveDistinctValues()', () => {
  it('gets only distinct values', () => {
    const rawString = 'Banana\tMango\nBeer\nBeer';
    const delimitedValues = getDelimitedValues(rawString);
    const distinctValues = getCaseInsensitiveDistinctValues(delimitedValues);
    expect(distinctValues).toStrictEqual(['Banana', 'Mango', 'Beer']);
  });

  it('returns single entry array when string contains repetitive characters but no delimiter', () => {
    const rawString = 'MangoMangoMango MangoMango';
    const delimitedValues = getDelimitedValues(rawString);
    const distinctValues = getCaseInsensitiveDistinctValues(delimitedValues);
    expect(distinctValues).toStrictEqual(['MangoMangoMango MangoMango']);
  });

  it('returns empty array when string contains nothing', () => {
    const rawString = '';
    const delimitedValues = getDelimitedValues(rawString);
    const distinctValues = getCaseInsensitiveDistinctValues(delimitedValues);
    expect(distinctValues).toStrictEqual([]);
  });

  it('returns empty array when string contains only delimiters', () => {
    const rawString = '\n\n\t\t';
    const delimitedValues = getDelimitedValues(rawString);
    const distinctValues = getCaseInsensitiveDistinctValues(delimitedValues);
    expect(distinctValues).toStrictEqual([]);
  });
});
