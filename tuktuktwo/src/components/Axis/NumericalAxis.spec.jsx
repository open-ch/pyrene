import React from 'react';
import NumericalAxis from './NumericalAxis';
import ScaleUtils from '../../common/ScaleUtils';

const parentSize = { width: 50, height: 40 };

const props = {
  height: parentSize.height,
  orientation: 'left',
  parentSize: parentSize,
  maxValue: 100,
  strokeColor: 'red',
  tickLabelColor: 'blue',
  width: parentSize.width,
};

const svgWrapper = (axis) => (
  <svg width={parentSize.width} height={parentSize.height}>
    {axis}
  </svg>
);

describe('<NumericalAxis />', () => {
  it('renders without crashing', () => {
    shallow(svgWrapper(<NumericalAxis {...props} />));
  });

  it('renders its content', () => {
    const rendered = mount(svgWrapper(<NumericalAxis {...props} />));
    const axis = rendered.find('.vx-axis').at(0);
    expect(axis.prop('className')).toContain('vx-axis-left');
    expect(axis.findWhere((n) => n.text() === '0').exists()).toBe(false);
    expect(axis.findWhere((n) => n.text() === '20').exists()).toBe(true);
    expect(axis.findWhere((n) => n.text() === '40').exists()).toBe(true);
    expect(axis.findWhere((n) => n.text() === '60').exists()).toBe(true);
    expect(axis.findWhere((n) => n.text() === '80').exists()).toBe(true);
    expect(axis.findWhere((n) => n.text() === '100').exists()).toBe(true);
    expect(axis.findWhere((n) => n.text() === '120').exists()).toBe(false);
    expect(axis.find('.vx-axis-line').at(0).prop('stroke')).toEqual('red');
    expect(rendered.find('.vx-line').at(0).prop('stroke')).toEqual('red');
    expect(axis.find('.vx-axis-tick').at(0).find('text').prop('fill')).toEqual('blue');
  });

  it('renders left axis', () => {
    const rendered = mount(svgWrapper(<NumericalAxis {...props} orientation="left" />));
    expect(rendered.find('.vx-axis-left').exists()).toBe(true);
    expect(rendered.find('.vx-rows').exists()).toBe(true);
  });

  it('renders bottom axis', () => {
    const rendered = mount(svgWrapper(<NumericalAxis {...props} orientation="bottom" />));
    expect(rendered.find('.vx-axis-bottom').exists()).toBe(true);
    expect(rendered.find('.vx-columns').exists()).toBe(true);
  });

  it('does not render tick labels', () => {
    const rendered = mount(svgWrapper(<NumericalAxis {...props} showTickLabels={false} />));
    const axis = rendered.find('.vx-axis').at(0);
    expect(axis.find('.vx-axis-tick').exists()).toBe(false);
  });

  it('renders custom tick label format', () => {
    const rendered = mount(svgWrapper(<NumericalAxis {...props} tickFormat={(d) => `${d} custom format`} />));
    const axis = rendered.find('.vx-axis').at(0);
    expect(axis.find('.vx-axis-tick').at(0).text()).toEqual('20 custom format');
  });

  it('does not render grid', () => {
    const rendered = mount(svgWrapper(<NumericalAxis {...props} showGrid={false} />));
    expect(rendered.find('.vx-rows').exists()).toBe(false);
    expect(rendered.find('.vx-columns').exists()).toBe(false);
  });

  it('sets custom scale', () => {
    const rendered = mount(svgWrapper(<NumericalAxis {...props} scale={ScaleUtils.scaleOrdinal(parentSize.width, ['Dropbox', 'Youtube'])} />));
    const axis = rendered.find('.vx-axis').at(0);
    expect(axis.findWhere((n) => n.text() === '20').exists()).toBe(false);
    expect(axis.findWhere((n) => n.text() === 'Dropbox').exists()).toBe(true);
    expect(axis.findWhere((n) => n.text() === 'Youtube').exists()).toBe(true);
    expect(axis.findWhere((n) => n.text() === 'Google').exists()).toBe(false);
  });

});
