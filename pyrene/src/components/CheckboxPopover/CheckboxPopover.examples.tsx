import { Example, StateProvider } from '../../examples/Example';
import { CheckboxPopoverProps } from './CheckboxPopover';

export interface State {
  listItems: CheckboxPopoverProps['listItems']
}

const initListItems = [
  { id: 'beer', label: 'Beer', value: true },
  { id: 'coffee', label: 'Coffee', value: false },
  { id: 'tea', label: 'Tea', value: false },
];

const examples: Example<CheckboxPopoverProps, State> = {};

examples.props = {
  buttonLabel: 'Drinks',
  disabled: false,
  listItems: (stateProvider) => stateProvider.state.listItems || initListItems,
  onItemClick: (stateProvider: StateProvider<State>) => (id: string) => {
    const listItems = stateProvider.state.listItems || initListItems;
    const newItemList = listItems.map((item) => ({
      ...item,
      value: item.id === id ? !item.value : item.value,
    }));
    stateProvider.setState({ listItems: newItemList });
  },
  onRestoreDefault: () => {},
};

examples.category = 'Form';

export default examples;
