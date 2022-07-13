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
  usePagination,
  Row,
  TableRowProps,
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
import { IconNames } from '../types';
import { ActionActiveOption } from '../../utils/TableUtils';
import TablePagination from './TablePagination/TablePagination';
import Banner from '../Banner/Banner';

const defaultColumn = {
  minWidth: 30,
  width: 130,
};

type ManipulateTable = {
  scrollToRow: (rowId: string, align?: Align) => void;
  toggleAllRowsExpansion: (cb?: any) => void;
  tableFullyExpanded: boolean;
  selectedRows?: Row[] | string[];
};

export interface CustomSubRowProps {
  row?: Row;
  rowProps?: TableRowProps;
  listRef?: React.MutableRefObject<any>;
}

export interface Action {
  active: ActionActiveOption;
  callback: (rows: Row<{}>[] | string[]) => void;
  icon?: keyof IconNames;
  label: string;
  loading?: boolean;
}

export interface TreeTableReactProps<R> {
  /**
   * Sets the table actions. Type: [{ icon: string, label: string (required), callback: func (required), active: oneOf('single', 'multi', 'always', 'disabled') (required) }]
   */
  actions?: Array<Action>;
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
   * Is expand all button visible
   * Defaults to true
   */
  expandAllVisible?: boolean;
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
   * Sets a function to get a unique key for each row. Necessary for Selected Rows with Server Side Pagination. Params: (Row)
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
   * Whether the table should be virtualized (only visible rows rendered - faster) or all rows always rendered. The height prop must also be provided if virtualized is true. Not available when passing `renderSubRowComponent`
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
  /**
   * Custom sub row component
   */
  renderSubRowComponent?: ({ row, rowProps, listRef }: CustomSubRowProps) => JSX.Element;
  /**
   * Sets share link value.
   */
  shareLink?: string;
  /**
   * Show pagination footer
   */
  paginated?: boolean;
  /**
   * Sets the page sizes that the user can choose from.
   */
  pageSizeOptions?: number[];
  /**
   * Sets the page size when the component is first mounted.
   */
  defaultPageSize?: number;
  /**
   * Set to true to be able to handle sorting and pagination server-side (use only with server-side data fetching & pagination).
   */
  manual?: boolean;
  /**
   * Called initially when the table loads & any time sorting, pagination or filterting is changed in the table (use only with server-side data fetching & pagination).
   */
  onFetchData?: (args: { pageIndex: number; pageCount: number; pageSize?: number }) => void;
  /**
   * Amount of pages to be shown in React Table (use only with server-side data fetching & pagination).
   */
  pages?: number;
  /**
   * Page to display by the Table (use only with server-side data fetching & pagination).
   */
  currentPage?: number;
  /**
   * Amount of results to be displayed in Table Footer (use only with server-side data fetching & pagination).
   */
  numberOfResults?: number;
}

