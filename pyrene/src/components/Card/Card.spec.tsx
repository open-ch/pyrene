import React from 'react';
import { shallow } from 'enzyme';
import Card from './Card';
import Banner from '../Banner/Banner';
import Loader from '../Loader/Loader';

describe('Card', () => {

  const FakeChild = () => (<div>42</div>);

  it('renders without crashing', () => {
    shallow(<Card><FakeChild /></Card>);
  });

  it('renders header and footer if set', () => {
    const FakeHeader = () => (<div>Dont</div>);
    const FakeFooter = () => (<div>Panic</div>);

    const card = shallow(<Card header={<FakeHeader />} footer={<FakeFooter />}><FakeChild /></Card>);

    expect(card.find(FakeHeader)).toHaveLength(1);
    expect(card.find(FakeChild)).toHaveLength(1);
    expect(card.find(FakeFooter)).toHaveLength(1);

  });

  it('renders multiple children', () => {

    const card = shallow(
      <Card>
        <FakeChild />
        <FakeChild />
        <FakeChild />
      </Card>,
    );

    expect(card.find(FakeChild)).toHaveLength(3);

  });

  it('renders error when set', () => {
    const card = shallow(<Card error="Oh no! Not again!"><FakeChild /></Card>);

    expect(card.find(Banner)).toHaveLength(1);
    expect(card.find(FakeChild)).toHaveLength(0);
  });

  it('do not render loading when error is set, ', () => {
    const card = shallow(<Card error="Oh no! Not again!"><FakeChild /></Card>);

    expect(card.find(Banner)).toHaveLength(1);
    expect(card.find(FakeChild)).toHaveLength(0);
    expect(card.find(Loader)).toHaveLength(0);
  });

  it('loading when loading is true, ', () => {
    const card = shallow(<Card loading><FakeChild /></Card>);

    expect(card.find(Loader)).toHaveLength(1);
    expect(card.find(FakeChild)).toHaveLength(0);
  });

});
