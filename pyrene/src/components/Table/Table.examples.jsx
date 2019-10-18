import React from 'react';

/* eslint-disable react/display-name, no-nested-ternary */

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
  {
    name: 'Serrano Morrison',
    age: 32,
    friend: {
      name: 'Lana Potter',
      age: 23,
    },
  },
  {
    name: 'Justice Moss',
    age: 32,
    friend: {
      name: 'Sweet Willis',
      age: 20,
    },
  },
  {
    name: 'Mclaughlin Burke',
    age: 34,
    friend: {
      name: 'Ellis Gordon',
      age: 32,
    },
  },
  {
    name: 'Virgie Watts',
    age: 39,
    friend: {
      name: 'Evans Allen',
      age: 38,
    },
  },
  {
    name: 'Deann Wilkerson',
    age: 34,
    friend: {
      name: 'Dona Wise',
      age: 36,
    },
  },
  {
    name: 'Clemons Benton',
    age: 30,
    friend: {
      name: 'Hoover Barber',
      age: 32,
    },
  },
  {
    name: 'Sondra Santiago',
    age: 21,
    friend: {
      name: 'Dianna Fowler',
      age: 23,
    },
  },
  {
    name: 'Winifred Mack',
    age: 39,
    friend: {
      name: 'Maryellen Fry',
      age: 33,
    },
  },
  {
    name: 'Lydia Steele',
    age: 35,
    friend: {
      name: 'Torres Burton',
      age: 30,
    },
  },
  {
    name: 'Santos Acevedo',
    age: 36,
    friend: {
      name: 'Staci Collier',
      age: 24,
    },
  },
  {
    name: 'Flossie Beasley',
    age: 28,
    friend: {
      name: 'Minerva Sawyer',
      age: 24,
    },
  },
  {
    name: 'Woodward Gentry',
    age: 38,
    friend: {
      name: 'Eaton Harper',
      age: 20,
    },
  },
  {
    name: 'Rosa Hampton',
    age: 39,
    friend: {
      name: 'Waller Schroeder',
      age: 34,
    },
  },
  {
    name: 'Weber Baird',
    age: 31,
    friend: {
      name: 'Weeks Ferrell',
      age: 35,
    },
  },
  {
    name: 'Meyers Austin',
    age: 29,
    friend: {
      name: 'Maryanne Roth',
      age: 31,
    },
  },
  {
    name: 'Lynch Randall',
    age: 22,
    friend: {
      name: 'Carmen Richmond',
      age: 34,
    },
  },
  {
    name: 'Alexandra Herrera',
    age: 30,
    friend: {
      name: 'Pace Harding',
      age: 22,
    },
  },
  {
    name: 'Joseph Cotton',
    age: 35,
    friend: {
      name: 'Hewitt Pate',
      age: 38,
    },
  },
  {
    name: 'Mack Patton',
    age: 39,
    friend: {
      name: 'Chavez Palmer',
      age: 35,
    },
  },
  {
    name: 'Kitty Wallace',
    age: 23,
    friend: {
      name: 'Wilda Wolf',
      age: 23,
    },
  },
  {
    name: 'Lynne Cohen',
    age: 29,
    friend: {
      name: 'Tracey Pollard',
      age: 34,
    },
  },
  {
    name: 'Riggs Harmon',
    age: 22,
    friend: {
      name: 'Vickie Tucker',
      age: 28,
    },
  },
  {
    name: 'White Duran',
    age: 34,
    friend: {
      name: 'Owens Cortez',
      age: 22,
    },
  },
  {
    name: 'Bonita Ortiz',
    age: 29,
    friend: {
      name: 'Haynes Mcfarland',
      age: 38,
    },
  },
  {
    name: 'Lamb Valdez',
    age: 39,
    friend: {
      name: 'Amparo Leblanc',
      age: 25,
    },
  },
  {
    name: 'Carroll Shelton',
    age: 38,
    friend: {
      name: 'Campbell Carter',
      age: 39,
    },
  },
  {
    name: 'Rae Reid',
    age: 37,
    friend: {
      name: 'Mccoy Russell',
      age: 24,
    },
  },
  {
    name: 'Joni Coffey',
    age: 37,
    friend: {
      name: 'Bond Justice',
      age: 33,
    },
  },
  {
    name: 'Cooke Flores',
    age: 28,
    friend: {
      name: 'Randolph Hinton',
      age: 26,
    },
  },
  {
    name: 'Gayle Kemp',
    age: 26,
    friend: {
      name: 'Kasey Bright',
      age: 35,
    },
  },
  {
    name: 'Kim Martinez',
    age: 27,
    friend: {
      name: 'Montgomery Livingston',
      age: 32,
    },
  },
  {
    name: 'Wiggins Shannon',
    age: 33,
    friend: {
      name: 'Amanda Bentley',
      age: 40,
    },
  },
  {
    name: 'Love Schneider',
    age: 35,
    friend: {
      name: 'Bean Hall',
      age: 28,
    },
  },
  {
    name: 'Kellie Herring',
    age: 38,
    friend: {
      name: 'Ford Levy',
      age: 29,
    },
  },
  {
    name: 'Edwards Whitfield',
    age: 22,
    friend: {
      name: 'Meyer Good',
      age: 29,
    },
  },
  {
    name: 'Lois Haney',
    age: 36,
    friend: {
      name: 'Roseann Goff',
      age: 33,
    },
  },
  {
    name: 'Chasity Cooley',
    age: 31,
    friend: {
      name: 'Ellison Soto',
      age: 27,
    },
  },
  {
    name: 'Benton Molina',
    age: 38,
    friend: {
      name: 'Whitley Tyson',
      age: 21,
    },
  },
  {
    name: 'Joyce Gonzalez',
    age: 40,
    friend: {
      name: 'Andrews Lewis',
      age: 26,
    },
  },
  {
    name: 'Randi Sandoval',
    age: 23,
    friend: {
      name: 'Tanya Perez',
      age: 28,
    },
  },
  {
    name: 'Collier Barnes',
    age: 29,
    friend: {
      name: 'Clark Ayers',
      age: 23,
    },
  },
  {
    name: 'Lauri Bailey',
    age: 32,
    friend: {
      name: 'Sherry Mayer',
      age: 20,
    },
  },
  {
    name: 'Richard Mcgowan',
    age: 40,
    friend: {
      name: 'Sawyer Richard',
      age: 30,
    },
  },
  {
    name: 'Jillian Mcdowell',
    age: 24,
    friend: {
      name: 'Estela Carroll',
      age: 37,
    },
  },
  {
    name: 'Hansen Briggs',
    age: 22,
    friend: {
      name: 'Tracy Whitaker',
      age: 20,
    },
  },
];

