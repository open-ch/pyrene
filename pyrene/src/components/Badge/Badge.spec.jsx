import React from 'react';

import Badge from './Badge';

const props = {
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

  it ('renders label with ellipsis', () => {
    props.label = 'Very Long Security Alert';
    const rendered = shallow(<Badge {...props} />);
    expect(rendered.find('.labelContainer').get(0).props.className).toContain('style-ellipsis');
    expect(rendered.find('.label').get(0).props.className).toContain('style-ellipsis');
  });

  it ('renders label without clipping', () => {
    const rendered = shallow(<Badge {...props} styling="fulltext" />);
    expect(rendered.find('.labelContainer').get(0).props.className).toContain('style-fulltext');
    expect(rendered.find('.label').get(0).props.className).toContain('style-fulltext');
  });

  it('reacts to clicking', () => {
    const onClick = jest.fn();
    const rendered = shallow(<Badge {...props} onClick={onClick} />);
    rendered.simulate('click');
    expect(onClick).toHaveBeenCalledTimes(1);
  });

});
