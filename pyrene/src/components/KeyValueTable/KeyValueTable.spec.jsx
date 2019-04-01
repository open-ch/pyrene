import React from 'react';

import KeyValueTable from './KeyValueTable.jsx';


const props = {
  rows: [{
    key: 'keyValue',
    value: 'dataValue',
  }],
  title: 'Table header',
};

describe('<KeyValueTable />', () => {
  it('renders without crashing', () => {
    shallow(<KeyValueTable {...props} />);
  });

  it('renders its content', () => {
    const rendered = shallow(<KeyValueTable {...props} />);
    expect(rendered.contains('Table header')).toBe(true);
    expect(rendered.contains('keyValue')).toBe(true);
    expect(rendered.contains('dataValue')).toBe(true);
  });
});
