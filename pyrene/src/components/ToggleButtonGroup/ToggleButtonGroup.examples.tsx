import { Example, StateProvider } from '../../examples/Example';
import { ToggleButtonGroupProps, ToggleButtonGroupValue } from './ToggleButtonGroup';

const ToggleButtonGroup: Example<ToggleButtonGroupProps> = {};

ToggleButtonGroup.props = {
  values: [{ label: 'Beer 🍺', id: 'beer' }, { label: 'Coffee ☕️', id: 'coffee' }, { label: 'Coffeebeer 🍹😎', id: 'coffeebeer' }],
  onClick: (stateProvider: StateProvider) => (value: ToggleButtonGroupValue) => stateProvider.setState({ value: value.id }),
  selected: (stateProvider) => stateProvider.state.value,
};

ToggleButtonGroup.examples = [
  {
    props: {
      values: [
        { label: 'Coffee', id: 'coffee' },
        { label: 'Whisky', id: 'whisky' },
        { label: 'Irish Coffee', id: 'irishcoffee' }],
      onClick: (stateProvider: StateProvider) => (value: ToggleButtonGroupValue) => stateProvider.setState({ value: value.id }),
      selected: (stateProvider) => stateProvider.state.value,
    },
    description: '',
  },
];

ToggleButtonGroup.category = 'Interaction';

export default ToggleButtonGroup;
