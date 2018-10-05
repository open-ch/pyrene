import React from 'react';



import Banner from './Banner.jsx';

const props = {
  label: 'TestMessage',
  type: 'info',
};

describe('<Banner />', () => {

  it('renders without crashing', () => {
    const rendered = shallow(<Banner {...props} />);
  });

  it('is clearable except if it is of type error', () => {
    const onClick = jest.fn();
    const rendered = shallow(<Banner {...props} onClear={onClick} />);
    rendered.find('.clearIcon').simulate('click');

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('has a clearIcon', () => {
    let rendered = shallow(<Banner {...props} type={'info'} />);
    expect(rendered.find('.clearIcon')).toHaveLength(1);

    rendered = shallow(<Banner {...props} type={'success'}  />);
    expect(rendered.find('.clearIcon')).toHaveLength(1);

    rendered = shallow(<Banner {...props} type={'warning'} />);
    expect(rendered.find('.clearIcon')).toHaveLength(1);
  });

  it('has no clearIcon when the type is error or loading', () => {
    let rendered = shallow(<Banner {...props} type={'error'} />);
    expect(rendered.find('.clearIcon')).toHaveLength(0);

    rendered = shallow(<Banner {...props} type={'loading'} />);
    expect(rendered.find('.clearIcon')).toHaveLength(0);
  });

  it('renders the icon', () => {
    const rendered = shallow(<Banner {...props} />);
    expect(rendered.find('.bannerIcon')).toHaveLength(1);
  });

  it('renders the message', () => {
    const rendered = shallow(<Banner {...props} />);
    expect(rendered.contains('TestMessage')).toBe(true);
  });

});
