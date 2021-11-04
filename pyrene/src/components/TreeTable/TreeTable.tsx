/* eslint-disable no-confusing-arrow */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/static-property-placement */
import React, { CSSProperties } from 'react';
import clsx from 'clsx';
import { VariableSizeList, Align } from 'react-window';

import styles from './treeTable.css';
import TreeTableHeader from './TreeTableHeader/TreeTableHeader';
import TreeTableActionBar, { TreeTableActionBarProps } from './TreeTableActionBar/TreeTableActionBar';
import TreeTableRow, { TreeTableRowProps } from './TreeTableRow/TreeTableRow';
import Filter from '../Filter/Filter';
import TreeTableUtils from './TreeTableUtils';
import Loader from '../Loader/Loader';
import { Column, RowData } from './types';
import { Filter as FilterType, Filters } from '../Filter/types';

export interface TreeTableProps<R>{
  /**
   * Sets the Table columns.
   * Type: [{ id: string (required), headerName: string (required), accessor: string (required), headerStyle: object, cellStyle: object, initiallyHidden: bool, width: number }]
   */
  columns: Array<Column<R>>,
  /**
   * Sets the Table data displayed in the rows.
   * Type: [{ children: object, lineCount: number, ...row }]
   */
  data: Array<R>,
  /**
   * Enables toggle row expansion on the full parent row, instead of the chevron only. Overrides onRowDoubleClick and onRowClick for parent rows.
   */
  expandOnParentRowClick?: boolean,
  /**
   * Sets the available filters.
   * Type: [{ label: string (required), type: oneOf('singleSelect', 'multiSelect', 'text') (required), key: string (required), options: array }]
   */
  filters?: Array<FilterType>,
  /**
   * values to be filtered & displayed in filter dropdown
   * use {} for passing empty filterValues
   * */
  filterValues: Filters,
  /**
   * Sets the height for the table. This is only needed when the virtualized prop is true.
   */
  height?: number,
  /**
   * Highlights a rule in the table. Should be the same value that is calculated by using the `setUniqueRowKey` method.
   */
  highlightedRowId?: string,
  /**
   * Disables the component and displays a loader inside of it.
   */
  loading?: boolean,
  /**
   * Called when the filter changes.
   */
  onFilterChange?: () => void,
  /**
   * Called when the user clicks on a row.
   */
  onRowClick?: TreeTableRowProps<R>['onRowClick'],
  /**
   * Called when the user double clicks on a row.
   */
  onRowDoubleClick?: TreeTableRowProps<R>['onRowDoubleClick'],
  /**
   * Sets the hover callback for row mouseover.
   * (rowData: object, isEntering: boolean) => null
   */
  onRowHover?: (row: RowData<R>, h: boolean) => void,
  /**
   * Render content on the right side of the action bar of the table
   */
  renderActionBarRightItems?: TreeTableActionBarProps['renderRightItems'],
  /**
   * default row height for a single line row
   */
  rowLineHeight?: number,
  /**
   * Sets a function to get a unique key for each row. Params: (rowData)
   */
  setUniqueRowKey?: (row: RowData<R>) => string | number,
  /**
   * Sets the title.
   */
  title?: string,
  /**
   * Whether the columns (hide/show) popover is available to the user.
   */
  toggleColumns?: boolean,
  /**
   * Callback handler function when the columns of the table are getting toggled.
   */
  toggleColumnsHandler?: (columns?: Array<Column<R>>) => void,
  /**
   * Whether the table should be virtualized (only visible rows rendered - faster) or all rows always rendered. The height prop must also be provided if virtualized is true.
   */
  virtualized?: boolean,
}

export interface TreeTableState<R> {
  tableFullyExpanded: boolean,
  columns: Array<Column<R>>,
  expanded: Record<string, boolean>,
  rows: Array<RowData<R>>,
  tableKey?: number,
  disabledExpandButton: boolean,
  scrollBarWidth: number,
}

/* eslint-disable no-underscore-dangle */

/* seems to be a design decision to use _ here */

/**
 *  [🌳 • ┬─┬]
 *
 * A tree table contains a hierarchical set of data structured in rows and columns and grouped into nodes.
 * Trees are used to display and work with large amounts of hierarchical data.
 * They have a high data density and therefore convey an immediate feeling of complexity.
 * Ideally, you should only show trees with a lot of hierarchical data as a last resort.
 *
 * For simple tables with few data, avoid the virtualized and height props. For tables with thousands of items, those two options are worth looking into.
 */
class TreeTable<R extends {} = {}> extends React.Component<TreeTableProps<R>, TreeTableState<R>> {

  static displayName = 'TreeTable';

  static defaultProps = {
    expandOnParentRowClick: false,
    title: '',
    height: 300,
    loading: false,
    toggleColumns: true,
    rowLineHeight: 32,
    virtualized: false,
  };

  innerRef = React.createRef<HTMLDivElement>();

