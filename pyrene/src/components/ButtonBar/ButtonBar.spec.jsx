import React from 'react';

import ButtonBar from './ButtonBar';
import Button from '../Button/Button';

const props = {
  rightButtonSectionElements: [<Button label="Button1" />],
  leftButtonSectionElements: [<Button label="Button2" />],
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
