import React from 'react';

import ActionBar from './ActionBar';

const props = {
  styling: 'shadow',
  actions: [
    {
      iconName: 'chevronLeft',
      color: 'neutral300',
      active: true,
      onClick: () => {},
    },
    {
      iconName: 'chevronRight',
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
    expect(rendered.find('.box-shadow')).toHaveLength(1);
  });

  it('renders no box', () => {
    props.styling = 'none';
    const rendered = mount(<ActionBar {...props} />);
    expect(rendered.find('.box-shadow')).toHaveLength(0);
    expect(rendered.find('.box-box')).toHaveLength(0);
  });

  it('can be interacted with correctly', () => {
    const mockCallBack = jest.fn();
    const props1 = {
      actions: [{
        iconName: 'chevronLeft',
        active: true,
        onClick: mockCallBack,
      }],
    };
    const rendered = shallow(<ActionBar {...props1} />);
    rendered.find('.iconBox').simulate('click', { preventDefault() {} });
    expect(mockCallBack).toHaveBeenCalledTimes(1);
  });
});
