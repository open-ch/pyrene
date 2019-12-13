import React from 'react';
import VerticalLine from './VerticalLine';
import chartConstants from '../../common/chartConstants';

const parentSize = { width: 50, height: 40 };

const props = {
  color: 'red',
  height: 30,
  left: 20,
  strokeWidth: 4,
};

const svgWrapper = (verticalLine) => (
  <svg width={parentSize.width} height={parentSize.height}>
    {verticalLine}
  </svg>
);

describe('<VerticalLine />', () => {
  it('renders without crashing', () => {
    shallow(<VerticalLine {...props} />);
  });

  it('renders its content', () => {
    const rendered = mount(svgWrapper(<VerticalLine {...props} />));

    // Line
    expect(rendered.find('.vx-line')).toHaveLength(1);
    expect(rendered.find('.vx-line').at(0).props().stroke).toBe('red');
    expect(rendered.find('.vx-line').at(0).props().strokeWidth).toBe(4);
    expect(rendered.find('.vx-line').at(0).props().x1).toBe(20);
    expect(rendered.find('.vx-line').at(0).props().x2).toBe(20);
    expect(rendered.find('.vx-line').at(0).props().y1).toBe(30 - chartConstants.marginBottom);
    expect(rendered.find('.vx-line').at(0).props().y2).toBe(0);

  });

});
