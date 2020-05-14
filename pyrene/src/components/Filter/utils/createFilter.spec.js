import * as createFilter from './createFilter';

describe('isNullFilter', () => {
  it('for text returns true on null', () => {
    expect(createFilter.isNullFilter('text', null)).toBe(true);
  });

  it('for text returns true on empty', () => {
    expect(createFilter.isNullFilter('text', '')).toBe(true);
  });

  it('for singleSelect returns true on falsy', () => {
    expect(createFilter.isNullFilter('singleSelect', undefined)).toBe(true);
  });

  it('for multiSelect returns true on undefined', () => {
    expect(createFilter.isNullFilter('multiSelect', undefined)).toBe(true);
  });

  it('for multiSelect returns true on empty array', () => {
    expect(createFilter.isNullFilter('multiSelect', [])).toBe(true);
  });
});

describe('getSubstringFunc', () => {
  it('returns false on missing', () => {
    expect(createFilter.getSubstringFunc('testAccessor')(null, { noTestAccessorFieldHere: 'really' })).toBe(false);
  });

  it('returns false on present but no substring', () => {
    expect(createFilter.getSubstringFunc('testAccessor')('other', { testAccessor: 'really' })).toBe(false);
  });

  it('returns true on present and equal', () => {
    expect(createFilter.getSubstringFunc('testAccessor')('same', { testAccessor: 'same' })).toBe(true);
  });

  it('returns true on present and equal (case-insensitive)', () => {
    expect(createFilter.getSubstringFunc('testAccessor')('same', { testAccessor: 'SAME' })).toBe(true);
  });

  it('returns true on present and equal substring', () => {
    expect(createFilter.getSubstringFunc('testAccessor')('same', { testAccessor: 'not-really-the-SAME' })).toBe(true);
  });

  it('returns false when looking for value in substring', () => {
    expect(createFilter.getSubstringFunc('testAccessor')('not-the-same-wrong-way', { testAccessor: 'same' })).toBe(false);
  });

  it('returns false on present and equal if negation is enabled', () => {
    expect(createFilter.getSubstringFunc('testAccessor', true)('same', { testAccessor: 'same' })).toBeFalsy();
  });

  it('returns true when looking for value in substring if negated enabled and search is wrong', () => {
    expect(createFilter.getSubstringFunc('testAccessor', true)('not-the-same-wrong-way', { testAccessor: 'same' })).toBeTruthy();
  });
});

describe('getEqualFunc', () => {
  it('returns false on missing', () => {
    expect(createFilter.getEqualFunc('testAccessor')(null, { noTestAccessorFieldHere: 'really' })).toBe(false);
  });

  it('returns false on non-equal', () => {
    expect(createFilter.getEqualFunc('testAccessor')(1, { testAccessor: 2 })).toBe(false);
  });

  it('returns true on equal', () => {
    expect(createFilter.getEqualFunc('testAccessor')(1, { testAccessor: 1 })).toBe(true);
  });

  it('returns true on toString() equal', () => {
    expect(createFilter.getEqualFunc('testAccessor')(1, { testAccessor: '1' })).toBe(true);
  });

  it('returns true on non-equal if negated', () => {
    expect(createFilter.getEqualFunc('testAccessor', true)(1, { testAccessor: 2 })).toBeTruthy();
  });
});

