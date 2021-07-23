/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { shallow } from 'enzyme';

import Badge, { BadgeProps } from './Badge';

const props: BadgeProps = {
  label: 'Security Alert',
  maxWidth: 80,
  type: 'danger',
};

describe('<Badge />', () => {
  it('renders without crashing', () => {
    shallow(<Badge {...props} />);
  });

  it('renders a danger badge', () => {
    const rendered = shallow(<Badge {...props} />);
    const text = rendered.text();
    const className = rendered.prop('className');
    expect(text).toBe('Security Alert');
    expect(className).toContain('type-danger');
  });

  it('renders a info badge', () => {
    const rendered = shallow(<Badge type="info" label="Info" maxWidth={100} />);
    const text = rendered.text();
    const className = rendered.prop('className');
    expect(text).toBe('Info');
    expect(className).toContain('type-info');
  });

  it('renders a warning badge', () => {
    const rendered = shallow(<Badge type="warning" label="Warning" maxWidth={100} />);
    const text = rendered.text();
    const className = rendered.prop('className');
    expect(text).toBe('Warning');
    expect(className).toContain('type-warning');
  });

  it('renders a success badge', () => {
    const rendered = shallow(<Badge type="success" label="Success" maxWidth={100} />);
    const text = rendered.text();
    const className = rendered.prop('className');
    expect(text).toBe('Success');
    expect(className).toContain('type-success');
  });

  it('renders a neutral badge', () => {
    const rendered = shallow(<Badge type="neutral" label="Neutral" maxWidth={100} />);
    const text = rendered.text();
    const className = rendered.prop('className');
    expect(text).toBe('Neutral');
    expect(className).toContain('type-neutral');
  });
  it('renders an outage badge', () => {
    const rendered = shallow(<Badge type="outage" label="Outage" maxWidth={100} />);
    const text = rendered.text();
    const className = rendered.prop('className');
    expect(text).toBe('Outage');
    expect(className).toContain('type-outage');
  });

  it('reacts to clicking', () => {
    const onClick = jest.fn();
    const rendered = shallow(<Badge {...props} onClick={onClick} />);
    rendered.simulate('click');
    expect(onClick).toHaveBeenCalledTimes(1);
  });

});
