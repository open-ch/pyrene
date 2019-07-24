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
  graph: true,
}, {
  id: 'friendName',
  headerName: 'Friend Name',
  accessor: d => d.friend.name,
}, {
  id: 'friendAge',
  headerName: 'Friend Age',
  accessor: d => d.friend.age,
}];

const examples = {
  props: {
    data: tableData,
    columns: tableColumns,
    title: 'Bar Table',
    subtitle: 'A simple table with one column as a bar chart',
    colorScheme: {
      primary: 'blue',
    },
    legend: [{
      label: 'Age',
      colorKey: 'primary',
    },
    ],
  },
};

export default examples;

// const examples = {};
//
// examples.props = {
//   barWeight: 18,
//   data: tableData,
//   columns: tableColumns,
// };
//
// examples.examples = [{
//   props: {
//     data: tableData,
//     columns: tableColumns,
//     title: 'Bar Table',
//     subtitle: 'A simple table with one column as a bar chart',
//     colorScheme: {
//       primary: 'blue',
//     },
//     legend: [{
//       label: 'Age',
//       colorKey: 'primary',
//     },
//     ],
//   },
//   description: 'A simple table with one column as a bar chart',
// }, {
//   props: {
//     data: tableData,
//     columns: tableColumns,
//     title: 'Relative Bar Table',
//     subtitle: 'A simple table with one column as a relative bar chart',
//     colorScheme: {
//       primary: 'blue',
//       secondary: 'lightblue',
//     },
//     legend: [{
//       label: 'Age',
//       colorKey: 'primary',
//     }, {
//       label: 'Delta Age',
//       colorKey: 'secondary',
//     },
//     ],
//     relative: true,
//   },
//   description: 'A simple table with one column as a relative bar chart',
// }];
//
// export default examples;
