const Button = {};

Button.props = {
  label: stateProvider => (stateProvider.state.count ? `You clicked me ${stateProvider.state.count}` : 'Click me please'),
  type: 'secondary',
  icon: 'filter',
  onClick: stateProvider => () => stateProvider.setState(prevState => ({ count: prevState.count ? prevState.count + 1 : 1 })),
};

Button.examples = [{
  props: { label: 'primary' },
  description: 'For all principle actions on a page. Used to highlight the most important actions. Avoid overwhelming usage of primary buttons.',
}, {
  props: { label: 'secondary', type: 'secondary' },
  description: 'For secondary actions such as ‘Discard’ in combination with a primary button.',
}, {
  props: { label: 'Ghost', type: 'ghost' },
  description: 'Ghost button description',
}, {
  props: { label: 'danger', type: 'danger', icon: 'errorOutline' },
  description: 'When an action has harmful intentions to the users data (delete, remove, etc). To draw more attention on what the button does add and icon. Icons are always paired with a label.',
}, {
  props: { label: 'Delete', type: 'action', icon: 'errorOutline' },
  description: 'Used for table actions. They are paired with icon and label.',
}, {
  props: { label: 'admin', type: 'admin' },
  description: 'Used when an action is accessible for MC Engineers only.',
}];

export default Button;
