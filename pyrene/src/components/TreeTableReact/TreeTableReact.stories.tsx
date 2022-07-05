import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { Column, Row } from 'react-table-7';

import TreeTableReact, { TreeTableReactProps } from './TreeTableReact';
import treeTableData from './data.json';
import flatData from './flatData.json';
import Loader from '../Loader/Loader';
import Card from '../Card/Card';

export default {
  title: 'Components/Data/TreeTableReact',
  component: TreeTableReact,
} as Meta;

interface TableRow {
  id: string;
  name: string;
  phone: string;
  children: Array<{
    id: string;
    name: string;
    phone: string;
  }>;
}

const treeTableColumns: Array<Column<object>> = [
  { Header: 'First Name', accessor: 'name', id: 'name' },
  { Header: 'Phone', accessor: 'phone', id: 'phone' },
  { Header: 'Hobby', accessor: 'hobby', id: 'hobby' },
];
const baseArgs = {
  columns: treeTableColumns,
  multiSelect: true,
  resizable: true,
  virtualized: true,
};
const DefaultTemplate: Story<TreeTableReactProps<TableRow>> = (args) => (
  <TreeTableReact {...args} />
);

export const Standard = DefaultTemplate.bind({});
Standard.args = {
  ...baseArgs,
  data: treeTableData,
};

const actions = [
  {
    label: 'Show name',
    callback: (rows: Row<{}>[]) => alert(rows[0].original.name),
    active: 'single',
  },
  {
    label: 'Show phone',
    callback: (rows: Row<{}>[]) => alert(rows[0].original.phone),
    active: 'single',
  },
  {
    label: 'Show concat of names of selected',
    callback: (rows: Row<{}>[]) => alert(rows.map((r) => r.original.name).join(', ')),
    icon: 'add',
    active: 'multi',
  },
];

export const WithActions = DefaultTemplate.bind({});
WithActions.args = {
  ...baseArgs,
  data: treeTableData,
  actions,
  expandAllVisible: false,
};

function LazyComponent({ listRef }: any) {
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      listRef?.current?.resetAfterIndex(0);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 25 }}>
      {loading ? (
        <Loader />
      ) : (
        <Card>
          <div>Hello word</div>
        </Card>
      )}
    </div>
  );
}

const LazyLoadingTemplate: Story<TreeTableReactProps<TableRow>> = (args) => {
  const renderRowSubComponent = useCallback(
    ({ row, rowProps }) => <LazyComponent row={row} rowProps={rowProps} />,
    []
  );
  return <TreeTableReact {...args} renderSubRowComponent={renderRowSubComponent} />;
};

export const LazyLoading = LazyLoadingTemplate.bind({});
LazyLoading.storyName = 'Lazy SubRows';
LazyLoading.args = { ...baseArgs, data: flatData };

export const PaginatedTable = DefaultTemplate.bind({});
PaginatedTable.storyName = 'Paginated Table';
PaginatedTable.args = { ...baseArgs, paginated: true, virtualized: false, data: treeTableData };

const ServerPaginatedTemplate: Story<TreeTableReactProps<TableRow>> = (args) => {
  const [data, setData] = useState<any>();
  const fetchData = useCallback(({ pageSize, pageIndex }) => {
    const fetchId = ++fetchIdRef.current;
    setLoading(true);
    setTimeout(() => {
      // Only update the data if this is the latest fetch
      if (fetchId === fetchIdRef.current) {
        const startRow = pageSize * (pageIndex ?? 0);
        const endRow = startRow + pageSize;
        setData(treeTableData.slice(startRow, endRow));
        setPageCount(Math.ceil(treeTableData.length / pageSize));
        setLoading(false);
      }
    }, 1000);
  }, []);
  const fetchIdRef = useRef(0);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  return (
    <TreeTableReact
      {...args}
      numberOfResults={treeTableData.length}
      data={data ?? []}
      manual={true}
      onFetchData={fetchData}
      pages={pageCount}
      currentPage={fetchIdRef.current}
      loading={loading}
    />
  );
};

export const ServerPaginatedTable = ServerPaginatedTemplate.bind({});
ServerPaginatedTable.storyName = 'Server Paginated Table';
ServerPaginatedTable.args = {
  ...baseArgs,
  paginated: true,
  virtualized: false,
  setUniqueRowKey: (row) => row.id,
};
