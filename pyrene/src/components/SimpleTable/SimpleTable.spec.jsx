import React from 'react';

import SimpleTable from './SimpleTable.jsx';


const props = {
  data: [{ name: 'Meredith Carney', age: 23 }, { name: 'Savage Weeks', age: 21 }],
  columns: [
    { id: 'name', headerName: 'Name', accessor: 'name' },
    { id: 'age', headerName: 'Age', accessor: (d) => d.age },
    {
      id: 'customAge',
      headerName: 'Custom Age',
      accessor: (d) => d.age,
      cellRenderCallback: (d) => `Custom age is ${d.value}`,
    },
  ],
};

describe('<SimpleTable />', () => {
  it('renders without crashing', () => {
    shallow(<SimpleTable {...props} />);
  });

  it('renders its content', () => {
    const rendered = shallow(<SimpleTable {...props} />);
    // header
    expect(rendered.contains('Name')).toBe(true);
    expect(rendered.contains('Age')).toBe(true);
    // first row
    expect(rendered.contains('Meredith Carney')).toBe(true);
    expect(rendered.contains(23)).toBe(true);
    // second row
    expect(rendered.contains('Savage Weeks')).toBe(true);
    expect(rendered.contains(21)).toBe(true);
  });

  it('renders the cellRenderCallback correctly', () => {
    const rendered = shallow(<SimpleTable {...props} />);
    expect(rendered.contains('Custom age is 23')).toBe(true);
    expect(rendered.contains('Custom age is 21')).toBe(true);
  });
});