describe('getSingleFilterFunc', () => {

  it('returns true on text', () => {
    const filterDefinition = {
      type: 'text',
      accessor: 'test',
    };
    expect(createFilter.getSingleFilterFunc(filterDefinition, 'filterValue')({ test: 'filterValue' })).toBe(true);
  });

  it('returns false on negated text', () => {
    const filterDefinition = {
      type: 'text',
      accessor: 'test',
      negated: true,
    };
    expect(createFilter.getSingleFilterFunc(filterDefinition, 'filterValue')({ test: 'filterValue' })).toBeFalsy();
  });

  it('returns true on accessor as a function', () => {
    const filterDefinition = {
      type: 'singleSelect',
      accessor: (d) => d.test.id,
    };
    expect(createFilter.getSingleFilterFunc(filterDefinition, { value: 'filterValue' })({ test: { id: 'filterValue' } })).toBe(true);
  });

  it('for text calls customFilter', () => {
    const mock = jest.fn();
    const filterDefinition = {
      type: 'text',
      customFilter: mock,
    };
    const datum = { test: 'datumValue' };

    createFilter.getSingleFilterFunc(filterDefinition, 'filterValue')(datum);
    expect(mock).toBeCalledWith('filterValue', datum);
  });

  it('for singleSelect calls customFilter', () => {
    const mock = jest.fn();
    const filterDefinition = {
      type: 'singleSelect',
      customFilter: mock,
    };
    const datum = { test: 'datumValue' };

    createFilter.getSingleFilterFunc(filterDefinition, { value: 'filterValue' })(datum);
    expect(mock).toBeCalledWith('filterValue', datum);
  });

  it('for multiSelect calls customFilter per selected value', () => {
    const mock = jest.fn();
    const filterDefinition = {
      type: 'multiSelect',
      customFilter: mock,
    };
    const datum = { test: 'datumValue' };
    const filterValues = [{ value: 'filterValue1' }, { value: 'filterValue2' }];

    createFilter.getSingleFilterFunc(filterDefinition, filterValues)(datum);
    expect(mock.mock.calls).toEqual([[filterValues[0].value, datum], [filterValues[1].value, datum]]);
  });

  it('for multiSelect is or-ed between values', () => {
    const filterDefinition = {
      type: 'multiSelect',
      customFilter: (filterValue, datum) => filterValue === datum,
    };
    const datum = 'matchingData';
    const filterValuesTrue = [{ value: 'matchingData' }, { value: 'nonMatching' }];
    const filterValuesFalse = [{ value: 'nonMatching' }, { value: 'nonMatching' }];

    expect(createFilter.getSingleFilterFunc(filterDefinition, filterValuesTrue)(datum)).toBe(true);
    expect(createFilter.getSingleFilterFunc(filterDefinition, filterValuesFalse)(datum)).toBe(false);
  });
});


describe('getCombinedFilterFunc', () => {

  const filterDefinitions = [{
    type: 'text',
    accessor: 'test1',
    id: 'test1',
  }, {
    type: 'text',
    accessor: 'test2',
    id: 'test2',
  }];

  const negatedFilterDefinitions = [{
    type: 'text',
    accessor: 'test1',
    id: 'test1',
  }, {
    type: 'text',
    accessor: 'test2',
    id: 'test2',
    negated: true,
  }];

  const datum = {
    test1: 'test1value',
    test2: 'test2value',
  };

  it('returns true if there are no filters', () => {
    expect(createFilter.getCombinedFilterFunc([], {})('whatever')).toBe(true);
  });

  it('ignores missing filterValues', () => {
    expect(createFilter.getCombinedFilterFunc(filterDefinitions, {})(datum)).toBe(true);
  });

  it('ignores considers present filterValues', () => {
    expect(createFilter.getCombinedFilterFunc(filterDefinitions, {
      test1: 'test1value',
    })(datum)).toBe(true);
  });

  it('takes AND of filterValues', () => {
    expect(createFilter.getCombinedFilterFunc(filterDefinitions, {
      test1: 'test1value',
      test2: 'nottest-2-value',
    })(datum)).toBe(false);

    expect(createFilter.getCombinedFilterFunc(filterDefinitions, {
      test1: 'test1value',
      test2: 'test2value',
    })(datum)).toBe(true);
  });

  it('takes AND of filterValues if negated', () => {
    expect(createFilter.getCombinedFilterFunc(negatedFilterDefinitions, {
      test1: 'test1value',
      test2: 'nottest-2-value',
    })(datum)).toBeTruthy();

    expect(createFilter.getCombinedFilterFunc(negatedFilterDefinitions, {
      test1: 'test1value',
      test2: 'test2value',
    })(datum)).toBeFalsy();
  });
});

