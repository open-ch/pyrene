import React from 'react';
import { shallow, mount } from 'enzyme';

import TextArea from './TextArea';

describe('<TextArea />', () => {
  it('renders without crashing', () => {
    shallow(<TextArea />);
  });

  it('is calling onChange when changed', () => {
    const onChange = jest.fn();
    const rendered = mount(<TextArea onChange={onChange} />);
    rendered.find('textarea').simulate('change');

    expect(onChange).toHaveBeenCalledTimes(1);
  });

});
