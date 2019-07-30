import React from 'react';
import IconButton from './IconButton';

const props = {
  icon: 'info',
  path: 'xPath',
  label: 'xLabel',
};

describe('<IconButton />', () => {
  it('renders without crashing', () => {
    shallow(<IconButton {...props} />);
  });

  it('renders icon', () => {
    const rendered = shallow(<IconButton {...props} />);
    expect(rendered.find('span').props().className).toBe('pyreneIcon-' + props.icon);
  });

  it('has path corresponding to prop', () => {
    const rendered = shallow(<IconButton {...props} />);
    expect(rendered.find('a').props().href).toMatch(props.path);
  });
});
