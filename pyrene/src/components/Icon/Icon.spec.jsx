import React from 'react';
import Icon from './Icon.jsx';

const props = {
  icon: 'home',
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
    const rendered = mount(<Icon icon={svgIcon} />);
    expect(rendered.find('img').prop('src')).toBe('./mysvgicons/icon.svg');
  });
});
