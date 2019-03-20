import React from 'react';
import Link from './Link';

const props = {
  path: 'somePath',
  label: 'someLabel',
};

describe('<Link />', () => {
  it('renders without crashing', () => {
    shallow(<Link {...props} />);
  });

  it('renders label', () => {
    const rendered = shallow(<Link {...props} />);
    expect(rendered.contains(props.label)).toBe(true);
  });

  it('has path corresponding to prop', () => {
    const rendered = shallow(<Link {...props} />);
    expect(rendered.find('a').props().href).toMatch(props.path);
  });
});
