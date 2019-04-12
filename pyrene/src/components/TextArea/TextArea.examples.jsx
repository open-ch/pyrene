const examples = {
  props: {
    title: 'Label',
    placeholder: 'Placeholder Text',
    helperLabel: 'Helper text for instructions',
    width: 500,
    rows: 3,
    maxLength: 50,
    value: stateProvider => stateProvider.state.value,
    onChange: stateProvider => value => stateProvider.setState({ value: value.target.value }),
  },
};

export default examples;
