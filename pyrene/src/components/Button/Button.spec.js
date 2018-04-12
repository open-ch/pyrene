import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Button from './Button.jsx';


describe('<Button />', () => {

    it('renders without crashing', () => {
        const rendered = shallow(<Button />);
    });

    it('is clickable', () => {
        const onClick = sinon.spy();
        const rendered = shallow(<Button onClick={onClick} />);
        rendered.find('button').simulate('click');

        expect(onClick).to.have.property('callCount', 1);
    });

    it('renders the label', () => {
        const rendered = shallow(<Button label="My Label" />);
        expect(rendered.contains("My Label")).to.equal(true);
    });
});
