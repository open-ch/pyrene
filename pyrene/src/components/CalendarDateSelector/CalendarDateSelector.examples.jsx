const examples = {
  props: {
    onChange: stateProvider => (value, timeUnit) => stateProvider.setState({ value: value, timeUnit: timeUnit }),
    value: stateProvider => stateProvider.state.value,
    timeUnit: stateProvider => (stateProvider.state.timeUnit === undefined ? 'month' : stateProvider.state.timeUnit),
  },
};

examples.category = 'Other';

export default examples;
