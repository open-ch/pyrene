import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import ButtonBar from './ButtonBar';
import Button from '../Button/Button';

const props = {
  rightButtonSectionElements: [<Button label={'Button1'} />],
  leftButtonSectionElements: [<Button label={'Button2'} />],
};

describe('<ButtonBar />', () => {
  it('renders without crashing', () => {
    const rendered = shallow(<ButtonBar {...props} />);
  });

  it('renders its content', () => {
    const rendered = shallow(<ButtonBar {...props} />);

    expect(rendered.find('.leftButtonSection')).to.have.length(1);
    expect(rendered.find('.rightButtonSection')).to.have.length(1);
    expect(rendered.find('Button')).to.have.length(2);
  });
});