  containerRef = React.createRef<HTMLDivElement>();

  listRef = React.createRef<any>();

  constructor(props: TreeTableProps<R>) {
    super(props);
    const rows = TreeTableUtils.initialiseRootData(props.data, props.setUniqueRowKey) as Array<RowData<R>>;

    this.state = {
      tableFullyExpanded: false,
      columns: TreeTableUtils.prepareColumnToggle(props.columns) as Array<Column<R>>,
      expanded: {},
      rows,
      tableKey: Date.now(),
      disabledExpandButton: this.isFlatTree(rows),
      scrollBarWidth: this.calculateScrollBarWidth(),
    };
  }

  componentDidMount() {
    this.setState({
      scrollBarWidth: this.calculateScrollBarWidth(),
    });
  }

  componentDidUpdate(prevProps: TreeTableProps<R>) {
    if (this.props.data !== prevProps.data) {
      const rows = TreeTableUtils.initialiseRootData(this.props.data, this.props.setUniqueRowKey) as Array<RowData<R>>;
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        rows,
        expanded: {},
        tableFullyExpanded: false,
        disabledExpandButton: this.isFlatTree(rows),
      });
      this.clearHeightCacheAfterIndex(0);
    }

    const newScrollBarWidth = this.calculateScrollBarWidth();
    if (this.state.scrollBarWidth !== newScrollBarWidth) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        scrollBarWidth: newScrollBarWidth,
      });
    }
  }

  getItemHeight = (i: number) => {
    const row = this.state.rows[i] as RowData<R> & { lineCount?: number };
    const size = (row && row.lineCount) || 1;
    return size * (this.props.rowLineHeight as number);
  };

  toggleAllRowsExpansion = (cb = () => {}) => {
    const { data, setUniqueRowKey } = this.props;
    this.clearHeightCacheAfterIndex(0); // clear all

    this.setState(({ tableFullyExpanded }) => {
      if (tableFullyExpanded) {
        return {
          rows: TreeTableUtils.initialiseRootData(data, setUniqueRowKey) as Array<RowData<R>>,
          expanded: {},
          tableFullyExpanded: !tableFullyExpanded,
          tableKey: Date.now(), // as all rows are closed, we need to recalculate the height for the whole view - a key is the easiest way
        };
      }

      return {
        ...TreeTableUtils.handleAllRowExpansion(data, { rows: data, expanded: {} }) as { expanded: Record<string, boolean>, rows: Array<RowData<R>> },
        tableFullyExpanded: !tableFullyExpanded,
      };
    }, cb);
  };

  scrollToRow = (rowId: string, align: Align = 'start') => {
    if (this.state.tableFullyExpanded) {
      const indexToScrollTo = this.state.rows.findIndex(({ _rowId }) => _rowId === rowId);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      this.listRef.current.scrollToItem(indexToScrollTo, align);
      return;
    }
    const { rows, expanded } = TreeTableUtils.handleExpandAllParentsOfRowById(rowId, this.state) as { expanded: Record<string, boolean>, rows: Array<RowData<R>> };
    this.setState({ rows, expanded }, () => {
      const indexToScrollTo = rows.findIndex(({ _rowId }) => _rowId === rowId);
      const firstLvlParentRowId = TreeTableUtils.getFirstLevelParentRowId(rowId, this.state) as string;
      const firstLvlParentRowIndex = rows.findIndex(({ _rowId }) => _rowId === firstLvlParentRowId);
      /**
       * we want to clear the cache starting from parent,
       * since "leaf node" scroll might have sibling or parents that also get inserted into the dataset on expand.
       * Therefore overlapping the height cache between 1st level parent and scrolled element.
       */
      this.clearHeightCacheAfterIndex(firstLvlParentRowIndex);
      if (this.props.virtualized && this.listRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        this.listRef.current.scrollToItem(indexToScrollTo, 'start');
      } else if (this.containerRef.current) {
        // scroll page when non-virtualized
        const parent = this.containerRef.current;
        const rowElements = parent.children;
        const element = rowElements[indexToScrollTo];
        const viewportTop = element.getBoundingClientRect().top;
        const pageScrollTop = (document.documentElement.scrollTop || document.body.scrollTop);

        window.scrollTo(0, viewportTop + pageScrollTop);
      }
    });
  };

  isFullyExpanded = (rows: Array<RowData<R>>, expanded: Record<string, boolean>) => rows
    .filter((r) => r.children && r.children.length)
    .every((r) => expanded[r._rowId]);

  isFlatTree = (rows: Array<RowData<R>>) => rows
    .every((row) => row._treeDepth === 0 && !(row.children && row.children.length));

  calculateScrollBarWidth = () => (this.containerRef.current && this.innerRef.current)
    ? this.containerRef.current.offsetWidth - this.innerRef.current.offsetWidth : 0;

  /**
   * clears the inner cache of styles and sizes of VariableSizeList,
   * which expects the same row index to have the same size.
   * When expanding we insert rows of different height into existing index space and cache gets dirty.
   * @param i - index to clear from(inclusive) to the end of the list
   */
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  clearHeightCacheAfterIndex = (i: number) => this.listRef?.current?.resetAfterIndex?.(i);

  renderRow = (onExpandRow: TreeTableRowProps<R>['onExpand']) => ({ index, style }: { index: number, style?: CSSProperties }) => {
    const rowData = this.state.rows[index];
    const { _rowId: rowKey } = rowData;

    return (
      <div
        style={style}
        key={rowKey}
        onMouseOver={() => this.props?.onRowHover?.(rowData, true)}
        onMouseOut={() => this.props?.onRowHover?.(rowData, false)}
      >
        <TreeTableRow
          style={style}
          key={rowKey}
          index={index}
          data={rowData}
          parent={rowData.children ? rowData.children.length > 0 : false}
          highlighted={this.props.highlightedRowId === rowKey}
          level={rowData._treeDepth}
          isExpanded={this.state.expanded[rowKey] || false}
          columns={this.state.columns}
          onRowClick={this.props.onRowClick}
          onRowDoubleClick={this.props.onRowDoubleClick}
          expandOnParentRowClick={this.props.expandOnParentRowClick as boolean}
          onExpand={onExpandRow}
        />
      </div>
    );
  };

  render() {
    const { props } = this;
    const {
      expanded,
      tableFullyExpanded,
      columns,
      rows,
      tableKey,
      disabledExpandButton,
      scrollBarWidth,
    } = this.state;

    const isColumnHidden = (hidden: undefined | boolean) => typeof hidden === 'undefined' || hidden !== true;

    const toggleColumnDisplay = (columnId?: string, hiddenValue?: boolean, handler?: TreeTableProps<R>['toggleColumnsHandler']) => {
      const updatedColumns = columns.map((col) => {
        if (col.id === columnId) {
          return { ...col, hidden: hiddenValue };
        }
        return col;
      });

      this.setState({ columns: updatedColumns }, () => handler?.(updatedColumns));
    };

    const restoreColumnDefaults = (handler: TreeTableProps<R>['toggleColumnsHandler']) => {
      this.setState({ columns: TreeTableUtils.prepareColumnToggle(props.columns) as Array<Column<R>> }, () => handler?.(props.columns));
    };

    const onExpandRow: TreeTableRowProps<R>['onExpand'] = ({ row, index }) => {
      this.clearHeightCacheAfterIndex(index);
      this.setState((prevState) => ({ ...TreeTableUtils.handleRowExpandChange(row, prevState), tableFullyExpanded: this.isFullyExpanded(rows, expanded) }));
    };

    const rowKeyCallback = (index: number) => rows[index]._rowId;

    return (
      <div className={styles.treeTableContainer}>
        {props.title && (
          <div className={styles.treeTableTitle}>
            {props.title}
          </div>
        )}

        {props.loading && (
          <div className={styles.loader}>
            <Loader size="large" />
          </div>
        )}

        <div className={clsx({ [styles.loading]: props.loading })}>
          {Array.isArray(props.filters) && props.filters.length > 0 && (
            <div className={styles.filterContainer}>
              <Filter
                filters={props.filters}
                filterValues={props.filterValues}
                onFilterSubmit={props.onFilterChange}
              />
            </div>
          )}
          <TreeTableActionBar
            toggleAll={() => this.toggleAllRowsExpansion()}
            displayExpandAll={!tableFullyExpanded}
            columnToggleProps={{
              listItems: columns.slice(1).map((col) => ({ id: col.id, label: col.headerName, value: isColumnHidden(col.hidden) })),
              onItemClick: (columnId?: string, hiddenValue?: boolean) => toggleColumnDisplay(columnId, hiddenValue, props.toggleColumnsHandler),
              onRestoreDefault: () => restoreColumnDefaults(props.toggleColumnsHandler),
              toggleColumns: props.toggleColumns as boolean,
            }}
            renderRightItems={props.renderActionBarRightItems}
            disabledExpand={disabledExpandButton}
          />
          <TreeTableHeader columns={columns} scrollPadding={scrollBarWidth} />
          <div ref={this.containerRef} className="scrollable">
            {props.virtualized ? (
              <VariableSizeList
                key={tableKey}
                height={props.height as number}
                itemCount={rows.length}
                width="100%"
                innerRef={this.innerRef}
                itemSize={this.getItemHeight}
                itemKey={rowKeyCallback}
                ref={this.listRef}
                overscanCount={10}
              >
                {this.renderRow(onExpandRow)}
              </VariableSizeList>
            ) : rows.map((_, index) => this.renderRow(onExpandRow)({ index }))}
          </div>
        </div>
      </div>
    );
  }

}

export default TreeTable;
