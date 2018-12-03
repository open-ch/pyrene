import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import checkboxHOC from 'react-table/lib/hoc/selectTable';
import classNames from 'classnames';

import './table.css';
import TablePagination from './TablePagination/TablePagination';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import Filter from '../Filter/Filter';
import TableHeaderCell from './TableHeader/TableHeaderCell';
import TableHeader from './TableHeader/TableHeader';
import colorConstants from '../../styles/colorConstants';
import Checkbox from '../FormElements/Checkbox/Checkbox';
import TableCell from './TableCell/TableCell';
import CheckboxPopover from '../CheckboxPopover/CheckboxPopover';
import TableUtils from './TableUtils';

const CheckboxTable = checkboxHOC(ReactTable);

/**
 * Tables are used to display tabular data. Tables come with pagination and sorting functionality and also allows the user to toggle columns.
 *
 * Tables support multi sorting for columns.
 */
export default class Table extends React.Component {

  state = {
    selection: [],
    selectAll: false,
    columns: TableUtils.mapColumnProps(this.props.columns),
  };

  toggleSelection = (key, shift, row) => {
    // start off with the existing state
    let selection = [...this.state.selection];

    if (this.props.multiSelect) {
      const keyIndex = selection.indexOf(key);
      // check to see if the key exists
      if (keyIndex >= 0) {
        // it does exist so we will remove it using destructing
        selection = [
          ...selection.slice(0, keyIndex),
          ...selection.slice(keyIndex + 1),
        ];
      } else {
        // it does not exist so add it
        selection.push(key);
      }
    } else {
      selection = [key];
    }

    // if the current selection array has the same length as the pageSize then all the visible elements have to be selected
    this.setState((prevState, props) => ({
      selection: selection,
      selectAll: selection.length === this.checkboxTable.getWrappedInstance().getResolvedState().pageSize,
    }));
  };

  singleRowSelection = (key) => {
    this.setState((prevState, props) => ({
      selection: [key],
      selectAll: false,
    }));
  };

  toggleAll = () => {
    // Only selects what is visible to the user (page size matters)
    const selectAll = !this.state.selectAll;
    const selection = [];

    if (selectAll) {
      // we need to get at the internals of ReactTable
      const resolvedState = this.checkboxTable.getWrappedInstance().getResolvedState();
      // the 'sortedData' property contains the currently accessible records based on the filter and sort

      const currentPageSize = resolvedState.pageSize;
      const currentPage = resolvedState.page;

      const currentRecords = resolvedState.sortedData.slice(currentPage * currentPageSize, currentPage * currentPageSize + currentPageSize);

      // we just push all the IDs onto the selection array
      currentRecords.forEach((item) => {
        selection.push(item._original[this.props.keyField]);
      });
    }

    this.setState((prevState, props) => ({
      selection: selection,
      selectAll: selectAll,
    }));
  };


  isSelected = key => this.state.selection.includes(key);

  resetSelection = () => {
    this.setState((prevState, props) => ({
      selection: [],
      selectAll: false,
    }));
  };

  handleActionAvailability = (actionType) => {
    // enable actions based on selection length and actionType
    if (actionType === 'always') {
      return true;
    } else if (this.state.selection.length === 1 && actionType === 'single') {
      return true;
    } else if (this.state.selection.length >= 1 && actionType === 'multi') {
      return true;
    }
    return false;
    
  };

  isColumnDisplayed = show => typeof show === 'undefined' || show === true;

  toggleColumnDisplay = (columnId, showValue) => {
    const updatedColumns = this.state.columns.map((col) => {
      if (col.id === columnId) {
        return { ...col, show: !showValue };
      }
      return col;
    });

    this.setState((prevState, props) => ({
      columns: updatedColumns,
    }));
  };

  restoreColumnDefaults = () => {
    this.setState((prevState, props) => ({
      columns: TableUtils.mapColumnProps(this.props.columns),
    }));
  };

  renderLoader = () => (
    <div styleName={'loader'}>
      <Loader size={'large'} />
    </div>
  );


