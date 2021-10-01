import { Example, StateProvider } from '../../examples/Example';
import { SearchFinderProps } from './SearchFinder';

interface State {
  selectedResult: number;
  searchTerm: string;
}

const examples: Example<SearchFinderProps, State> = {
  props: {
    onSearchTermChange: (stateProvider: StateProvider<State>): SearchFinderProps['onSearchTermChange'] => (searchTerm) => stateProvider.setState({ searchTerm }),
    searchTerm: (stateProvider) => stateProvider.state.searchTerm || '',
    onSelectedResultChange: (stateProvider: StateProvider<State>): SearchFinderProps['onSelectedResultChange'] => (selectedResult) => stateProvider.setState({ selectedResult }),
    selectedResult: (stateProvider) => stateProvider.state.selectedResult || 1,
    resultCount: 15,
  },
  category: 'Form',
};

export default examples;
