import React from 'react';
import { shallow } from 'enzyme';

import KeyValueTable, { KeyValueTableProps } from './KeyValueTable.tsx';


const props: KeyValueTableProps = {
  rows: [{
    key: 'keyValue',
    value: 'dataValue',
  }],
  title: 'Table header',
};

const fullProps: KeyValueTableProps = {
  ...props,
  keyWidth: 100,
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
    const rendered = shallow(<KeyValueTable {...fullProps} />);
    const style = rendered.find('.keyValueCellKey').prop('style');
    expect(style).toHaveProperty('width', 100);
    expect(style).toHaveProperty('minWidth', 100);
    expect(style).toHaveProperty('maxWidth', 100);
  });
});