describe('getCombinedFilterFunc calls', () => {
  it('custom functions mulitple', () => {
    const mock1 = jest.fn().mockReturnValue(true);
    const mock2 = jest.fn().mockReturnValue(true);
    const filterDefinitions = [{
      type: 'text',
      customFilter: mock1,
      id: 'test1',
    }, {
      type: 'text',
      customFilter: mock2,
      id: 'test2',
    }];

    const datum = { test1: 'test1value', test2: 'test2value' };
    const filterValues = { test1: 'test1value', test2: 'test2value' };

    createFilter.getCombinedFilterFunc(filterDefinitions, filterValues)(datum);
    expect(mock1).toBeCalledWith('test1value', datum);
    expect(mock2).toBeCalledWith('test2value', datum);

  });

  it('custom functions single', () => {
    const mock1 = jest.fn().mockReturnValue(false); // false, no further function calls
    const mock2 = jest.fn().mockReturnValue(true);
    const filterDefinitions = [{
      type: 'text',
      customFilter: mock1,
      id: 'test1',
    }, {
      type: 'text',
      customFilter: mock2,
      id: 'test2',
    }];

    const datum = { test1: 'test1value', test2: 'test2value' };
    const filterValues = { test1: 'test1value', test2: 'test2value' };

    createFilter.getCombinedFilterFunc(filterDefinitions, filterValues)(datum);
    expect(mock1).toBeCalledWith('test1value', datum);
    expect(mock2).not.toHaveBeenCalled();

  });
});

describe('getOptionsFromData', () => {
  it('gets options', () => {
    const optionsAccessors = {
      value: (d) => d.id,
      label: (d) => d.name,
    };

    const data = [{
      id: 'id1',
      name: 'name1',
    }, {
      id: 42,
      name: '42',
    }, {
      id: null,
      name: 'null',
    }, {
      id: true,
      name: 'true',
    }];

    const options = [{ value: 'id1', label: 'name1' }, { value: 42, label: '42' }, { value: null, label: 'null' }, { value: true, label: 'true' }];

    expect(createFilter.getOptionsFromData(optionsAccessors, data)).toMatchObject(options);
  });

  it('gets unique options', () => {
    const optionsAccessors = {
      value: (d) => d.id,
      label: (d) => d.name,
    };

    const data = [{
      id: 'id1',
      name: 'name1',
    }, {
      id: 'id1',
      name: 'name2',
    }];

    const options = [{ value: 'id1', label: 'name1' }];

    expect(createFilter.getOptionsFromData(optionsAccessors, data)).toMatchObject(options);
  });
});

describe('getFilterProps', () => {
  it('turns definition into props', () => {
    const filterDefinitions = [{
      id: 'testId',
      label: 'testLabel',
      type: 'testType',
      negated: true,
      options: [{ value: 'testValue1', label: 'testLabel1' }],
    }];

    const filterProps = [{
      id: 'testId',
      label: 'testLabel',
      type: 'testType',
      negated: true,
      options: [{ value: 'testValue1', label: 'testLabel1' }],
    }];

    expect(createFilter.getFilterProps(filterDefinitions)).toMatchObject(filterProps);
  });

  it('does not add negated properties if not provided', () => {
    const filterDefinitions = [{
      id: 'testId',
      label: 'testLabel',
      type: 'testType',
      options: [{ value: 'testValue1', label: 'testLabel1' }],
    }];

    const filterProps = [{
      id: 'testId',
      label: 'testLabel',
      type: 'testType',
      negated: false,
      options: [{ value: 'testValue1', label: 'testLabel1' }],
    }];

    expect(createFilter.getFilterProps(filterDefinitions)).not.toMatchObject(filterProps);
  });

  it('accesses the data', () => {
    const filterDefinitions = [{
      id: 'testId',
      label: 'testLabel',
      type: 'testType',
      optionsAccessors: {
        value: (d) => d.id,
        label: (d) => d.name,
      },
    }];

    const data = [{
      id: 'id1',
      name: 'name1',
    }, {
      id: 'id2',
      name: 'name2',
    }];

    const filterProps = [{
      id: 'testId',
      label: 'testLabel',
      type: 'testType',
      options: [{ value: 'id1', label: 'name1' }, { value: 'id2', label: 'name2' }],
    }];

    expect(createFilter.getFilterProps(filterDefinitions, data)).toMatchObject(filterProps);
  });
});
