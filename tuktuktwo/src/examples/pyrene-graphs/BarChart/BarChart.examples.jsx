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

const dataVertical = [
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
  {
    name: 'Pauline Emerson',
    age: 26,
  },
  {
    name: 'Brock Stanley',
    age: 22,
  },
  {
    name: 'Serrano Morrison',
    age: 32,
  },
  {
    name: 'Justice Moss',
    age: 32,
  },
  {
    name: 'Mclaughlin Burke',
    age: 34,
  },
  {
    name: 'Virgie Watts',
    age: 39,
  },
  {
    name: 'Deann Wilkerson',
    age: 34,
  },
  {
    name: 'Clemons Benton',
    age: 30,
  },
  {
    name: 'Sondra Santiago',
    age: 21,
  },
  {
    name: 'Winifred Mack',
    age: 39,
  },
  {
    name: 'Lydia Steele',
    age: 35,
  },
  {
    name: 'Santos Acevedo',
    age: 36,
  },
  {
    name: 'Flossie Beasley',
    age: 28,
  },
  {
    name: 'Woodward Gentry',
    age: 38,
  },
  {
    name: 'Rosa Hampton',
    age: 39,
  },
  {
    name: 'Weber Baird',
    age: 31,
  },
  {
    name: 'Meyers Austin',
    age: 29,
  },
  {
    name: 'Lynch Randall',
    age: 22,
  },
  {
    name: 'Alexandra Herrera',
    age: 30,
  },
  {
    name: 'Joseph Cotton',
    age: 35,
  },
  {
    name: 'Mack Patton',
    age: 39,
  },
  {
    name: 'Kitty Wallace',
    age: 23,
  },
  {
    name: 'Lynne Cohen',
    age: 29,
  },
  {
    name: 'Riggs Harmon',
    age: 22,
  },
  {
    name: 'White Duran',
    age: 34,
  },
  {
    name: 'Bonita Ortiz',
    age: 29,
  },
  {
    name: 'Lamb Valdez',
    age: 39,
  },
  {
    name: 'Carroll Shelton',
    age: 38,
  },
  {
    name: 'Rae Reid',
    age: 37,
  },
  {
    name: 'Joni Coffey',
    age: 37,
  },
  {
    name: 'Cooke Flores',
    age: 28,
  },
  {
    name: 'Gayle Kemp',
    age: 26,
  },
  {
    name: 'Kim Martinez',
    age: 27,
  },
  {
    name: 'Wiggins Shannon',
    age: 33,
  },
  {
    name: 'Love Schneider',
    age: 35,
  },
  {
    name: 'Kellie Herring',
    age: 38,
  },
  {
    name: 'Edwards Whitfield',
    age: 22,
  },
  {
    name: 'Lois Haney',
    age: 36,
  },
  {
    name: 'Chasity Cooley',
    age: 31,
  },
  {
    name: 'Benton Molina',
    age: 38,
  },
  {
    name: 'Joyce Gonzalez',
    age: 40,
  },
  {
    name: 'Randi Sandoval',
    age: 23,
  },
  {
    name: 'Collier Barnes',
    age: 29,
  },
  {
    name: 'Lauri Bailey',
    age: 32,
  },
  {
    name: 'Richard Mcgowan',
    age: 40,
  },
  {
    name: 'Jillian Mcdowell',
    age: 24,
  },
  {
    name: 'Hansen Briggs',
    age: 22,
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

const horizontalBar = {
  props: {
    barWeight: 18,
    title: 'Horizontal Bar Chart',
    subtitle: 'A horizontal bar chart',
    data: data,
    columns: keys,
    colorScheme: {
      primary: 'blue',
    },
  },
};

const relativeHorizontalBar = {
  props: {
    barWeight: 18,
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

const verticalBar = {
  props: {
    barWeight: 18,
    title: 'Vertical Bar Chart',
    subtitle: 'A vertical bar chart',
    data: dataVertical,
    columns: keys,
    colorScheme: {
      primary: 'blue',
    },
    direction: 'vertical',
  },
};

const relativeVerticalBar = {
  props: {
    barWeight: 18,
    title: 'Relative Vertical Bar Chart',
    subtitle: 'A relative vertical bar chart',
    data: dataVertical,
    columns: keys,
    colorScheme: {
      primary: 'blue',
      secondary: 'lightblue',
    },
    relative: true,
    direction: 'vertical',
  },
};

const examples = [
  horizontalBar,
  relativeHorizontalBar,
  verticalBar,
  relativeVerticalBar,
];

export default examples;
