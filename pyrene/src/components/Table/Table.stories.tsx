/* eslint-disable no-alert */
import React from 'react';

import { Story, Meta } from '@storybook/react';
import TableComponent, { TableProps } from './Table';

export default {
  title: 'Components/Data/Table',
  component: TableComponent,
} as Meta;

interface Row {
  name: string;
  age: number;
  friend: {
    name: string;
    age: number;
  };
}

const Template: Story<TableProps<Row>> = (args) => <TableComponent<Row> {...args} />;

export const Table = Template.bind({});

Table.args = {
  actions: [{
    icon: 'search', label: 'Single', callback: () => null, active: 'single',
  }, {
    icon: 'delete', label: 'Multi', callback: () => null, active: 'multi',
  }, {
    icon: 'info', label: 'Always', callback: () => null, active: 'always',
  }],
  columns: [{
    id: 'name', headerName: 'Name', accessor: 'name', sortMethod: () => 1,
  }, {
    id: 'age', headerName: 'Age', accessor: 'age', cellRenderCallback: '() => null',
  }, {
    id: 'friendName', headerName: 'Friend Name', accessor: '() => null', initiallyHidden: true,
  }, {
    id: 'friendAge', headerName: 'Friend Age', headerTooltip: 'Pyrene tooltip to this nice header name', accessor: '() => null',
  }],
  data: [{ name: 'Meredith Carney', age: 23, friend: { name: 'Perry Robinson', age: 33 } }, { name: 'Savage Weeks', age: 21, friend: { name: 'Tammi Reese', age: 32 } }, { name: 'Trevino Daniels', age: 34, friend: { name: 'Beasley Riddle', age: 30 } }, { name: 'Pauline Emerson', age: 26, friend: { name: 'Fisher Horne', age: 37 } }],
  defaultPageSize: 20,
  defaultSorted: [],
  filterValues: {},
  filters: [{ label: 'Free Text', type: 'text', id: 'name' }, {
    label: 'first column', type: 'singleSelect', id: 'testKey', options: [{ value: 'chocolate', label: 'Chocolate', invalid: false }, { value: 'strawberry', label: 'Strawberry', invalid: false }, { value: 'vanilla', label: 'Vanilla', invalid: false }, { value: 'bacon', label: 'Bacon', invalid: true }, { value: 'cookiedough', label: 'Cookie Dough', invalid: false }, { value: 'beer', label: 'Beer', invalid: false }, { value: 'cottoncandy', label: 'Cotton Candy', invalid: false }, { value: 'crab', label: 'Crab', invalid: false }, { value: 'greentea', label: 'Green Tea', invalid: false }, { value: 'mango', label: 'Mango', invalid: false }, { value: 'tuttifrutti', label: 'Tutti Frutti', invalid: false }, { value: 'grape', label: 'Grape', invalid: false }, { value: 'coconutmilk', label: 'Coconut Milk', invalid: false }, { value: 'dulce', label: 'Dulce de Leche', invalid: false }, { value: 'caramel', label: 'Caramel', invalid: false }, { value: 'banana', label: 'Banana', invalid: false }, { value: 'garlic', label: 'Garlic', invalid: true }, { value: 'twix', label: 'Twix', invalid: false }, { value: 'mintchocolatechip', label: 'Mint Chocolate Chip', invalid: false }, { value: 'spearmint', label: 'Spearmint', invalid: false }, { value: 'oyster', label: 'Oyster', invalid: false }, { value: 'pistachio', label: 'Pistachio', invalid: false }, { value: 'rice', label: 'Rice', invalid: false }, { value: 'chickenliver', label: 'Chicken Liver', invalid: true }, { value: 'superman', label: 'Superman', invalid: false }, { value: 'lucuma', label: 'Lucuma', invalid: false }, { value: 'bluemoon', label: 'Blue Moon', invalid: false }, { value: 'charcoal', label: 'Charcoal', invalid: false }, { value: 'cheesecake', label: 'Cheesecake', invalid: false }, { value: 'rumandraisin', label: 'Rum and Raisin', invalid: false }, { value: 'moosetracks', label: 'Moose Tracks', invalid: false }],
  }, {
    label: 'second column', type: 'multiSelect', id: 'testKey2', options: [{ value: 'chocolate', label: 'Chocolate', invalid: false }, { value: 'strawberry', label: 'Strawberry', invalid: false }, { value: 'vanilla', label: 'Vanilla', invalid: false }, { value: 'bacon', label: 'Bacon', invalid: true }, { value: 'cookiedough', label: 'Cookie Dough', invalid: false }, { value: 'beer', label: 'Beer', invalid: false }, { value: 'cottoncandy', label: 'Cotton Candy', invalid: false }, { value: 'crab', label: 'Crab', invalid: false }, { value: 'greentea', label: 'Green Tea', invalid: false }, { value: 'mango', label: 'Mango', invalid: false }, { value: 'tuttifrutti', label: 'Tutti Frutti', invalid: false }, { value: 'grape', label: 'Grape', invalid: false }, { value: 'coconutmilk', label: 'Coconut Milk', invalid: false }, { value: 'dulce', label: 'Dulce de Leche', invalid: false }, { value: 'caramel', label: 'Caramel', invalid: false }, { value: 'banana', label: 'Banana', invalid: false }, { value: 'garlic', label: 'Garlic', invalid: true }, { value: 'twix', label: 'Twix', invalid: false }, { value: 'mintchocolatechip', label: 'Mint Chocolate Chip', invalid: false }, { value: 'spearmint', label: 'Spearmint', invalid: false }, { value: 'oyster', label: 'Oyster', invalid: false }, { value: 'pistachio', label: 'Pistachio', invalid: false }, { value: 'rice', label: 'Rice', invalid: false }, { value: 'chickenliver', label: 'Chicken Liver', invalid: true }, { value: 'superman', label: 'Superman', invalid: false }, { value: 'lucuma', label: 'Lucuma', invalid: false }, { value: 'bluemoon', label: 'Blue Moon', invalid: false }, { value: 'charcoal', label: 'Charcoal', invalid: false }, { value: 'cheesecake', label: 'Cheesecake', invalid: false }, { value: 'rumandraisin', label: 'Rum and Raisin', invalid: false }, { value: 'moosetracks', label: 'Moose Tracks', invalid: false }],
  }],
  keyField: 'name',
  multiSort: true,
  onFilterChange: () => null,
  onRowDoubleClick: () => null,
  pageSizeOptions: [10, 20, 50, 100, 250],
  rowSelectableCallback: (row) => false,
  title: 'Table',
  toggleColumns: true,
};
