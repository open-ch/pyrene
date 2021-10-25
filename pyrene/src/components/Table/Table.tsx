/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/ban-types */
import React, { CSSProperties } from 'react';
import ReactTable from 'react-table';
import checkboxHOC from 'react-table/lib/hoc/selectTable';
import clsx from 'clsx';

import styles from './table.css';
import TablePagination from './TablePagination/TablePagination';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import Filter from '../Filter/Filter';
import TableHeaderCell from './TableHeader/TableHeaderCell';
import TableHeader from './TableHeader/TableHeader';
import colorConstants from '../../styles/colorConstants';
import Checkbox from '../Checkbox/Checkbox';
import TableCell from './TableCell/TableCell';
import CheckboxPopover from '../CheckboxPopover/CheckboxPopover';
import TableUtils from './TableUtils';
import Banner from '../Banner/Banner';

import { Filter as FilterType, Filters } from '../Filter/types';
import { IconNames } from '../types';

const CheckboxTable = checkboxHOC(ReactTable);

const ErrorComponent = ({ error = '' }: { error?: string }) => <div className={styles.customTableBody}><Banner label={error} type="error" styling="inline" /></div>;

const LoaderComponent = () => (
  <div className={styles.loader}>
    <Loader size="large" type="inline" />
  </div>
);

const NoDataComponent = () => <div className={styles.customTableBody}>No data found.</div>;

export type ExtendsRow<R> = R & {
  value?: string | number;
};

export interface Column<R, X=ExtendsRow<R>> {
  accessor: keyof R | ((row: R, rowIndex: number, columnIndex: number) => string | number),
  cellRenderCallback?: string | JSX.Element | ((row: X, rowIndex: number, columnIndex: number) => string | JSX.Element | number),
  cellStyle?: CSSProperties,
  headerName: string,
  headerStyle?: CSSProperties,
  headerTooltip?: string,
  id: string,
  initiallyHidden?: boolean,
  sortable?: boolean,
  sortFunction?: (a: string, b: string) => boolean | number,
  width?: number,
}

export interface MappedColumn<R, X=ExtendsRow<R>> {
  accessor: keyof R | ((row: R, rowIndex: number, columnIndex: number) => string | number),
  Cell?: string | JSX.Element | ((row: X, rowIndex: number, columnIndex: number) => string | JSX.Element | number),
  style?: CSSProperties,
  Header: React.ReactElement | string,
  headerStyle?: CSSProperties,
  id: string,
  initiallyHidden?: boolean,
  sortable?: boolean,
  sortMethod?: (a: string, b: string) => boolean | number,
  width?: number,
}

export interface RowInfo<R> {
  aggregated: undefined,
  groupedByPivot: undefined,
  index: number,
  level: number,
  nestingPath: number[],
  original: R,
  page: number,
  pageSize: number,
  row: Partial<R> & {
    _index: number,
    _nestingLevel: number,
    _original: R,
    _subRows: undefined,
    _viewIndex: number,
  },
  subRows: undefined,
  viewIndex: number,
}

