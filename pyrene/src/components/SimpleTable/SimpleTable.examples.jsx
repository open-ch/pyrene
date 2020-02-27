const tableData = [
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
];

const tableColumns = [{
  id: 'name',
  headerName: 'Name',
  accessor: 'name',
}, {
  id: 'age',
  headerName: 'Age',
  accessor: 'age',
  align: 'right',
  width: '26px',
}, {
  id: 'friendName',
  headerName: 'Friend Name',
  accessor: (d) => d.friend.name,
},
{
  id: 'friendAge',
  headerName: 'Friend Age',
  accessor: (d) => d.friend.age,
  cellRenderCallback: (d) => `Friend's age is ${d.value}`,
},
];

const examples = {
  props: {
    actions: [
      {
        label: 'Name',
        onClick: (rowData) => alert(rowData.name), // eslint-disable-line no-alert
      },
      {
        label: 'Age',
        onClick: (rowData) => alert(rowData.age), // eslint-disable-line no-alert
      },
    ],
    columns: tableColumns,
    data: tableData,
    onRowClick: (row) => alert(`Single click: ${row.value}`), // eslint-disable-line no-alert
    onRowDoubleClick: (row) => alert(`Double click: ${row.value}`), // eslint-disable-line no-alert
  },
};

examples.category = 'Data';

export default examples;
