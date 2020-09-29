/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Example, StateProvider } from '../../examples/Example';
import { ToggleButtonGroupProps } from './ToggleButtonGroup';

const ToggleButtonGroup: Example<ToggleButtonGroupProps> = {};

ToggleButtonGroup.props = {
  options: [{ label: 'Beer 🍺', value: 'beer' }, { label: 'Coffee ☕️', value: 'coffee' }, { label: 'Coffeebeer 🍹😎', value: 'coffeebeer' }],
  onChange: (stateProvider: StateProvider) => (value: string) => stateProvider.setState({ value }),
  value: (stateProvider) => stateProvider.state.value,
};

ToggleButtonGroup.examples = [
  {
    props: {
      options: [
        { label: 'Coffee', value: 'coffee' },
        { label: 'Whisky', value: 'whisky' },
        { label: 'Irish Coffee', value: 'irishcoffee' }],
      onChange: (stateProvider: StateProvider) => (value: string) => stateProvider.setState({ value }),
      value: (stateProvider) => stateProvider.state.value,
    },
    description: '',
  },
  {
    props: {
      options: [
        { label: '1min', value: '1' },
        { label: '1h', value: '60' },
        { label: '24h', value: '3600' }],
      onChange: (stateProvider: StateProvider) => (value: string) => stateProvider.setState({ value }),
      value: (stateProvider) => stateProvider.state.value,
      styling: 'shadow',
    },
    description: '',
  },
];

ToggleButtonGroup.category = 'Interaction';

export default ToggleButtonGroup;
