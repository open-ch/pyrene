import React from 'react';
import LabelAndValue from './LabelAndValue';

const props = {
  label: 'someLabel',
  value: 'somePath',
};

const propsLarge = {
  ...props,
  size: 'large',
};

describe('<LabelAndValue />', () => {
  it('renders without crashing', () => {
    shallow(<LabelAndValue {...props} />);
  });

  it('renders the label', () => {
    const rendered = shallow(<LabelAndValue {...props} />);
    expect(rendered.contains(props.label)).toBe(true);
  });

  it('renders the value', () => {
    const rendered = shallow(<LabelAndValue {...props} />);
    expect(rendered.contains(props.value)).toBe(true);
  });

  it('renders large size', () => {
    const rendered = shallow(<LabelAndValue {...propsLarge} />);
    expect(rendered.find('.label-and-value-large .value')).toHaveLength(1);
  });
});
