import React from 'react';
import { shallow, mount } from 'enzyme';

import Icon from './Icon.jsx';

const props = {
  name: 'home',
  color: 'rgba(229, 0, 255, 0.96)',
};

describe('<Icon />', () => {
  it('renders without crashing', () => {
    shallow(<Icon {...props} />);
  });

  it('renders icon font', () => {
    const rendered = shallow(<Icon {...props} />);
    expect(rendered.find('.pyreneIcon-home')).toHaveLength(1);
    expect(rendered.find('.pyreneIcon-home').prop('style').color).toBe('rgba(229, 0, 255, 0.96)');
  });

  it('renders svg icon', () => {
    const svgIcon = './mysvgicons/icon.svg';
    const rendered = mount(<Icon svg={svgIcon} />);
    expect(rendered.find('img').prop('src')).toBe('./mysvgicons/icon.svg');
  });
});
