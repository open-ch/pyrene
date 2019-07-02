const tableData = [
  {
    name: 'Meredith Carney',
    age: 23,
    budget: 300,
  },
  {
    name: 'Savage Weeks',
    age: 21,
    budget: 450,
  },
  {
    name: 'Trevino Daniels',
    age: 34,
    budget: 150,
  },
];

const tableColumns = [{
  id: 'name',
  headerName: 'Name',
}, {
  id: 'age',
  headerName: 'Age',
  cellRenderCallback: {
    fillColor: 'red',
    width: 200,
  },
}, {
  id: 'budget',
  headerName: 'Budget',
  cellRenderCallback: {
    fillColor: 'blue',
    width: 200,
  },
}];

const examples = {
  props: {
    title: 'Bar Table',
    data: tableData,
    columns: tableColumns,
  },
};

export default examples;
