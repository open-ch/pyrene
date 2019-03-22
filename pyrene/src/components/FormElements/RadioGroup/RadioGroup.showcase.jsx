const RadioGroup = {};

RadioGroup.props = {
  options: [{ label: 'Beer 🍺', value: 'beer' }, { label: 'Coffee ☕️', value: 'coffee' }, { label: 'Coffeebeer 🍹😎', value: 'coffeebeer' }],
  onChange: stateProvider => value => stateProvider.setState({ value: value.target.value }),
  value: stateProvider => stateProvider.state.value,
};

RadioGroup.examples = [
  {
    props: {
      alignment: 'vertical',
      options: [
        { label: 'Coffee', value: 'coffee' },
        { label: 'Whisky', value: 'whisky' },
        { label: 'Irish Coffee', value: 'irishcoffee' }],
      onChange: stateProvider => value => stateProvider.setState({ value: value.target.value }),
      value: stateProvider => stateProvider.state.value,
    },
    description: '',
  }, {
    props: {
      alignment: 'horizontal',
      options: [
        { label: 'Coffee', value: 'coffee' },
        { label: 'Whisky', value: 'whisky' },
        { label: 'Irish Coffee', value: 'irishcoffee' }],
      onChange: stateProvider => value => stateProvider.setState({ value: value.target.value }),
      value: stateProvider => stateProvider.state.value,
    },
    description: '',
  },
];

export default RadioGroup;