const tableColumns = [{
  id: 'name',
  headerName: 'Name',
  accessor: 'name',
  sortMethod: (a, b) => {
    const lastA = a.charAt(a.length - 1);
    const lastB = b.charAt(b.length - 1);
    if (lastA > lastB) {
      return 1;
    }
    if (lastA < lastB) {
      return -1;
    }
    return 0;

  },
}, {
  id: 'age',
  headerName: 'Age',
  accessor: 'age',
  resizable: false,
  cellRenderCallback: row => (
    <div
      style={{
        width: '100%',
        height: '31px', // 32px is the height including border :)
        backgroundColor: 'var(--neutral-020)',
      }}
    >
      <div
        style={{
          width: `${((row.value - 20) / 20) * 100}%`,
          height: '100%',
          backgroundColor:
            ((row.value - 20) / 20) * 100 > 66
              ? 'var(--acqua-300)'
              : ((row.value - 20) / 20) * 100 > 33
                ? 'var(--teal-300)'
                : 'var(--red-200)',
          transition: 'all .2s ease-out',
        }}
      />
    </div>
  ),
}, {
  id: 'friendName',
  headerName: 'Friend Name',
  accessor: d => d.friend.name,
  initiallyHidden: true,
}, {
  id: 'friendAge',
  headerName: 'Friend Age',
  headerTooltip: 'Pyrene tooltip to this nice header name',
  accessor: 'friend.age',
}];

