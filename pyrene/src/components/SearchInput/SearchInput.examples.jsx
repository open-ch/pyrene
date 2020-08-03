const examples = {
  props: {
    onChange: (stateProvider) => (searchTerm) => stateProvider.setState({ searchTerm }),
    term: (stateProvider) => stateProvider.state.searchTerm,
  },
};

examples.category = 'Form';

export default examples;
