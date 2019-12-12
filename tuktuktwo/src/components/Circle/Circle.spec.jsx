import React from 'react';
import Circle from './Circle';

const parentSize = { width: 50, height: 40 };

const props = {
  borderStrokeWidth: 4,
  colors: {
    border: 'red',
    fill: 'blue',
  },
  radius: 10,
  x: 25,
  y: 15,
};

const svgWrapper = (circle) => (
  <svg width={parentSize.width} height={parentSize.height}>
    {circle}
  </svg>
);

describe('<Circle />', () => {
  it('renders without crashing', () => {
    shallow(<Circle {...props} />);
  });

  it('renders its content', () => {
    const rendered = mount(svgWrapper(<Circle {...props} />));
    // Line
    expect(rendered.find('.vx-circle')).toHaveLength(1);
    expect(rendered.find('.vx-circle').at(0).props().strokeWidth).toBe(4);
    expect(rendered.find('.vx-circle').at(0).props().stroke).toBe('red');
    expect(rendered.find('.vx-circle').at(0).props().fill).toBe('blue');
    expect(rendered.find('.vx-circle').at(0).props().r).toBe(10);
    expect(rendered.find('.vx-circle').at(0).props().cx).toBe(25);
    expect(rendered.find('.vx-circle').at(0).props().cy).toBe(15);
  });

});
