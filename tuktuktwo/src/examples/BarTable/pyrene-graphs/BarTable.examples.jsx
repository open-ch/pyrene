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
];


const tableColumns = [{
  id: 'name',
  headerName: 'Name',
  accessor: 'name',
}, {
  id: 'age',
  headerName: 'Age',
  accessor: 'age',
}, {
  id: 'friendName',
  headerName: 'Friend Name',
  accessor: d => d.friend.name,
}, {
  id: 'friendAge',
  headerName: 'Friend Age',
  accessor: 'friend.age',
  graph: true,
}];

const examples = {
  props: {
    title: 'Bar Table',
    data: tableData,
    columns: tableColumns,
    colorScheme: {
      primary: 'blue',
      secondary: 'lightblue',
    },
  },
};

export default examples;
