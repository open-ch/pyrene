import React from 'react';
import { shallow } from 'enzyme';

import ButtonBar from './ButtonBar';

const props = {
  rightButtonSectionElements: [{ label: 'Button1' }],
  leftButtonSectionElements: [{ label: 'Button2' }],
};

describe('<ButtonBar />', () => {
  it('renders without crashing', () => {
    shallow(<ButtonBar {...props} />);
  });

  it('renders its content', () => {
    const rendered = shallow(<ButtonBar {...props} />);

    expect(rendered.find('.leftButtonSection')).toHaveLength(1);
    expect(rendered.find('.rightButtonSection')).toHaveLength(1);
    expect(rendered.find('Button')).toHaveLength(2);
  });
});
