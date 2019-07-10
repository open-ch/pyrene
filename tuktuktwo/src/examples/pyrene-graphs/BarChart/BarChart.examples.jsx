const data = [
  {
    name: 'Meredith Carney',
    age: 23,
  },
  {
    name: 'Savage Weeks',
    age: 21,
  },
  {
    name: 'Trevino Daniels',
    age: 34,
  },
];

const keys = [{
  id: 'name',
  axisName: 'Name',
  accessor: 'name',
}, {
  id: 'age',
  axisName: 'Age',
  accessor: 'age',
  graph: true,
},
];

const examplesBar = {
  props: {
    barHeight: 18,
    title: 'Horizontal Bar Chart',
    subtitle: 'A horizontal bar chart',
    data: data,
    columns: keys,
    colorScheme: {
      primary: 'blue',
    },
  },
};

const examplesRelativeBar = {
  props: {
    barHeight: 18,
    title: 'Relative Horizontal Bar Chart',
    subtitle: 'A relative horizontal bar chart',
    data: data,
    columns: keys,
    colorScheme: {
      primary: 'blue',
      secondary: 'lightblue',
    },
    relative: true,
  },
};

const examples = [
  examplesBar,
  examplesRelativeBar,
];

export default examples;
