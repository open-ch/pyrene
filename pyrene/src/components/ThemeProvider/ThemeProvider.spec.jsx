import React from 'react';
import { shallow } from 'enzyme';

import ThemeProvider, { themePropertyToCssCustomProperty, themePropertiesToStyles } from './ThemeProvider';


describe('themePropertyToCssCustomProperty', () => {
  it('prepends --', () => {
    expect(themePropertyToCssCustomProperty('test')).toBe('--test');
  });

  it('changes camelcase', () => {
    expect(themePropertyToCssCustomProperty('testProp')).toBe('--test-prop');
  });

});

describe('themePropertiesToStyles', () => {
  it('changes theme property to style', () => {
    expect(themePropertiesToStyles({
      primaryColor: 'black',
    })).toStrictEqual({
      '--primary-color': 'black',
    });
  });

});


describe('<ThemeProvider />', () => {

  it('renders without crashing', () => {
    shallow(<ThemeProvider colors={{ primary: 'black' }}><span /></ThemeProvider>);
  });
});
