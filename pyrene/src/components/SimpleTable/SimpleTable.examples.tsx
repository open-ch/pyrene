/* eslint-disable no-alert */
import { Example } from '../../examples/Example';
import { TableRow } from '../../examples/TableRowExample';
import { SimpleTableProps } from './SimpleTable';
import { ExtendsRow } from './types';

const examples: Example<SimpleTableProps<TableRow>> = {
  props: {
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
    onRowClick: (row: ExtendsRow<TableRow>) => alert(`Single click: ${row?.value || ''}`),
    onRowDoubleClick: (row: ExtendsRow<TableRow>) => alert(`Double click: ${row?.value || ''}`),
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
        cellRenderCallback: (d) => `Friend's age is ${d.value || ''}`,
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
  },
  category: 'Data',
};

export default examples;
