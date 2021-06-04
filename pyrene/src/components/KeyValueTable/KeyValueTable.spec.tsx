import React from 'react';
import { shallow } from 'enzyme';

import KeyValueTable, { KeyValueTableProps } from './KeyValueTable';


const props: KeyValueTableProps = {
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

  it('can define key width', () => {
    const rendered = shallow(<KeyValueTable {...props} keyWidth={100} />);
    const style = rendered.find('.keyValueCellKey').prop('style');
    expect(style?.width).toBe(100);
    expect(style?.minWidth).toBe(100);
    expect(style?.maxWidth).toBe(100);
  });
});
