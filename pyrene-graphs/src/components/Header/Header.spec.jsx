import React from 'react';

import Header from './Header.jsx';


const props = {
  title: 'Title',
  description: 'Description',
  colors: ['red', 'blue'],
  legend: ['Primary Label', 'Secondary Label'],
};

describe('<Header />', () => {
  it('renders without crashing', () => {
    shallow(<Header {...props} />);
  });

  it('renders its content', () => {
    const rendered = mount(<Header {...props} />);

    expect(rendered.contains('Title')).toBe(true);
    expect(rendered.contains('Description')).toBe(true);

    // legend
    const legendItems = rendered.find({ className: 'legend' }).find({ className: 'legendItem' });
    expect(legendItems.at(0).text()).toBe('Primary Label');
    expect(legendItems.at(0).find('span').prop('style')).toHaveProperty('backgroundColor', 'red');
    expect(legendItems.at(1).text()).toBe('Secondary Label');
    expect(legendItems.at(1).find('span').prop('style')).toHaveProperty('backgroundColor', 'blue');
  });
});
