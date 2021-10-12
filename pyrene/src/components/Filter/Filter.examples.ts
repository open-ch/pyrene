import { FilterProps } from './Filter';
import { Example, StateProvider } from '../../examples/Example';
import { Filter, MultiselectValue } from './types';

export interface State {
  filters: FilterProps['filters'],
  filterValues: FilterProps['filterValues']
}

const testOptions: MultiselectValue = [
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

const initialFilters: Array<Filter> = [
  {
    label: 'First', type: 'singleSelect', id: 'testKey', options: testOptions,
  },
  {
    label: 'Second', type: 'multiSelect', id: 'testKey2', options: testOptions,
  },
  {
    label: 'Third', type: 'text', id: 'testKey3', options: [],
  },
  {
    label: 'Fourth', type: 'text', id: 'testKey4', options: [],
  },
  {
    label: 'Fifth', type: 'text', id: 'testKey5', options: [],
  },
  {
    label: 'Sixth', type: 'text', id: 'testKey6', options: [],
  },
  {
    label: 'Seventh', type: 'text', id: 'testKey7', options: [],
  },
  {
    label: 'Eighth', type: 'text', id: 'testKey8', options: [],
  },
  {
    label: 'Ninth', type: 'text', id: 'testKey9', options: [],
  },
  {
    label: 'Tenth', type: 'text', id: 'testKey10', options: [],
  },
  {
    label: 'Eleventh', type: 'text', id: 'testKey11', options: [],
  },
  {
    label: 'Twelfth', type: 'text', id: 'testKey12', options: [],
  },
];

const examples: Example<FilterProps, State> = {
  props: {
    filters: (stateProvider: StateProvider<State>) => (stateProvider.state.filters ? stateProvider.state.filters : initialFilters),
    filterValues: (stateProvider) => (stateProvider.state.filterValues ? stateProvider.state.filterValues : {}),
    onFilterSubmit: (stateProvider: StateProvider<State>): FilterProps['onFilterSubmit'] => (filterValues, negatedFilters) => {

      stateProvider.setState((prevState) => {
        let filters = prevState.filters ? prevState.filters : initialFilters;
        filters = filters.map((filter) => ({
          ...filter,
          negated: negatedFilters.includes(filter.id),
        }));

        return {
          filterValues: filterValues,
          filters: filters,
        };
      });
    },
    negatable: true,
  },
  category: 'Data',
};

export default examples;
