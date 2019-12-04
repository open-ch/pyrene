import React from 'react';

import TextField from './TextField';

describe('<TextField />', () => {
  it('renders without crashing', () => {
    shallow(<TextField />);
  });


  it('is calling onChange when changed', () => {
    const onChange = jest.fn();
    const rendered = mount(<TextField onChange={onChange} />);
    rendered.find('input[type="text"]').simulate('change');

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('is calling onSubmit on Enter', () => {
    const onSubmit = jest.fn();
    const rendered = mount(<TextField value="testValue" onSubmit={onSubmit} />);
    rendered.find('input[type="text"]').simulate('keyDown', { key: 'Enter' });

    expect(onSubmit).toHaveBeenCalledWith('testValue');
  });
});