function InnerTreeTableReact<R extends object = {}>(
  {
    actions = [],
    expandAllVisible = true,
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
    renderSubRowComponent,
    pageSizeOptions = [10, 20, 50, 100, 250],
    defaultPageSize = 20,
    manual,
    onFetchData,
    pages,
    currentPage,
    numberOfResults = 0,
    paginated,
    shareLink,
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
    prepareRow,
    toggleAllRowsExpanded,
    toggleRowExpanded,
    toggleAllRowsSelected,
    isAllRowsExpanded,
    headerGroups,
    toggleHideColumn,
    columns: currentColumns,
    selectedFlatRows,
    totalColumnsWidth,
    page: rows, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    setPageSize,
    nextPage,
    previousPage,
    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable(
    {
      columns: memoizedColumns,
      data: memoizedData,
      manualPagination: manual,
      pageCount: manual ? pages : undefined,
      // TODO: fix when pagination and select ->  children are selected but button is not checked
      paginateExpandedRows: paginated ? false : true,
      autoResetSelectedRows: manual ? false : true,
      // For multiSelect nested data option to select children
      // data format must contain subRows https://github.com/TanStack/react-table/issues/2609
      ...(!multiSelect &&
        setSubRowsKey && {
          getSubRows: (row) => setSubRowsKey(row as Row) || [],
        }),
      defaultColumn,
      ...(setUniqueRowKey && {
        getRowId: (row) => setUniqueRowKey(row as Row),
      }),
      initialState: {
        // if there is no pagination show all data
        pageSize: paginated ? defaultPageSize : data.length,
        pageIndex: manual ? currentPage : 0,
        hiddenColumns: columns
          .filter((col: Column) => col.initiallyHidden === true)
          .map((col) => col.id || col.accessor) as any,
      },
    },
    useExpanded,
    useFlexLayout,
    useResizeColumns,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        ...(multiSelect
          ? [
              {
                id: 'selection',
                disableResizing: true,
                minWidth: 24,
                width: 24,
                maxWidth: 24,
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

  const tableStateUpdateRef = useRef(false);
  useEffect(() => {
    if (manual && onFetchData) {
      tableStateUpdateRef.current = true;
      onFetchData({ pageIndex, pageCount, pageSize });
    }
  }, [onFetchData, pageIndex, pageSize, manual]);
  /* reset the page index to 0 when the table data updates due to something
other than internal table state changes
 */
  useEffect(() => {
    if (!tableStateUpdateRef.current) {
      gotoPage(0);
    }
  }, [data, gotoPage]);
  // clear our ref when the data is loaded, after we perform any side effects
  useEffect(() => {
    tableStateUpdateRef.current = false;
  }, [data]);

  useEffect(() => {
    toggleColumnsHandler?.(currentColumns);
  }, [currentColumns, toggleColumnsHandler]);

  useEffect(() => {
    virtualized && listRef?.current?.resetAfterIndex?.(0);
  }, [isAllRowsExpanded, rows]);

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
      if (virtualized && !renderSubRowComponent && listRef.current) {
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
  const selectedRowIdsArr = useMemo(() => Object.keys(selectedRowIds), [selectedFlatRows]);
  useImperativeHandle(ref, () => ({
    scrollToRow,
    toggleAllRowsExpansion,
    tableFullyExpanded: isAllRowsExpanded,
    selectedRows: manual ? selectedRowIdsArr : selectedFlatRows,
  }));

  const renderRow = useCallback(
    ({ index, style }: { index: number; style?: CSSProperties }) => {
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
          customSubRow={renderSubRowComponent}
        />
      );
    },
    [
      rows,
      listRef,
      multiSelect,
      expandOnParentRowClick,
      onRowDoubleClick,
      onRowClick,
      onRowHover,
      renderSubRowComponent,
    ]
  );

  const renderPagination = useCallback(
    () =>
      paginated && (
        <TablePagination
          canNext={canNextPage}
          canPrevious={canPreviousPage}
          pages={pageCount}
          pageSizeOptions={pageSizeOptions}
          page={pageIndex}
          loading={loading}
          onPageSizeChange={setPageSize}
          numberOfResults={manual ? numberOfResults : data.length}
          pageSize={pageSize}
          onClearSelection={() => toggleAllRowsSelected(false)}
          // TODO: count just parent row
          numberOfSelected={manual ? selectedRowIdsArr?.length : selectedFlatRows.length}
          nextPage={nextPage}
          previousPage={previousPage}
        />
      ),
    [
      canNextPage,
      canPreviousPage,
      pageSizeOptions,
      pageSize,
      selectedRowIds,
      selectedFlatRows,
      selectedRowIdsArr,
      pageCount,
      pageIndex,
      loading,
      setPageSize,
      nextPage,
      previousPage,
      toggleAllRowsSelected,
      manual,
      data,
      numberOfResults,
      paginated,
    ]
  );
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
          actions={actions}
          shareLink={shareLink}
          selection={manual ? selectedRowIdsArr : selectedFlatRows}
          toggleAll={() => toggleAllRowsExpanded()}
          displayExpandAll={!isAllRowsExpanded}
          disabledExpand={isFlatTree(rows, setSubRowsKey) && !renderSubRowComponent}
          expandAllVisible={expandAllVisible}
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
          renderPagination={renderPagination}
        />
        <div {...getTableProps()} className={styles.table}>
          <TreeTableHeader headerGroups={headerGroups} resizable={resizable} />
          <div ref={containerRef} className={styles.tableBody} {...getTableBodyProps()}>
            {virtualized && !renderSubRowComponent ? (
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
        {renderPagination()}
      </div>
    </div>
  );
}
InnerTreeTableReact.displayName = 'TreeTableReact';
const TreeTableReact = forwardRef(InnerTreeTableReact) as <T>(
  props: TreeTableReactProps<T> & { ref?: React.ForwardedRef<ManipulateTable> }
) => ReturnType<typeof InnerTreeTableReact>;
export default TreeTableReact;
