import React from 'react';
import { shallow, mount } from 'enzyme';

import Button from './Button';

describe('<Button />', () => {

  it('renders without crashing', () => {
    shallow(<Button label="" />);
  });

  it('renders with react element label', () => {
    shallow(<Button label={(<span>fancy span</span>)} />);
  });

  it('is clickable', () => {
    const onClick = jest.fn();
    const rendered = shallow(<Button onClick={onClick} label="" />);
    rendered.find('button').simulate('click');

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is not clickable if disabled', () => {
    const onClick = jest.fn();
    const rendered = mount(<Button onClick={onClick} label="" disabled />);
    rendered.find('button').simulate('click');

    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders the label', () => {
    const rendered = shallow(<Button label="My Label" />);
    expect(rendered.contains('My Label')).toBe(true);
  });

  it('renders the html for icons', () => {
    const rendered = shallow(<Button icon="share" label="" />);
    expect(rendered.find('.pyreneIcon-share')).toHaveLength(1);
  });
});
