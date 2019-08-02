import React from 'react';

import Badge from './Badge';

const props = {
  label: 'Security Alert',
  type: 'danger',
};

describe('<Badge />', () => {
  it('renders without crashing', () => {
    const rendered = shallow(<Badge {...props} />);
    expect(rendered.contains('Security Alert')).toBe(true);
  });

  it('renders a neutral badge', () => {
    const rendered = shallow(<Badge type={'neutral'} label={'Neutral'}/>);
    const text = rendered.text();
    const className = rendered.prop('className');
    expect(text).toBe('Neutral');
    expect(className).toContain('type-neutral');
  });

  it('renders a danger badge', () => {
    const rendered = shallow(<Badge {...props}/>);
    const text = rendered.text();
    const className = rendered.prop('className');
    expect(text).toBe('Security Alert');
    expect(className).toContain('type-danger');
  });

  it('renders a info badge', () => {
    const rendered = shallow(<Badge type={'info'} label={'Info'}/>);
    const text = rendered.text(); // warning  success
    const className = rendered.prop('className');
    expect(text).toBe('Info');
    expect(className).toContain('type-info');
  });

  it('renders a warning badge', () => {
    const rendered = shallow(<Badge type={'warning'} label={'Warning'}/>);
    const text = rendered.text();
    const className = rendered.prop('className');
    expect(text).toBe('Warning');
    expect(className).toContain('type-warning');
  });

  it('renders a success badge', () => {
    const rendered = shallow(<Badge type={'success'} label={'Success'}/>);
    const text = rendered.text();
    const className = rendered.prop('className');
    expect(text).toBe('Success');
    expect(className).toContain('type-success');
  });

  it('reacts to clicking', () => {
    const onClick = jest.fn();
    const rendered = shallow(<Badge {...props} onClick={onClick}/>);
    rendered.simulate('click');
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  
});