import React from 'react';

import IconActionBar from './IconActionBar';

const props = {
  boxStyle: 'shadow',
  icons: [
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

describe('<IconActionBar />', () => {
  it('renders without crashing', () => {
    shallow(<IconActionBar {...props} />);
  });

  it('renders its content', () => {
    const rendered = mount(<IconActionBar {...props} />);
    expect(rendered.find('.pyreneIcon-chevronLeft')).toHaveLength(1);
    expect(rendered.find('.pyreneIcon-chevronRight')).toHaveLength(1);
    expect(rendered.find('.shadowBox')).toHaveLength(1);
  });

  it('renders no box', () => {
    props.boxStyle = 'none';
    const rendered = mount(<IconActionBar {...props} />);
    expect(rendered.find('.shadowBox')).toHaveLength(0);
    expect(rendered.find('.borderBox')).toHaveLength(0);
  });

  it('can be interacted with correctly', () => {
    const mockCallBack = jest.fn();
    props.icons[0].onClick = mockCallBack;
    const rendered = shallow(<IconActionBar {...props} />);
    rendered.find('.iconBox').at(0).simulate('click', { preventDefault() {} });
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
