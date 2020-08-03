const examples = {
  props: {
    onTermChange: (stateProvider) => (searchTerm) => stateProvider.setState({ searchTerm }),
    term: (stateProvider) => stateProvider.state.searchTerm || '',
    onSelectedResultChange: (stateProvider) => (currentResult) => stateProvider.setState({ currentResult }),
    currentResult: (stateProvider) => stateProvider.state.currentResult || 1,
    resultCount: 15,
    suggestions: [{ label: 'Service', members: ['kafka', 'redis'] }, { label: 'Ip Group', members: ['Private IPs', 'JUMP'] }],
    zIndex: 1,
  },
};

examples.category = 'Form';

export default examples;
