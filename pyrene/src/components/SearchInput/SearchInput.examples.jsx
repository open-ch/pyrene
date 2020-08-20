const examples = {
  props: {
    onChange: (stateProvider) => (searchTerm) => stateProvider.setState({ searchTerm }),
    value: (stateProvider) => stateProvider.state.searchTerm || '',
    placeholder: 'Search',
  },
};

examples.category = 'Form';

export default examples;
