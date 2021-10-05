import { Example, StateProvider } from '../../examples/Example';
import { ButtonProps, ButtonKind } from './Button';

export interface State {
  count: number
}

const Button: Example<ButtonProps, State> = {};

Button.props = {
  label: (stateProvider: StateProvider<State>) => (stateProvider.state.count ? `You clicked me ${stateProvider.state.count}` : 'Click me please'),
  actionType: 'submit',
  type: ButtonKind.secondary,
  icon: 'filter',
  onClick: (stateProvider: StateProvider<State>) => () => stateProvider.setState((prevState: State) => ({ count: prevState.count ? prevState.count + 1 : 1 })),
};

Button.examples = [{
  props: { label: 'Primary' },
  description: 'For all principle actions on a page. Used to highlight the most important actions. Avoid overwhelming usage of primary buttons.',
}, {
  props: { label: 'Secondary', type: ButtonKind.secondary },
  description: 'For secondary actions such as ‘Discard’ in combination with a primary button.',
}, {
  props: { label: 'Ghost', type: ButtonKind.ghost },
  description: 'Ghost button description',
}, {
  props: { label: 'Danger', type: ButtonKind.danger, icon: 'errorOutline' },
  description: 'When an action has harmful intentions to the users data (delete, remove, etc). To draw more attention on what the button does add and icon. Icons are always paired with a label.',
}, {
  props: { label: 'Delete', type: ButtonKind.action, icon: 'errorOutline' },
  description: 'Used for table actions. They are paired with icon and label.',
}];

Button.category = 'Interaction';

export default Button;
