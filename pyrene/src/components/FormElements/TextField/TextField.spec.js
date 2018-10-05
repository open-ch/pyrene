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

});