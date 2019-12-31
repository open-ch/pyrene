/* eslint-disable react/display-name */
import React from 'react';

const initListItems = [
  { id: 'beer', label: 'Beer', value: true },
  { id: 'coffee', label: 'Coffee', value: false },
  { id: 'tea', label: 'Tea', value: false },
];

const examples = {
  props: {
    buttonLabel: 'Drinks',
    disabled: false,
    listItems: initListItems,
    onItemClick: (stateProvider) => (value) => {
      const newItemList = [...initListItems];
      newItemList.forEach(function(item) {
        if (item.id === value) {
          item.value = !item.value;
        }
      });
      stateProvider.setState({ listItems: newItemList });
    },
    onRestoreDefault: () => {},
  },
};

examples.category = 'Form';

export default examples;
