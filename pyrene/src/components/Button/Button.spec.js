import React from 'react';

import Button from './Button.jsx';

describe('<Button />', () => {

  it('renders without crashing', () => {
    shallow(<Button />);
  });

  it('is clickable', () => {
    const onClick = jest.fn();
    const rendered = shallow(<Button onClick={onClick} />);
    rendered.find('button').simulate('click');

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is not clickable if disabled', () => {
    const onClick = jest.fn();
    const rendered = mount(<Button onClick={onClick} disabled={true} />);
    rendered.find('button').simulate('click');

    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders the label', () => {
    const rendered = shallow(<Button label="My Label" />);
    expect(rendered.contains('My Label')).toBe(true);
  });

  it('renders the html for icons', () => {
    const rendered = shallow(<Button icon={'someIcon'}/>);
    expect(rendered.find('.pyreneIcon-someIcon')).toHaveLength(1);
  });
});
