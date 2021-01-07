import { Example, StateProvider } from '../../examples/Example';
import { ButtonProps } from './Button';

export interface State {
  count: number
}

const Button: Example<ButtonProps, State> = {};

Button.props = {
  label: (stateProvider: StateProvider<State>) => (stateProvider.state.count ? `You clicked me ${stateProvider.state.count}` : 'Click me please'),
  type: 'secondary',
  icon: 'filter',
  onClick: (stateProvider: StateProvider<State>) => () => stateProvider.setState((prevState: State) => ({ count: prevState.count ? prevState.count + 1 : 1 })),
};

Button.examples = [{
  props: { label: 'Primary' },
  description: 'For all principle actions on a page. Used to highlight the most important actions. Avoid overwhelming usage of primary buttons.',
}, {
  props: { label: 'Secondary', type: 'secondary' },
  description: 'For secondary actions such as ‘Discard’ in combination with a primary button.',
}, {
  props: { label: 'Ghost', type: 'ghost' },
  description: 'Ghost button description',
}, {
  props: { label: 'Danger', type: 'danger', icon: 'errorOutline' },
  description: 'When an action has harmful intentions to the users data (delete, remove, etc). To draw more attention on what the button does add and icon. Icons are always paired with a label.',
}, {
  props: { label: 'Delete', type: 'action', icon: 'errorOutline' },
  description: 'Used for table actions. They are paired with icon and label.',
}];

Button.category = 'Interaction';

export default Button;
