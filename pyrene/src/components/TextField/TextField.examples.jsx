const examples = {
  props: {
    title: 'Field Label',
    placeholder: 'Placeholder Text',
    helperLabel: 'Helper text for instructions',
    width: 500,
    value: stateProvider => stateProvider.state.value,
    onChange: stateProvider => ({ value }) => stateProvider.setState({ value }),
  },
};

export default examples;
