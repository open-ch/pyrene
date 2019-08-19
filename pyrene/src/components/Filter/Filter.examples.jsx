const testOptions = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
  { value: 'bacon', label: 'Bacon' },
  { value: 'cookiedough', label: 'Cookie Dough' },
  { value: 'beer', label: 'Beer' },
  { value: 'cottoncandy', label: 'Cotton Candy' },
  { value: 'crab', label: 'Crab' },
  { value: 'greentea', label: 'Green Tea' },
  { value: 'mango', label: 'Mango' },
  { value: 'tuttifrutti', label: 'Tutti Frutti' },
  { value: 'grape', label: 'Grape' },
  { value: 'coconutmilk', label: 'Coconut Milk' },
  { value: 'dulce', label: 'Dulce de Leche' },
  { value: 'caramel', label: 'Caramel' },
  { value: 'banana', label: 'Banana' },
  { value: 'garlic', label: 'Garlic' },
  { value: 'twix', label: 'Twix' },
  { value: 'mintchocolatechip', label: 'Mint Chocolate Chip' },
  { value: 'spearmint', label: 'Spearmint' },
  { value: 'oyster', label: 'Oyster' },
  { value: 'pistachio', label: 'Pistachio' },
  { value: 'rice', label: 'Rice' },
  { value: 'chickenliver', label: 'Chicken Liver' },
  { value: 'superman', label: 'Superman' },
  { value: 'lucuma', label: 'Lucuma' },
  { value: 'bluemoon', label: 'Blue Moon' },
  { value: 'charcoal', label: 'Charcoal' },
  { value: 'cheesecake', label: 'Cheesecake' },
  { value: 'rumandraisin', label: 'Rum and Raisin' },
  { value: 'moosetracks', label: 'Moose Tracks' },
];

const examples = {
  props: {
    filters: [{
      label: 'first', type: 'singleSelect', filterKey: 'testKey', options: testOptions,
    }, {
      label: 'second', type: 'multiSelect', filterKey: 'testKey2', options: testOptions,
    }, {
      label: 'third', type: 'text', filterKey: 'testKey3', options: null,
    }, {
      label: 'fourth', type: 'text', filterKey: 'testKey4', options: null,
    }, {
      label: 'fifth', type: 'text', filterKey: 'testKey5', options: null,
    }, {
      label: 'sixth', type: 'text', filterKey: 'testKey6', options: null,
    }, {
      label: 'seventh', type: 'text', filterKey: 'testKey7', options: null,
    }, {
      label: 'eighth', type: 'text', filterKey: 'testKey8', options: null,
    }, {
      label: 'ninth', type: 'text', filterKey: 'testKey9', options: null,
    }, {
      label: 'tenth', type: 'text', filterKey: 'testKey10', options: null,
    }, {
      label: 'eleventh', type: 'text', filterKey: 'testKey11', options: null,
    }, {
      label: 'twelfth', type: 'text', filterKey: 'testKey12', options: null,
    }],
    filterValues: stateProvider => (stateProvider.state.filterValues ? stateProvider.state.filterValues : null),
    onFilterSubmit: stateProvider => filterValues => stateProvider.setState({ filterValues }),
  },
};

examples.category = 'Data';

export default examples;
