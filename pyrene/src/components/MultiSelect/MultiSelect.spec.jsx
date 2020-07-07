import React from 'react';

import MultiSelect, { createNewValue } from './MultiSelect';

const props = {
  title: 'Title',
  helperLabel: 'Helper label',
  defaultValues: [],
  options: [{ value: 'banana', label: 'Banana', invalid: true }, { value: 'Bacon', label: 'Bacon', invalid: false }],
  rows: 4,
  invalidLabel: 'Invalid label',
};

const pastedData = 'Beer\nBacon\tCheese';

describe('<MultiSelect />', () => {
  it('renders without crashing', () => {
    shallow(<MultiSelect {...props} />);
  });
});

it('renders its content', () => {
  const rendered = shallow(<MultiSelect {...props} />);
  const invalidRendered = shallow(<MultiSelect {...props} invalid />);

  expect(rendered.find('.selectTitle').text()).toBe('Title');
  expect(rendered.find('.selectHelper').text()).toBe('Helper label');
  expect(rendered.find('.invalidLabel')).toHaveLength(0);
  expect(invalidRendered.find('.invalidLabel').text()).toBe('Invalid label');
});

it('handles pasted data with delimiters', () => {
  let testResultValue = null;
  const onChange = (v) => {
    testResultValue = v;
  };
  const rendered = mount(<MultiSelect {...props} onChange={onChange} creatable />);
  const pasteEventData = { clipboardData: { getData: jest.fn().mockReturnValueOnce(pastedData), types: ['text/plain'] } };
  rendered.find('.selectContainer').simulate('paste', pasteEventData);
  expect(testResultValue).toStrictEqual([{ value: 'Beer', label: 'Beer', invalid: false }, { value: 'Bacon', label: 'Bacon', invalid: false }, { value: 'Cheese', label: 'Cheese', invalid: false }]);
});

it('warns about duplicates after pasting data', () => {
  let testResultValue = [{ value: 'bacon', label: 'bacon', invalid: true }];
  const onChange = (v) => {
    testResultValue = v;
  };
  const rendered = mount(<MultiSelect {...props} value={testResultValue} onChange={onChange} creatable />);
  expect(rendered.find('.warningLabel')).toHaveLength(0);

  const pasteEventData = { clipboardData: { getData: jest.fn().mockReturnValueOnce(pastedData), types: ['text/plain'] } };
  rendered.find('.selectContainer').simulate('paste', pasteEventData);
  expect(rendered.find('.warningLabel')).toHaveLength(1);
  expect(testResultValue).toStrictEqual([{ value: 'bacon', label: 'bacon', invalid: true }, { value: 'Beer', label: 'Beer', invalid: false }, { value: 'Cheese', label: 'Cheese', invalid: false }]);
});

it('does not react to paste event when multi select is not creatable', () => {
  let testResultValue = null;
  const onChange = (v) => {
    testResultValue = v;
  };
  const rendered = mount(<MultiSelect {...props} onChange={onChange} />);
  const pasteEventData = { clipboardData: { getData: jest.fn().mockReturnValueOnce(pastedData), types: ['text/plain'] } };
  rendered.find('.selectContainer').simulate('paste', pasteEventData);
  expect(testResultValue).toBe(null);
});

describe('createNewValue()', () => {
  it('creates new value array', () => {
    const options = [];
    const values = ['Banana', 'Mango', 'Beer'];
    const newValue = createNewValue(values, options);
    const expectedNewValue = [{ value: 'Banana', label: 'Banana', invalid: false }, { value: 'Mango', label: 'Mango', invalid: false }, { value: 'Beer', label: 'Beer', invalid: false }];
    expect(newValue).toStrictEqual(expectedNewValue);
  });

  it('takes matching option', () => {
    const options = [{ value: 'banana', label: 'Banana', invalid: true }];
    const values = ['Banana', 'Mango', 'Beer'];
    const newValue = createNewValue(values, options);
    const expectedNewValue = [{ value: 'banana', label: 'Banana', invalid: true }, { value: 'Mango', label: 'Mango', invalid: false }, { value: 'Beer', label: 'Beer', invalid: false }];
    expect(newValue).toStrictEqual(expectedNewValue);
  });
});
