import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Column } from 'react-table-7';

import TreeTableReact, { TreeTableReactProps } from './TreeTableReact';
import treeTableData from './data.json';

export default {
  title: 'Components/Data/TreeTableReact',
  component: TreeTableReact,
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

const treeTableColumns: Array<Column<object>> = [
  { Header: 'First Name', accessor: 'name', id: 'name' },
  { Header: 'Phone', accessor: 'phone', id: 'phone' },
  { Header: 'Hobby', accessor: 'hobby', id: 'hobby' },
];

const DefaultTemplate: Story<TreeTableReactProps<TableRow>> = (args) => {
  return <TreeTableReact {...args} />;
};

export const Standard = DefaultTemplate.bind({});
Standard.args = {
  columns: treeTableColumns,
  data: treeTableData,
  multiSelect: true,
  resizable: true,
  virtualized: true,
};
