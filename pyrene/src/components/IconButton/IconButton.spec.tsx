import React from 'react';
import { shallow } from 'enzyme';

import IconButton, { IconButtonProps } from './IconButton';

const props: IconButtonProps = {
  icon: 'info',
  path: 'xPath',
};

describe('<IconButton />', () => {
  it('renders without crashing', () => {
    shallow(<IconButton {...props} />);
  });

  it('renders icon', () => {
    const rendered = shallow(<IconButton {...props} />);
    expect(rendered.find('span').props().className).toBe(`pyreneIcon-${props.icon}`);
  });

  it('has path corresponding to prop', () => {
    const rendered = shallow(<IconButton {...props} />);
    expect(rendered.find('a').props().href).toMatch(props.path as string);
  });

  it('forwards clicks to the click handler if not path is set', () => {
    const mockCallBack = jest.fn();
    const rendered = shallow(<IconButton onClick={mockCallBack} {...props} />);
    rendered.find('a').simulate('click', { preventDefault() {} });
    expect(mockCallBack.mock.calls).toHaveLength(1);
  });
});
