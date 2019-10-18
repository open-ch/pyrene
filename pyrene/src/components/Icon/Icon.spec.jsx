import React from 'react';
import Icon from './Icon.jsx';
import iconExampleSelected from '../Checkbox/checkbox-selected.svg';

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
    const svgIcon = iconExampleSelected;
    const rendered = mount(<Icon icon={svgIcon} iconType="svg" />);
    expect(rendered.find('.SVGInline')).toHaveLength(1);
  });
});
