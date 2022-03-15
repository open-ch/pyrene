import React from 'react';
import { Story, Meta } from '@storybook/react';
import TreeTable, { TreeTableProps } from './TreeTable';
import { Column, RowData } from './types';

import treeTableData from './data.json';

export default {
  title: 'Components/Data/TreeTable',
  component: TreeTable,
} as Meta;

interface TableRow {
  id: string;
  name: string;
  phone: string;
  children: Array<{
    id: string;
    name: string;
    phone: string;
  }>;
}

const treeTableColumns: Array<Column<TableRow>> = [
  {
    id: 'name',
    headerName: 'Name',
    headerStyle: { justifyContent: 'flexEnd' },
    cellStyle: {},
    accessor: 'name',
    initiallyHidden: false,
    width: 300,
  },
  {
    id: 'phone',
    headerName: 'Phone',
    accessor: 'phone',
  },
];

const DefaultTemplate: Story<TreeTableProps<TableRow>> = (args) => {
  return <TreeTable<TableRow> {...args} />;
};

export const Standard = DefaultTemplate.bind({});
Standard.args = {
  columns: treeTableColumns,
  data: treeTableData,
  title: 'Tree Table',
  setUniqueRowKey: (row: RowData<TableRow>) => row.id,
};
