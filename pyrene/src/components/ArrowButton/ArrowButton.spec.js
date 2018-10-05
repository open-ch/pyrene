import React from 'react';

import ArrowButton from './ArrowButton';

const props = {
  direction: 'up'
};

describe('<ArrowButton />', () => {
  it('renders without crashing', () => {
    shallow(<ArrowButton {...props} />);
  });

  it('is clickable', () => {
    const onClick = jest.fn();
    const rendered = shallow(<ArrowButton {...props} onClick={onClick} />);
    rendered.find('button').simulate('click');

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is not clickable if disabled', () => {
    const onClick = jest.fn();
    const rendered = mount(<ArrowButton {...props} onClick={onClick} disabled={true} />);
    rendered.find('button').simulate('click');

    expect(onClick).not.toHaveBeenCalled();
  });
});