export interface TableProps<R={}> {
  /**
   * Sets the table actions. Type: [{ icon: string, label: string (required), callback: func (required), active: oneOf('single', 'multi', 'always') (required) }]
   */
  actions?: Array<Action>,
  /**
   * Sets the Table columns.
   * Type: [{ accessor: any, cellRenderCallback: One of [React element, callback function to display the cell, string],
   * cellStyle: object, headerName: string (required), headerStyle: object, id: any, initiallyHidden: bool,
   * sortable: bool (!!!Overrides disableSorting!!!), sortFunction: function, width: number }]
   * headerTooltip: if defined Pyrene tooltip displayed when hovering over header name
   */
  columns: Array<Column<R> | MappedColumn<R>>,
  /**
   * Page to display by the Table (use only with server-side data fetching & pagination).
   */
  currentPage?: number,
  /**
   * Sets the Table data displayed in the rows. Type: JSON
   */
  data: Array<R>,
  /**
   * Sets the page size when the component is first mounted.
   */
  defaultPageSize?: number,
  /**
   * Sets the default sorting columns and order when the component is first mounted.
   * Type: [{ id: string (required), desc: bool }]
   */
  defaultSorted?: Array<{
    desc?: boolean,
    id: string,
  }>,
  /**
   * Disables table interactions
   */
  disabled?: boolean,
  /**
   * Disable sorting in the table.
   */
  disableSorting?: boolean,
  /**
   * Sets the error message to be displayed
   */
  error?: string,
  /**
   * True if filter should be displayed but in disabled state (filters might be still undefined)
   */
  filterDisabled?: boolean,
  /**
   * Sets the available filters.
   * Type: [{ label: string (required) label of the filter input displayed to the user, type: oneOf('singleSelect', 'multiSelect', 'text') (required),
   * id: string (required) - key for the one filter input, options: array }]
   */
  filters?: Array<FilterType>,
  /**
   * values to be filtered & displayed in filter dropdown
   * use {} for passing empty filterValues
   * */
  filterValues?: Filters,
  /**
   * Sets the data key for each row. Should be unique. Is used for selections.
   */
  keyField: keyof R & string,
  /**
   * Disables the component and displays a loader inside of it.
   */
  loading?: boolean,
  /**
   * Set to true to be able to handle sorting and pagination server-side (use only with server-side data fetching & pagination).
   */
  manual?: boolean,
  /**
   * Changes the overall appearance of the table to become multi-selectable (checkbox table). Requires keyField prop.
   */
  multiSelect?: boolean,
  /**
    * Whether multiSorting via shift click is possible.
    */
  multiSort?: boolean,
  /**
   * Enables negation support for filters. Defaults to false
   */
  negatable?: boolean,
  /**
   * Amount of results to be displayed in Table Header (use only with server-side data fetching & pagination).
   */
  numberOfResults?: number,
  /**
   * Called initially when the table loads & any time sorting, pagination or filterting is changed in the table (use only with server-side data fetching & pagination).
   */
  onFetchData?: (args: { page: number, pageCount: number, filters: Filters, pageSize?: number, sorting: TableProps<R>['defaultSorted'] }) => void,
  /**
   * Called when the filter changes.
   */
  onFilterChange?: (filterValues: Filters, filterNegatedKeys: Array<FilterType['id']>) => void,
  /**
    * Called when the user double clicks on a row.
    */
  onRowDoubleClick?: (rowInfo: RowInfo<R>) => void,
  /**
   * Amount of pages to be shown in React Table (use only with server-side data fetching & pagination).
   */
  pages?: number,
  /**
  * Sets the page sizes that the user can choose from.
  */
  pageSizeOptions?: number[],
  /**
  * Allow toggling wether a row (and checkbox for a checkboxtable) is selectable
  * @returns {boolean} - enabled = true, disabled = false
  */
  rowSelectableCallback?: (row: R) => boolean,
  /**
  * Sets the title.
  */
  title?: string,
  /**
  * Whether the columns (hide/show) popover is available to the user.
  */
  toggleColumns?: boolean,
}

export interface TableState<R> {
  selection: Array<keyof R>,
  selectAll: boolean,
  columnsVisibility: { [key: string]: boolean },
  pageSize?: number,
}

export interface Action<R> {
  active: 'single' | 'multi' | 'always',
  callback: (row: Array<keyof R>) => void,
  icon?: keyof IconNames,
  label: string,
  loading?: boolean,
}

/**
 * Tables are used to display tabular data. Tables come with pagination and sorting functionality and also allows the user to toggle columns.
 *
 * Tables support multi sorting for columns.
 */
export default class Table<R> extends React.Component<TableProps<R>, TableState<R>> {

  checkboxTable: React.LegacyRef<ReactTable<TableProps<R>>> = null;

  // eslint-disable-next-line react/state-in-constructor
  state = {
    selection: [],
    selectAll: false,
    columnsVisibility: {},
    pageSize: this.props.defaultPageSize,
  } as TableState<R>;

