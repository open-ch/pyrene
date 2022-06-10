import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
  CSSProperties,
} from 'react';
import {
  useTable,
  useExpanded,
  Column,
  useFlexLayout,
  useResizeColumns,
  useRowSelect,
  Row,
} from 'react-table-7';
import { VariableSizeList, Align } from 'react-window';
import clsx from 'clsx';

import Loader from '../Loader/Loader';
import TreeTableHeader from './TreeTableHeader/TreeTableHeader';
import TreeTableActionBar, {
  TreeTableActionBarProps,
} from './TreeTableActionBar/TreeTableActionBar';
import TreeTableRow, { TreeTableRowProps } from './TreeTableRow/TreeTableRow';
import Checkbox from './Checkbox/Checkbox';
import Filter from '../Filter/Filter';
import { Filter as FilterType, Filters } from '../Filter/types';

import styles from './TreeTableReact.module.css';
import {
  getFirstLevelParentRowId,
  handleExpandAllParentsOfRowById,
  initializeRootData,
  isFlatTree,
  prepareColumnToggle,
  scrollbarWidth,
} from './utils';

const defaultColumn = {
  minWidth: 30,
  width: 130,
};

type ManipulateTable = {
  scrollToRow: (rowId: string, align?: Align) => void;
  toggleAllRowsExpansion: (cb?: any) => void;
  tableFullyExpanded: boolean;
  selectedRows?: Row[];
};

export interface TreeTableReactProps<R> {
  /**
   * Sets the Table columns.
   * Type: [{ id: string (required), headerName: string (required), accessor: string (required), headerStyle: object, cellStyle: object, initiallyHidden: bool, width: number }]
   */
  columns: Array<Column>;
  /**
   * Sets the Table data displayed in the rows.
   * Type: [{ children: object, lineCount: number, ...row }]
   */
  data: Array<R>;
  /**
   * Enables toggle row expansion on the full parent row, instead of the chevron only. Overrides onRowDoubleClick and onRowClick for parent rows.
   */
  expandOnParentRowClick?: boolean;
  /**
   * Sets the available filters.
   * Type: [{ label: string (required), type: oneOf('singleSelect', 'multiSelect', 'text') (required), key: string (required), options: array }]
   */
  filters?: FilterType[];
  /**
   * values to be filtered & displayed in filter dropdown
   * */
  filterValues?: Filters;
  /**
   * Sets the height for the table. This is only needed when the virtualized prop is true.
   */
  height?: number;
  /**
   * Highlights a rule in the table. Should be the same value that is calculated by using the `setUniqueRowKey` method.
   */
  highlightedRowId?: string;
  /**
   * Disables the component and displays a loader inside of it.
   */
  loading?: boolean;
  /**
   * Called when the filter changes.
   */
  onFilterChange?: () => void;
  /**
   * Called when the user clicks on a row.
   */
  onRowClick?: TreeTableRowProps['onRowClick'];
  /**
   * Called when the user double clicks on a row.
   */
  onRowDoubleClick?: TreeTableRowProps['onRowDoubleClick'];
  /**
   * Sets the hover callback for row mouseover.
   * (rowData: object, isEntering: boolean) => null
   */
  onRowHover?: (row: Row['original'], h: boolean) => void;
  /**
   * Render content on the right side of the action bar of the table
   */
  renderActionBarRightItems?: TreeTableActionBarProps['renderRightItems'];
  /**
   * default row height for a single line row
   */
  rowLineHeight?: number;
  /**
   * Sets a function to get a unique key for each row. Params: (Row)
   */
  setUniqueRowKey?: (row: Row) => string;
  /**
   * Sets a function to get sub rows. For multi select subRows will override this value.  Params: (Row)
   */
  setSubRowsKey?: (row: Row) => Row[];
  /**
   * Sets the title.
   */
  title?: string;
  /**
   * Whether the columns (hide/show) popover is available to the user.
   */
  toggleColumns?: boolean;
  /**
   * Callback handler function when the columns of the table are getting toggled.
   */
  toggleColumnsHandler?: (columns?: Array<Column>) => void;
  /**
   * Whether the table should be virtualized (only visible rows rendered - faster) or all rows always rendered. The height prop must also be provided if virtualized is true.
   */
  virtualized?: boolean;
  /**
   * Changes the overall appearance of the table to become multi-selectable (checkbox table). Requires keyField prop.
   */
  multiSelect?: boolean;
  /**
   * Whether the columns are resizable by the user or not
   */
  resizable?: boolean;
}

