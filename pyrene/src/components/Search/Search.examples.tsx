import { SearchProps } from './Search';
import { Example, StateProvider } from '../../examples/Example';

interface State {
  searchTerm: string,
}

const examples: Example<SearchProps, State> = {
  props: {
    onChange: (stateProvider: StateProvider<State>): SearchProps['onChange'] => (searchTerm) => stateProvider.setState({ searchTerm }),
    value: (stateProvider) => stateProvider.state.searchTerm || '',
    placeholder: 'Search',
  },
  category: 'Form',
};

export default examples;