const testOptions = [
  { value: 'chocolate', label: 'Chocolate', invalid: false },
  { value: 'strawberry', label: 'Strawberry', invalid: false },
  { value: 'vanilla', label: 'Vanilla', invalid: false },
  { value: 'bacon', label: 'Bacon', invalid: true },
  { value: 'cookiedough', label: 'Cookie Dough', invalid: false },
  { value: 'beer', label: 'Beer', invalid: false },
  { value: 'cottoncandy', label: 'Cotton Candy', invalid: false },
  { value: 'crab', label: 'Crab', invalid: false },
  { value: 'greentea', label: 'Green Tea', invalid: false },
  { value: 'mango', label: 'Mango', invalid: false },
  { value: 'tuttifrutti', label: 'Tutti Frutti', invalid: false },
  { value: 'grape', label: 'Grape', invalid: false },
  { value: 'coconutmilk', label: 'Coconut Milk', invalid: false },
  { value: 'dulce', label: 'Dulce de Leche', invalid: false },
  { value: 'caramel', label: 'Caramel', invalid: false },
  { value: 'banana', label: 'Banana', invalid: false },
  { value: 'garlic', label: 'Garlic', invalid: true },
  { value: 'twix', label: 'Twix', invalid: false },
  { value: 'mintchocolatechip', label: 'Mint Chocolate Chip', invalid: false },
  { value: 'spearmint', label: 'Spearmint', invalid: false },
  { value: 'oyster', label: 'Oyster', invalid: false },
  { value: 'pistachio', label: 'Pistachio', invalid: false },
  { value: 'rice', label: 'Rice', invalid: false },
  { value: 'chickenliver', label: 'Chicken Liver', invalid: true },
  { value: 'superman', label: 'Superman', invalid: false },
  { value: 'lucuma', label: 'Lucuma', invalid: false },
  { value: 'bluemoon', label: 'Blue Moon', invalid: false },
  { value: 'charcoal', label: 'Charcoal', invalid: false },
  { value: 'cheesecake', label: 'Cheesecake', invalid: false },
  { value: 'rumandraisin', label: 'Rum and Raisin', invalid: false },
  { value: 'moosetracks', label: 'Moose Tracks', invalid: false },
];

const examples = {
  props: {
    toggleColumns: true,
    resizable: true,
    pivotBy: ['age'],
    title: 'Table',
    keyField: 'name',
    data: stateProvider => (stateProvider.state.tableData ? stateProvider.state.tableData : tableData),
    columns: tableColumns,
    onRowDoubleClick: rowInfo => console.log(rowInfo), // eslint-disable-line no-console
    actions: [{
      icon: 'search', label: 'Single', callback: () => console.log('single'), active: 'single', // eslint-disable-line no-console
    }, {
      icon: 'delete', label: 'Multi', callback: () => console.log('multi'), active: 'multi', // eslint-disable-line no-console
    }, {
      icon: 'info', label: 'Always', callback: () => console.log('always'), active: 'always', // eslint-disable-line no-console
    }],
    filters: [{
      label: 'Free Text', type: 'text', id: 'name',
    }, {
      label: 'first column', type: 'singleSelect', id: 'testKey', options: testOptions,
    }, {
      label: 'second column', type: 'multiSelect', id: 'testKey2', options: testOptions,
    }],
    onFilterChange: stateProvider => filters => stateProvider.setState(() => ({ tableData: filters && Object.keys(filters).length > 0 ? tableData.filter(row => row.name.includes(filters.name)) : tableData, filterValues: filters })),
    filterValues: stateProvider => (stateProvider.state.filterValues ? stateProvider.state.filterValues : {}),
  },
};

examples.category = 'Data';

export default examples;