  commonStaticProps = {
    getTrProps: (state: TableState<R>, rowInfo: RowInfo<R>) => {
      // no row selected yet
      const key = rowInfo && rowInfo.original[this.props.keyField];
      const selected = this.isSelected(key);

      return {
        onDoubleClick: () => { this.props?.onRowDoubleClick?.(rowInfo); },
        style: {
          background: selected ? colorConstants.neutral030 : '',
        },
      };
    },

    getTdProps: (state: TableState<R>, rowInfo: RowInfo<R>, column: Column<R>) => ({
      onClick: (e, handleOriginal) => {
        if (column.id !== '_selector' && typeof rowInfo !== 'undefined') {
          this.singleRowSelection?.(rowInfo.original[this.props.keyField], rowInfo.original);
        }
        // IMPORTANT! React-Table uses onClick internally to trigger
        // events like expanding SubComponents and pivots.
        // By default a custom 'onClick' handler will override this functionality.
        // If you want to fire the original onClick handler, call the
        // 'handleOriginal' function.
        if (handleOriginal) {
          handleOriginal();
        }
      },
    }),

    onPageChange: () => this.resetSelection(),
    onPageSizeChange: (size: number) => {
      this.setState({ pageSize: size });
      this.resetSelection();
    },
    onSortedChange: () => this.resetSelection(),
    onFilteredChange: () => this.resetSelection(),

    // Removes React Table 'No rows found'
    NoDataComponent: () => null,
    // Removes React Table 'Loading...'
    LoadingComponent: () => null,

    minRows: 1,

    // Use two exclamation marks to convert a value to boolean - disabled={!!this.props.error} = true if string has a value, false if empty
    TheadComponent: (props) => <TableHeader {...props} multiSelect={this.props.multiSelect} disabled={!!this.props.error} />,
    ThComponent: (props) => <TableHeaderCell {...props} multiSelect={this.props.multiSelect} />,
    TdComponent: (props) => <TableCell {...props} multiSelect={this.props.multiSelect} />,
    PaginationComponent: (props) => <TablePagination {...props} loading={this.props.loading} error={this.props.error} numberOfResults={this.props.numberOfResults} />,
    TfootComponent: (props) => <TablePagination {...props} />,
    resizable: false,
    showPagination: true,
    showPaginationTop: true,
    showPageSizeOptions: true,
    sortable: !this.props.disableSorting,

    // Server-side props
    manual: this.props.manual,

    // this is only called once in componentDidMount cycle of react-table with first page load
    onFetchData: (rts) => (this.state.pageSize !== rts.pageSize ? this.props?.onFetchData?.({
      page: 0,
      pageCount: 0,
      pageSize: rts.pageSize,
      sorting: rts.sorted,
      filters: this.props.filterValues || {},
    }) : this.props?.onFetchData?.({
      page: rts.page,
      pageCount: this.props.pages || 0,
      pageSize: rts.pageSize,
      sorting: rts.sorted,
      filters: this.props.filterValues || {},
    })),
  };

  componentDidUpdate(prevProps: TableProps<R>) {
    if (prevProps.numberOfResults !== this.props.numberOfResults) {
      this.resetSelection();
    }
  }

  onManualFilterChange = (values: Filters) => {
    this.resetSelection();
    this.props.onFetchData?.({
      page: 0,
      pageCount: 0,
      filters: values,
      pageSize: this.state.pageSize,
      sorting: this.props.defaultSorted,
    });
  };

  toggleColumnDisplay = (columnId: string, showValue: boolean) => {

    this.setState((prevState) => ({
      columnsVisibility: {
        ...prevState.columnsVisibility,
        [columnId]: !showValue,
      },
    }));
  };