  commonStaticProps = {
    getTrProps: (state, rowInfo) => {
      // no row selected yet
      const key = rowInfo && rowInfo.original[this.props.keyField];
      const selected = this.isSelected(key);
      // const selectedIndex = this.state.selection == null ? null : this.state.selection.index;
      return {
        onDoubleClick: () => { this.props.onRowDoubleClick(rowInfo); },
        style: {
          background: selected ? colorConstants.neutral030 : '',
        },
      };
    },

    getTdProps: (state, rowInfo, column) => ({
      onClick: (e, handleOriginal) => {
        if (column.id !== '_selector' && (typeof rowInfo !== 'undefined')) {
          this.singleRowSelection(rowInfo.original[this.props.keyField]);
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

    onPageChange: () => {
      this.resetSelection();
    },
    onPageSizeChange: () => {
      this.resetSelection();
    },
    onSortedChange: () => {
      this.resetSelection();
    },
    onFilteredChange: () => {
      this.resetSelection();
    },

    // Empty Table handling
    PadRowComponent: props => null,
    NoDataComponent: props => null,
    minRows: 1,

    TheadComponent: props => <TableHeader multiSelect={this.props.multiSelect} {...props} />,
    ThComponent: props => <TableHeaderCell {...props} />,
    TdComponent: props => <TableCell {...props} />,
    PaginationComponent: props => <TablePagination {...props} />,
    TfootComponent: props => <TablePagination {...props} />,
    resizable: false,
    showPaginationBottom: true,
    showPagination: true,
    showPaginationTop: true,
    showPageSizeOptions: true,
  };

  render() {

    const commonVariableProps = {
      columns: this.state.columns,
      defaultPageSize: this.props.defaultPageSize,
      data: this.props.data,
      pageSizeOptions: this.props.pageSizeOptions,

      multiSort: this.props.multiSort,
    };

    return (
      <div styleName={'tableContainer'}>
        {this.props.title && <div styleName={'titleBar'}>
          {this.props.title}
        </div>}
        {this.props.loading && this.renderLoader()}

        <div styleName={classNames('filterBar', { loading: this.props.loading })}>
          <div styleName={'filterContainer'}>
            {this.props.filters.length > 0 &&
              <Filter
                filters={this.props.filters}
                onFilterSubmit={this.props.onFilterChange}
              />
            }
          </div>
          {this.props.toggleColumns && <CheckboxPopover
            buttonLabel={'Columns'}
            listItems={this.state.columns.map(col => ({ id: col.id, label: col.Header, value: this.isColumnDisplayed(col.show) }))}
            onItemClick={(item, value) => this.toggleColumnDisplay(item, value)}
            onRestoreDefault={() => this.restoreColumnDefaults()}
          />}
        </div>

        <div styleName={classNames('tableAndActions', { loading: this.props.loading })}>

          {this.props.actions.length > 0 && <div styleName={'toolbar'}>
            {this.props.actions.map((action, index) => (
              <React.Fragment key={action.label}>
                <Button label={action.label} icon={action.icon ? action.icon : undefined} onClick={() => action.callback(this.state.selection)} type={'action'} disabled={!this.handleActionAvailability(action.active)} />
                {index + 1 < this.props.actions.length && <div styleName={'spacer'} />}
              </React.Fragment>
            ))}
          </div>}

          {this.props.multiSelect ?
            <CheckboxTable
              {...this.commonStaticProps}
              {...commonVariableProps}
              ref={r => (this.checkboxTable = r)}
              selectType={'checkbox'}
              selectAll={this.state.selectAll}
              isSelected={this.isSelected}
              toggleSelection={this.toggleSelection}
              toggleAll={this.toggleAll}
              keyField={this.props.keyField}
              SelectAllInputComponent={props => <Checkbox value={props.checked} onChange={props.onClick} />}
              SelectInputComponent={props => (<Checkbox value={props.checked} onChange={(e) => {
                const { shiftKey } = e;
                e.stopPropagation();
                props.onClick(props.id, shiftKey, props.row);
              }}
              />)}
            />
            :
            <ReactTable
              {...this.commonStaticProps}
              {...commonVariableProps}
            />
          }

        </div>
      </div>
    );
  }

}


Table.displayName = 'Table';

Table.defaultProps = {
  actions: [],
  title: '',
  defaultPageSize: 10,
  loading: false,
  multiSort: true,
  multiSelect: false,
  toggleColumns: false,
  pageSizeOptions: [10, 20, 50, 100, 250],
  filters: [],
  onRowDoubleClick: () => null,
  onFilterChange: () => null,
};

Table.propTypes = {
  /**
   * Sets the table actions. Type: [{ icon: string, label: string (required), callback: func (required), active: oneOf('single', 'multi', 'always') (required) }]
   */
  actions: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string,
    label: PropTypes.string.isRequired,
    callback: PropTypes.func.isRequired,
    active: PropTypes.oneOf(['single', 'multi', 'always']).isRequired,
  })),
  /**
   * Sets the Table columns.
   * Type: [{ id: string (required), headerName: string (required), accessor: string (required), headerStyle: object, cellStyle: object, initiallyHidden: bool, width: number }]
   */
  columns: PropTypes.array.isRequired,
  /**
   * Sets the Table data displayed in the rows. Type: JSON
   */
  data: PropTypes.array.isRequired,
  /**
   * Sets the page size when the component is first mounted.
   */
  defaultPageSize: PropTypes.number,
  /**
   * Sets the available filters.
   * Type: [{ label: string (required), type: oneOf('singleSelect', 'multiSelect', 'text') (required), key: string (required), options: array }]
   */
  filters: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['singleSelect', 'multiSelect', 'text']).isRequired,
    filterKey: PropTypes.string.isRequired,
    options: PropTypes.array,
  })),
  /**
   * Sets the data key for each row. Should be unique. Is used for selections.
   */
  keyField: PropTypes.string.isRequired,
  /**
   * Disables the component and displays a loader inside of it.
   */
  loading: PropTypes.bool,
  /**
   * Changes the overall appearance of the table to become multi-selectable (checkbox table). Requires keyField prop.
   */
  multiSelect: PropTypes.bool,
  /**
   * Whether multiSorting via shift click is possible.
   */
  multiSort: PropTypes.bool,
  /**
   * Called when the filter changes.
   */
  onFilterChange: PropTypes.func,
  /**
   * Called when the user double clicks on a row.
   */
  onRowDoubleClick: PropTypes.func,
  /**
   * Sets the page sizes that the user can choose from.
   */
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
  /**
   * Sets the title.
   */
  title: PropTypes.string,
  /**
   * Whether the columns (hide/show) popover is available to the user.
   */
  toggleColumns: PropTypes.bool,
};
