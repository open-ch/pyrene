/* eslint-disable no-alert */
import React from 'react';

import { Story, Meta } from '@storybook/react';
import { useArgs } from '@storybook/client-api';
import { CellInfo } from 'react-table';
import Table, { TableProps, ExtendsRow } from './Table';
import {
  Filters,
  MultiselectOption,
  SingleSelectOption,
} from '../Filter/types';

export default {
  title: 'Components/Data/Table',
  component: Table,
} as Meta;

interface Row {
  id: number;
  name: string;
  age: number;
  friend: {
    name: string;
    age: number;
  };
}

const Template: Story<TableProps<Row>> = (args) => <Table<Row> {...args} />;

const friends = [
  {
    id: 0,
    name: 'Meredith Carney',
    age: 23,
    friend: {
      name: 'Perry Robinson',
      age: 33,
    },
  },
  {
    id: 1,
    name: 'Savage Weeks',
    age: 21,
    friend: {
      name: 'Tammi Reese',
      age: 32,
    },
  },
  {
    id: 2,
    name: 'Trevino Daniels',
    age: 34,
    friend: {
      name: 'Beasley Riddle',
      age: 30,
    },
  },
  {
    id: 3,
    name: 'Pauline Emerson',
    age: 26,
    friend: {
      name: 'Fisher Horne',
      age: 37,
    },
  },
  {
    id: 4,
    name: 'Brock Stanley',
    age: 22,
    friend: {
      name: 'Alejandra Browning',
      age: 33,
    },
  },
];

const baseArgs: TableProps<Row> = {
  actions: [
    {
      label: 'Show name',
      callback: (keys) => alert(friends[keys[0] as number].name),
      active: 'single',
    },
    {
      label: 'Show age',
      callback: (keys) => alert(friends[keys[0] as number].age),
      active: 'single',
    },
    {
      label: 'Show age sum of selected',
      callback: (keys) => alert(
        keys
          .map((key) => friends[key as number].age)
          .reduce((v, acc) => acc + v, 0),
      ),
      icon: 'add',
      active: 'multi',
    },
  ],
  onRowDoubleClick: (row) => alert(`Double click: ${(row.row as Row).name || ''}`),
  columns: [
    {
      id: 'name',
      headerName: 'Name',
      accessor: 'name',
      sortMethod: (a: string, b: string) => {
        const lastA = a.charAt(a.length - 1);
        const lastB = b.charAt(b.length - 1);
        if (lastA > lastB) {
          return 1;
        }
        if (lastA < lastB) {
          return -1;
        }
        return 0;
      },
    },
    {
      id: 'age',
      headerName: 'Age',
      accessor: 'age',
      width: 100,
    },
    {
      id: 'ageBar',
      headerName: 'Age Bar',
      accessor: 'age',
      width: 100,
      cellRenderCallback: (cell: ExtendsRow<Row> & CellInfo) => (
        <div
          style={{
            width: '100%',
            height: '16px',
            backgroundColor: 'var(--neutral-020)',
          }}
        >
          <div
            style={{
              width: `${((cell.value - 20) / 20) * 100}%`,
              height: '100%',
              backgroundColor:
                ((cell.value - 20) / 20) * 100 > 66
                  ? 'var(--acqua-300)'
                  : ((cell.value - 20) / 20) * 100 > 33
                    ? 'var(--teal-300)'
                    : 'var(--red-200)',
              transition: 'all .2s ease-out',
            }}
          />
        </div>
      ),
    },
    {
      id: 'friendName',
      headerName: 'Friend Name',
      accessor: (d) => d.friend.name,
      initiallyHidden: true,
    },
    {
      id: 'friendAge',
      headerName: 'Friend Age',
      accessor: (d) => d.friend.age,
      cellRenderCallback: (d) => `Friend's age is ${d?.value as number || ''}`,
      headerTooltip: 'Pyrene tooltip to this nice header name',
    },
  ],
  data: friends,
  keyField: 'id',
  title: 'Friends list',
  multiSelect: true,
};

export const TableTemplate = Template.bind({});
TableTemplate.storyName = 'Table';

TableTemplate.args = baseArgs;

const TemplateFilterable: Story<TableProps<Row>> = ({
  filterValues,
  ...args
}) => {
  const [, updateArgs] = useArgs();
  const onFilterChange = (filters: Filters) => updateArgs({
    data:
        filters && Object.keys(filters).length > 0
          ? friends
            .filter(
              (row) => !filters.name || row.name.includes(filters.name as string),
            )
            .filter((row) => {
              if (!filters.age) return true;

              if ((filters.age as SingleSelectOption).value === 'above_30') return row.age >= 30;
              return row.age < 30;
            })
            .filter(
              (row) => !filters.friends_age
                  || (filters.friends_age as MultiselectOption)
                    .map((x) => x.value)
                    .includes(row.friend.age.toString()),
            )
          : friends,
    filterValues: filters,
  });
  return (
    <Table<Row>
      {...args}
      onFilterChange={onFilterChange}
      filterValues={filterValues}
    />
  );
};
export const FilterableTable = TemplateFilterable.bind({});

const ageRangeOptions = [
  { value: 'under_30', label: '< 30', invalid: false },
  { value: 'above_30', label: '>= 30', invalid: false },
];

const ageOptions = Array.from(Array(40).keys()).map((age) => ({
  value: age.toString(),
  label: age.toString().padStart(2, '0'),
  invalid: false,
}));

FilterableTable.args = {
  ...baseArgs,
  toggleColumns: true,
  filters: [
    {
      label: 'Name',
      type: 'text',
      id: 'name',
    },
    {
      label: 'Age',
      type: 'singleSelect',
      id: 'age',
      options: ageRangeOptions,
    },
    {
      label: 'Friend age',
      type: 'multiSelect',
      id: 'friends_age',
      options: ageOptions,
    },
  ],
};