  toggleAll = () => {
    // Only selects what is visible to the user (page size matters)
    const selectAll = !this.state.selectAll;
    const selection: Array<keyof R> = [];

    if (selectAll) {
      // we need to get at the internals of ReactTable
      const resolvedState = this.checkboxTable.getWrappedInstance().getResolvedState();
      // the 'sortedData' property contains the currently accessible records based on the filter and sort

      const currentPageSize = resolvedState.pageSize;
      const currentPage = resolvedState.page;

      const currentRecords = resolvedState.sortedData.slice(currentPage * currentPageSize, currentPage * currentPageSize + currentPageSize);

      // we just push all the IDs onto the selection array
      currentRecords.forEach((item) => {
        const enabled = this.props.rowSelectableCallback?.(item._original); // eslint-disable-line no-underscore-dangle
        if (enabled) {
          selection.push(item._original[this.props.keyField]); // eslint-disable-line no-underscore-dangle
        }
      });
    }

    this.setState(() => ({
      selection: selection,
      selectAll: selectAll,
    }));
  };

  isSelected = (key: keyof R) => this.state.selection.includes(key);

  resetSelection = () => {
    this.setState(() => ({
      selection: [],
      selectAll: false,
    }));
  };

  handleActionAvailability = (actionType: Action<R>['active']) => {
    if (this.props.error) {
      return false;
    }

    // enable actions based on selection length and actionTypex
    if (actionType === 'always') {
      return true;
    }
    if (this.state.selection.length === 1 && actionType === 'single') {
      return true;
    }
    if (this.state.selection.length >= 1 && actionType === 'multi') {
      return true;
    }
    return false;

  };

  singleRowSelection = (key: keyof R, row: R) => {
    const enabled = this.props.rowSelectableCallback?.(row);
    if (enabled) {
      this.setState({
        selection: [key],
        selectAll: false,
      });
    }
  };

  toggleSelection = (key: keyof R, row: R) => {
    // start off with the existing state
    let selection = [...this.state.selection];
    const enabled = this.props.rowSelectableCallback?.(row);

    if (enabled) {
      if (this.props.multiSelect) {
        const keyIndex = selection.indexOf(key);
        // check to see if the key exists
        if (keyIndex >= 0) {
          selection = selection.filter((selectedKey) => selectedKey !== key);
        } else {
          // it does not exist so add it
          selection.push(key);
        }
      } else {
        selection = [key];
      }
    }

    // if the current selection array has the same length as the pageSize then all the visible elements have to be selected
    const isWholePageSelected = selection.length === this.checkboxTable.getWrappedInstance().getResolvedState().pageSize;
    const areAllOptionsSelected = selection.length === this.props.data.length;

    this.setState(() => ({
      selection: selection,
      selectAll: isWholePageSelected || areAllOptionsSelected,
    }));
  };

  restoreColumnDefaults = () => {
    this.setState(() => ({
      columnsVisibility: {},
    }));
  };

  createTableColumnsObject = () => TableUtils.mapColumnProps(this.props.columns).map((col: MappedColumn<R>) => ({
    ...col,
    ...(typeof this.state.columnsVisibility[col.id] !== 'undefined') ? { show: this.state.columnsVisibility[col.id] } : {},
  }));

  renderTable = () => {
    const commonVariableProps = {
      columns: this.createTableColumnsObject(),
      defaultSorted: this.props.defaultSorted,
      defaultPageSize: this.props.defaultPageSize,
      data: this.props.data,
      pageSizeOptions: this.props.pageSizeOptions,
      page: this.props.manual && this.props.currentPage && this.props.currentPage >= 0 ? this.props.currentPage : undefined,
      pages: this.props.manual ? this.props.pages : undefined,
      showPaginationBottom: !!(this.props.data && this.props.data.length && !this.props.error && !this.props.loading),

      multiSort: this.props.multiSort,
    };

    const multiTableProps = {
      ref: (r) => (this.checkboxTable = r),
      selectType: 'checkbox',
      selectAll: this.state.selectAll,
      isSelected: this.isSelected,
      toggleSelection: this.toggleSelection,
      toggleAll: this.toggleAll,
      keyField: this.props.keyField,
      SelectAllInputComponent: (props) => <Checkbox value={props.checked} onChange={props.onClick} />,
      SelectInputComponent: (props) => {
        const enabled = this.props.rowSelectableCallback?.(props.row);
        return (
          <Checkbox
            disabled={!enabled}
            value={props.checked}
            onChange={() => {
              const key = props.row[this.props.keyField];
              this.toggleSelection(key, props.row);
            }}
          />
        );
      },
    };

    const tableToRender = this.props.multiSelect
      ? (
        // @ts-ignore
        <CheckboxTable
          {...this.commonStaticProps}
          {...commonVariableProps}
          {...multiTableProps}
          ref={(r) => this.i = r}
        />
      )
      : (
        <ReactTable
          {...this.commonStaticProps}
          {...commonVariableProps}
        />
      );

    // Inject ErrorComponent when an error prop is present to table body
    if (this.props.error) {
      return (
        React.cloneElement(tableToRender, {
          TbodyComponent: () => (
            <ErrorComponent
              error={this.props.error}
            />
          ),
        }));
    }
    // Inject LoaderComponent while loading to table body
    if (this.props.loading) {
      return (
        React.cloneElement(tableToRender, { TbodyComponent: LoaderComponent })
      );
    }
    // Inject NoDataComponent when there is no data present to table body
    if (!commonVariableProps.data.length) {
      return (
        React.cloneElement(tableToRender, { TbodyComponent: NoDataComponent })
      );
    }
    return (
      tableToRender
    );

  };

