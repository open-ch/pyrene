import React from 'react';
import CategoricalAxis from './CategoricalAxis';

const parentSize = { width: 50, height: 40 };

const props = {
  orientation: 'left',
  parentSize: parentSize,
  tickLabels: ['Dropbox', 'Youtube'],
};

const svgWrapper = axis => (
  <svg width={parentSize.width} height={parentSize.height}>
    {axis}
  </svg>
);

describe('<CategoricalAxis />', () => {
  it('renders without crashing', () => {
    shallow(svgWrapper(<CategoricalAxis {...props} />));
  });

  it('renders its content', () => {
    const rendered = mount(svgWrapper(<CategoricalAxis {...props} />));
    const axis = rendered.find('.vx-axis').at(0);
    expect(axis.prop('className')).toContain('vx-axis-left');
    expect(axis.findWhere(n => n.text() === 'Dropbox').exists()).toBe(true);
    expect(axis.findWhere(n => n.text() === 'Youtube').exists()).toBe(true);
    expect(axis.findWhere(n => n.text() === 'Google').exists()).toBe(false);
  });

  it('renders left axis', () => {
    const rendered = mount(svgWrapper(<CategoricalAxis {...props} orientation="left" />));
    expect(rendered.find('.vx-axis-left').exists()).toBe(true);
  });

  it('renders bottom axis', () => {
    const rendered = mount(svgWrapper(<CategoricalAxis {...props} orientation="bottom" />));
    expect(rendered.find('.vx-axis-bottom').exists()).toBe(true);
  });

  it('does not render tick labels', () => {
    const rendered = mount(svgWrapper(<CategoricalAxis {...props} showTickLabels={false} />));
    const axis = rendered.find('.vx-axis').at(0);
    expect(axis.find('.vx-axis-tick').exists()).toBe(false);
  });

  it('renders custom tick label format', () => {
    const rendered = mount(svgWrapper(<CategoricalAxis {...props} tickFormat={d => `${d} custom format`} />));
    const axis = rendered.find('.vx-axis').at(0);
    expect(axis.find('.vx-axis-tick').at(0).text()).toEqual('Dropbox custom format');
  });

});
