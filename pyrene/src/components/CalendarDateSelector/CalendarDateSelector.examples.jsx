const examples = {
  props: {
    onChange: stateProvider => value => stateProvider.setState({ value }),
    value: stateProvider => stateProvider.state.value,
  },
};

examples.category = 'Other';

export default examples;
