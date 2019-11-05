import React from 'react';

import TreeTable from './TreeTable';


describe('TreeTable', () => {

  const data = [
    {
      key: 'lol',
      children: [
        {
          key: 'child1',
          children: [
            {
              key: 'child2',
            },
          ],
        },
      ],
    },
    {
      key: 'lala',
    },
    {},
  ];

  const getRowKey = (row) => row.key;

  const props = {
    defaultExpandedSection: '0.0.0',
    columns: [{
      id: 'key',
      headerName: 'Key',
      headerStyle: { justifyContent: 'flexEnd' },
      cellStyle: {},
      accessor: 'key',
      initiallyHidden: false,
      width: 300,
    }],
    data,
    title: 'Tree Table',
    onRowDoubleClick: (d) => console.log(d), // eslint-disable-line no-console
    setUniqueRowKey: getRowKey,
  };

  it('renders without crashing - normal', () => {
    shallow(<TreeTable {...props} />);
  });

  it('renders without crashing - virtualized', () => {
    shallow(<TreeTable {...props} height={300} virtualized />);
  });
  
});
