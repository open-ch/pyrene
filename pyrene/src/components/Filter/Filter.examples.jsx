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

const initialFilters = [{
  label: 'first', type: 'singleSelect', id: 'testKey', options: testOptions,
}, {
  label: 'second', type: 'multiSelect', id: 'testKey2', options: testOptions,
}, {
  label: 'third', type: 'text', id: 'testKey3', options: null,
}, {
  label: 'fourth', type: 'text', id: 'testKey4', options: null,
}, {
  label: 'fifth', type: 'text', id: 'testKey5', options: null,
}, {
  label: 'sixth', type: 'text', id: 'testKey6', options: null,
}, {
  label: 'seventh', type: 'text', id: 'testKey7', options: null,
}, {
  label: 'eighth', type: 'text', id: 'testKey8', options: null,
}, {
  label: 'ninth', type: 'text', id: 'testKey9', options: null,
}, {
  label: 'tenth', type: 'text', id: 'testKey10', options: null,
}, {
  label: 'eleventh', type: 'text', id: 'testKey11', options: null,
}, {
  label: 'twelfth', type: 'text', id: 'testKey12', options: null,
}];

const examples = {
  props: {
    filters: (stateProvider) => (stateProvider.state.filters ? stateProvider.state.filters : initialFilters),
    filterValues: (stateProvider) => (stateProvider.state.filterValues ? stateProvider.state.filterValues : {}),
    onFilterSubmit: (stateProvider) => (filterValues, negatedFilters) => {
      let filters = stateProvider.state.filters ? stateProvider.state.filters : initialFilters;
      filters = filters.map((filter) => {
        const toReturn = filter;
        toReturn.negated = negatedFilters.includes(filter.id);
        return toReturn;
      });
      stateProvider.setState({
        filterValues: filterValues,
        filters: filters,
      });
    },
    negationEnabled: true,
  },
};

examples.category = 'Data';

export default examples;
