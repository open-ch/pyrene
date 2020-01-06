const initListItems = [
  { id: 'beer', label: 'Beer', value: true },
  { id: 'coffee', label: 'Coffee', value: false },
  { id: 'tea', label: 'Tea', value: false },
];

const examples = {
  props: {
    buttonLabel: 'Drinks',
    disabled: false,
    listItems: (stateProvider) => stateProvider.state.listItems || initListItems,
    onItemClick: (stateProvider) => (id) => {
      const listItems = stateProvider.state.listItems || initListItems;
      const newItemList = listItems.map((item) => ({
        ...item,
        value: item.id === id ? !item.value : item.value,
      }));
      stateProvider.setState({ listItems: newItemList });
    },
    onRestoreDefault: () => {},
  },
};

examples.category = 'Form';

export default examples;
