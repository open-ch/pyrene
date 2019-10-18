import React from 'react';

import ActionBar from './ActionBar';

const props = {
  styling: 'shadow',
  actions: [
    {
      icon: 'chevronLeft',
      color: 'neutral300',
      active: true,
      onClick: () => {},
    },
    {
      icon: 'chevronRight',
      color: 'neutral300',
      active: false,
      onClick: () => {},
    },
  ],
};

describe('<ActionBar />', () => {
  it('renders without crashing', () => {
    shallow(<ActionBar {...props} />);
  });

  it('renders its content', () => {
    const rendered = mount(<ActionBar {...props} />);
    expect(rendered.find('.pyreneIcon-chevronLeft')).toHaveLength(1);
    expect(rendered.find('.pyreneIcon-chevronRight')).toHaveLength(1);
    expect(rendered.find('.shadow')).toHaveLength(1);
  });

  it('renders no box', () => {
    props.styling = 'none';
    const rendered = mount(<ActionBar {...props} />);
    expect(rendered.find('.shadow')).toHaveLength(0);
    expect(rendered.find('.box')).toHaveLength(0);
  });

  it('can be interacted with correctly', () => {
    const mockCallBack = jest.fn();
    const props1 = {
      actions: [{
        icon: 'chevronLeft',
        active: true,
        onClick: mockCallBack,
      }],
    };
    const rendered = shallow(<ActionBar {...props1} />);
    rendered.find('.iconBox').simulate('click', { preventDefault() {} });
    expect(mockCallBack).toHaveBeenCalledTimes(1);
  });
});
