/* eslint-disable no-alert */
import React from 'react';

import { Story, Meta } from '@storybook/react';
import SimpleTableComponent, { SimpleTableProps } from './SimpleTable';
import { IconNames } from '../types';

export default {
  title: 'Components/Data/Simple Table',
  component: SimpleTableComponent,
} as Meta;

interface Row {
  name: string;
  age: number;
  friend: {
    name: string;
    age: number;
  };
}

const Template: Story<SimpleTableProps<Row>> = (args) => <SimpleTableComponent<Row> {...args} />;

export const SimpleTable = Template.bind({});

SimpleTable.args = {
  actions: [
    {
      label: 'Name',
      icon: 'edit' as keyof IconNames,
      onClick: (rowData) => alert(rowData.name),
    },
    {
      label: 'Age',
      onClick: (rowData) => alert(rowData.age),
    },
  ],
  onRowClick: (row) => alert(`Single click: ${row?.value || ''}`),
  onRowDoubleClick: (row) => alert(`Double click: ${row?.value || ''}`),
  columns: [
    {
      id: 'name',
      headerName: 'Name',
      accessor: 'name',
    },
    {
      id: 'age',
      headerName: 'Age',
      accessor: 'age',
      align: 'right',
      width: 26,
    },
    {
      id: 'friendName',
      headerName: 'Friend Name',
      accessor: (d) => d.friend.name,
    },
    {
      id: 'friendAge',
      headerName: 'Friend Age',
      accessor: (d) => d.friend.age,
      cellRenderCallback: (d) => `Friend's age is ${d?.value || ''}`,
    },
  ],
  data: [
    {
      name: 'Meredith Carney',
      age: 23,
      friend: {
        name: 'Perry Robinson',
        age: 33,
      },
    },
    {
      name: 'Savage Weeks',
      age: 21,
      friend: {
        name: 'Tammi Reese',
        age: 32,
      },
    },
    {
      name: 'Trevino Daniels',
      age: 34,
      friend: {
        name: 'Beasley Riddle',
        age: 30,
      },
    },
    {
      name: 'Pauline Emerson',
      age: 26,
      friend: {
        name: 'Fisher Horne',
        age: 37,
      },
    },
    {
      name: 'Brock Stanley',
      age: 22,
      friend: {
        name: 'Alejandra Browning',
        age: 33,
      },
    },
  ],
};