  render() {
    console.log('state', this.state);
    return (
      <div className={styles.tableContainer}>
        {this.props.title && (
          <div className={styles.titleBar}>
            {this.props.title}
          </div>
        )}

        <div className={clsx(styles.filterBar, { [styles.loading]: this.props.loading, [styles.disabled]: this.props.disabled })}>
          <div className={styles.filterContainer}>
            {((Array.isArray(this.props.filters) && this.props.filters.length > 0) || this.props.filterDisabled)
              && (
                <Filter
                  filters={this.props.filters}
                  onFilterSubmit={this.props.manual ? (values) => this.onManualFilterChange(values) : this.props.onFilterChange}
                  disabled={this.props.error ? true : this.props.filterDisabled}
                  filterValues={this.props.filterValues || {}}
                  negatable={this.props.negatable}
                />
              )}
          </div>
          {this.props.toggleColumns && (
            <CheckboxPopover
              buttonLabel="Columns"
              listItems={(this.props.columns as Array<Column<R>>)
                .filter((col) => col.headerName)
                .map((col) => ({
                  id: col.id,
                  label: col.headerName,
                  value: typeof this.state.columnsVisibility[col.id] !== 'undefined' ? this.state.columnsVisibility[col.id] : !col.initiallyHidden,
                }))}
              onItemClick={(item, value) => this.toggleColumnDisplay(item, value)}
              onRestoreDefault={() => this.restoreColumnDefaults()}
              disabled={!!this.props.error}
            />
          )}
        </div>

        <div className={clsx(styles.tableAndActions, { [styles.disabled]: this.props.disabled })}>

          {Array.isArray(this.props.actions) && this.props.actions.length > 0 && (
            <div className={styles.toolbar}>
              {this.props.actions.map((action, index) => (
                <React.Fragment key={action.label}>
                  <Button
                    label={action.label}
                    icon={action.icon ? action.icon : undefined}
                    onClick={() => action.callback(this.state.selection)}
                    type="action"
                    disabled={!this.handleActionAvailability(action.active)}
                    loading={action.loading ? action.loading : false}
                  />
                  {index + 1 < this.props.actions.length && <div className={styles.spacer} />}
                </React.Fragment>
              ))}
            </div>
          )}
          {this.renderTable()}
        </div>
      </div>
    );
  }

}


Table.displayName = 'Table';

Table.defaultProps = {
  actions: [],
  title: '',
  defaultSorted: [],
  defaultPageSize: 20,
  disabled: false,
  disableSorting: false,
  loading: false,
  manual: false,
  multiSort: true,
  multiSelect: false,
  numberOfResults: 0,
  rowSelectableCallback: () => true,
  toggleColumns: false,
  pageSizeOptions: [10, 20, 50, 100, 250],
  filterDisabled: false,
  filters: [],
  filterValues: {},
  negatable: false,
  onFetchData: () => null,
  onRowDoubleClick: () => null,
  onFilterChange: () => null,
  error: null,
};