function InnerTreeTableReact<R extends object = {}>(
  {
    data,
    columns,
    expandOnParentRowClick = false,
    title = '',
    height = 300,
    loading = false,
    toggleColumns = true,
    toggleColumnsHandler,
    rowLineHeight = 32,
    virtualized = false,
    highlightedRowId,
    multiSelect,
    resizable,
    onRowHover,
    onRowClick,
    onRowDoubleClick,
    onFilterChange,
    renderActionBarRightItems,
    filters,
    filterValues = {},
    setUniqueRowKey,
    setSubRowsKey,
  }: TreeTableReactProps<R>,
  ref: React.ForwardedRef<ManipulateTable>
) {
  const [userColumns, setUserColumns] = useState<Column[]>(columns);
  const restoreColumnDefaults = () => {
    setUserColumns(prepareColumnToggle(columns));
  };
  const innerRef = useRef<HTMLDivElement>();
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<any>();
  // All data have to be memoized in order to prevent maximum update depth exceeded error
  // https://github.com/TanStack/react-table/issues/1994
  const memoizedData = useMemo(() => data, [data]);
  const memoizedColumns = useMemo(() => userColumns, [userColumns]);
  const scrollBarSize = useMemo(() => scrollbarWidth(), []);

  const {
    getTableProps,
    getTableBodyProps,
    rows,
    prepareRow,
    toggleAllRowsExpanded,
    toggleRowExpanded,
    isAllRowsExpanded,
    headerGroups,
    toggleHideColumn,
    columns: currentColumns,
    selectedFlatRows,
    totalColumnsWidth,
  } = useTable(
    {
      columns: memoizedColumns,
      data: memoizedData,
      //For multiSelect nested data option to select children
      //data format must contain subRows https://github.com/TanStack/react-table/issues/2609
      ...(!multiSelect &&
        setSubRowsKey && {
          getSubRows: (row) => setSubRowsKey(row as Row) || [],
        }),
      defaultColumn,
      ...(setUniqueRowKey && {
        getRowId: (row) => setUniqueRowKey(row as Row),
      }),
      initialState: {
        hiddenColumns: columns
          .filter((col: Column) => col.initiallyHidden === true)
          .map((col) => col.id || col.accessor) as any,
      },
    },
    useExpanded,
    useFlexLayout,
    useResizeColumns,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        ...(multiSelect
          ? [
              {
                id: 'selection',
                disableResizing: true,
                minWidth: 20,
                width: 20,
                maxWidth: 20,
                // @ts-ignore
                Header: ({ getToggleAllRowsSelectedProps }) => (
                  <Checkbox {...getToggleAllRowsSelectedProps()} />
                ),
                Cell: ({ row }: { row: Row }) => (
                  // @ts-ignore
                  <Checkbox {...row.getToggleRowSelectedProps()} />
                ),
              },
            ]
          : []),
        {
          id: 'expander',
          disableResizing: true,
          minWidth: 20,
          width: 20,
        },
        ...columns,
      ]);
    }
  );

  useEffect(() => {
    toggleColumnsHandler?.(currentColumns);
  }, [currentColumns, toggleColumnsHandler]);

  useEffect(() => {
    listRef?.current?.resetAfterIndex?.(0);
  }, [isAllRowsExpanded]);

  const getItemHeight = useCallback(
    (i: number) => {
      const row = rows[i]?.original as { lineCount?: number };
      const size = (row && row?.lineCount) || 1;
      return size * rowLineHeight;
    },
    [rows]
  );

  const scrollToRow = useCallback(
    (rowId: string, align: Align = 'start') => {
      if (isAllRowsExpanded) {
        const indexToScrollTo = rows.findIndex(({ id }) => id === rowId);
        listRef.current.scrollToItem(indexToScrollTo, align);
        return;
      }
      handleExpandAllParentsOfRowById(toggleRowExpanded as any, rowId);
      const indexToScrollTo = rows.findIndex(({ id }) => id === rowId);
      const firstLvlParentRowId = getFirstLevelParentRowId(rowId);
      const firstLvlParentRowIndex = rows.findIndex(({ id }) => id === firstLvlParentRowId);
      /**
       * we want to clear the cache starting from parent,
       * since "leaf node" scroll might have sibling or parents that also get inserted into the dataset on expand.
       * Therefore overlapping the height cache between 1st level parent and scrolled element.
       */
      listRef?.current?.resetAfterIndex?.(firstLvlParentRowIndex);
      if (virtualized && listRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        listRef.current.scrollToItem(indexToScrollTo, 'start');
      } else if (containerRef.current) {
        // scroll page when non-virtualized
        const parent = containerRef.current;
        const rowElements = parent.children;
        const element = rowElements[indexToScrollTo];
        const viewportTop = element.getBoundingClientRect().top;
        const pageScrollTop = document.documentElement.scrollTop || document.body.scrollTop;

        window.scrollTo(0, viewportTop + pageScrollTop);
      }
    },
    [isAllRowsExpanded, rows, listRef]
  );

  const toggleAllRowsExpansion = useCallback(
    (cb = () => {}) => {
      if (!isAllRowsExpanded) {
        toggleAllRowsExpanded();
      }
      cb();
    },
    [isAllRowsExpanded, listRef]
  );

  useImperativeHandle(ref, () => ({
    scrollToRow,
    toggleAllRowsExpansion,
    tableFullyExpanded: isAllRowsExpanded,
    selectedRows: selectedFlatRows,
  }));

  const renderRow = ({ index, style }: { index: number; style?: CSSProperties }) => {
    const row = rows[index];
    prepareRow(row);
    initializeRootData(row);
    return (
      <TreeTableRow
        key={row.id}
        row={row}
        highlighted={highlightedRowId === row.id}
        index={index}
        listRef={listRef}
        expandOnParentRowClick={expandOnParentRowClick}
        onRowDoubleClick={onRowDoubleClick}
        onRowClick={onRowClick}
        onRowHover={onRowHover}
        style={style}
        multiSelect={multiSelect}
      />
    );
  };

  return (
    <div className={styles.treeTableContainer}>
      {title && <div className={styles.treeTableTitle}>{title}</div>}
      {loading && (
        <div className={styles.loader}>
          <Loader size="large" />
        </div>
      )}
      <div className={clsx({ [styles.loading]: loading })}>
        {Array.isArray(filters) && filters.length > 0 && (
          <div className={styles.filterContainer}>
            <Filter filters={filters} filterValues={filterValues} onFilterSubmit={onFilterChange} />
          </div>
        )}
        <TreeTableActionBar
          toggleAll={() => toggleAllRowsExpanded()}
          displayExpandAll={!isAllRowsExpanded}
          disabledExpand={isFlatTree(rows, setSubRowsKey)}
          columnToggleProps={{
            listItems: currentColumns.slice(1).map((col: Column) => ({
              id: col.id,
              label: col.Header as string,
              value: col.isVisible,
            })),
            onItemClick: (columnId?: string) => {
              toggleHideColumn(columnId ?? '');
            },
            onRestoreDefault: () => restoreColumnDefaults(),
            toggleColumns: toggleColumns,
          }}
          renderRightItems={renderActionBarRightItems}
        />
        <div {...getTableProps()} className={styles.table}>
          <TreeTableHeader headerGroups={headerGroups} resizable={resizable} />
          <div ref={containerRef} className={styles.tableBody} {...getTableBodyProps()}>
            {virtualized ? (
              <VariableSizeList
                height={height}
                itemCount={rows.length}
                width={totalColumnsWidth + scrollBarSize}
                innerRef={innerRef}
                itemSize={getItemHeight}
                itemKey={(index) => rows[index].id}
                ref={listRef}
                overscanCount={10}
                style={{ minWidth: '100%', width: 'auto' }}
              >
                {renderRow}
              </VariableSizeList>
            ) : (
              rows.map((_, index) => renderRow({ index, style: { minWidth: '100%' } }))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
InnerTreeTableReact.displayName = 'TreeTableReact';
const TreeTableReact = forwardRef(InnerTreeTableReact) as <T>(
  props: TreeTableReactProps<T> & { ref?: React.ForwardedRef<ManipulateTable> }
) => ReturnType<typeof InnerTreeTableReact>;
export default TreeTableReact;
