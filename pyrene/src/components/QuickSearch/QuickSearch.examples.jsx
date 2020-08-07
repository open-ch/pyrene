const examples = {
  props: {
    onSearchTermChange: (stateProvider) => (searchTerm) => stateProvider.setState({ searchTerm }),
    searchTerm: (stateProvider) => stateProvider.state.searchTerm || '',
    onSelectedResultChange: (stateProvider) => (selectedResult) => stateProvider.setState({ selectedResult }),
    selectedResult: (stateProvider) => stateProvider.state.selectedResult || 1,
    resultCount: 15,
  },
};

examples.category = 'Form';

export default examples;
