import React from 'react';

import Title from './Title.jsx';


const props = {
  title: 'Title',
  subtitle: 'Subtitle',
  colorScheme: ['red', 'blue'],
  legend: ['Primary Label', 'Secondary Label'],
};

describe('<Title />', () => {
  it('renders without crashing', () => {
    shallow(<Title {...props} />);
  });

  it('renders its content', () => {
    const rendered = mount(<Title {...props} />);

    expect(rendered.contains('Title')).toBe(true);
    expect(rendered.contains('Subtitle')).toBe(true);

    // legend
    const legendItems = rendered.find({ className: 'legend' }).find({ className: 'legendItem' });
    expect(legendItems.at(0).text()).toBe('Primary Label');
    expect(legendItems.at(0).find('span').prop('style')).toHaveProperty('backgroundColor', 'red');
    expect(legendItems.at(1).text()).toBe('Secondary Label');
    expect(legendItems.at(1).find('span').prop('style')).toHaveProperty('backgroundColor', 'blue');
  });
});
