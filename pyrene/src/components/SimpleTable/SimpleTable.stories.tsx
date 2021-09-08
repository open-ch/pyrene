/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react';

import { Story, Meta } from '@storybook/react';
import SimpleTableComponent, { SimpleTableProps } from './SimpleTable';
import { Row } from './types';

export default {
  title: 'Components/data/SimpleTable',
  component: SimpleTableComponent,
} as Meta;


const Template: Story<SimpleTableProps> = (args) => <SimpleTableComponent {...args} />;

export const SimpleTable = Template.bind({});

SimpleTable.args = {
  actions: [
    {
      label: 'Name',
      onClick: (rowData) => alert(rowData.name),
    },
    {
      label: 'Age',
      onClick: (rowData) => alert(rowData.age),
    },
  ],
  onRowClick: (row: Row) => alert(`Single click: ${row.value}`),
  onRowDoubleClick: (row: Row) => alert(`Double click: ${row.value}`),
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
      accessor: (d: Row): string => d.friend.name,
    },
    {
      id: 'friendAge',
      headerName: 'Friend Age',
      accessor: (d: Row): number => d.friend.age,
      cellRenderCallback: (d: Row): string => `Friend's age is ${d.value}`,
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
