import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import checkboxHOC from "react-table/lib/hoc/selectTable";
import classNames from 'classnames';

import './table.css';
import TablePagination from './TablePagination/TablePagination';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import Filter from '../Filter/Filter';
import TableHeaderCell from './TableHeader/TableHeaderCell';
import TableHeader from './TableHeader/TableHeader';
import colorConstants from '../../styles/colorConstants';
import TableColumnPopover from './TableColumnButton/TableColumnPopover/TableColumnPopover';
import Checkbox from '../FormElements/Checkbox/Checkbox';

const CheckboxTable = checkboxHOC(ReactTable);

/**
 * All mighty table
 */
export default class Table extends React.Component {

  state = {
    selection: [],
    selectAll: false
  };

  renderLoader = () => (
    <div styleName={'loader'}>
      <Loader size={'large'} />
    </div>
  );

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
          ...selection.slice(keyIndex + 1)
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
      currentRecords.forEach(item => {
        selection.push(item._original[this.props.keyField]);
      });
    }

    this.setState((prevState, props) => ({
      selection: selection,
      selectAll: selectAll,
    }));
  };


  isSelected = key => {
    return this.state.selection.includes(key);
  };

  resetSelection = () => {
    this.setState((prevState, props) => ({
      selection: [],
      selectAll: false,
    }));
  };


  render() {

    const commonProps = {
      columns: this.props.columns,
      defaultPageSize: this.props.defaultPageSize,
      data: this.props.data,
      pageSizeOptions: this.props.pageSizeOptions,

      multiSort: this.props.multiSort,

      getTrProps: (state, rowInfo) => {
        // no row selected yet
        const selected = this.isSelected(rowInfo.original[this.props.keyField]);
        // const selectedIndex = this.state.selection == null ? null : this.state.selection.index;
        return {
          onClick: () => {this.toggleSelection(rowInfo.original[this.props.keyField])},
          onDoubleClick: () => {this.props.onRowDoubleClick(rowInfo);
          },
          style: {
            background: selected ? colorConstants.neutral030 : "inherit",
          }
        }
      },

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

      TheadComponent: props => <TableHeader multiSelect={this.props.multiSelect} {...props} />,
      ThComponent: props => <TableHeaderCell {...props} />,
      PaginationComponent: props => <TablePagination {...props} />,
      TfootComponent: props => <TablePagination {...props} />,
      resizable: false,
      showPaginationBottom: true,
      showPagination: true,
      showPaginationTop: true,
      showPageSizeOptions: true,
    };

    return (
      <div styleName={'tableContainer'}>
        {this.props.title && <div styleName={'titleBar'}>
          {this.props.title}
        </div>}
        {this.props.loading && this.renderLoader()}
        <div styleName={classNames('filterContainer', {loading: this.props.loading})}>
          {this.props.filters.length > 0 && <Filter filters={this.props.filters} onFilterSubmit={this.props.onFilterChange} />}
        </div>
        <div styleName={classNames('tableAndActions', {loading: this.props.loading})}>
          {/*<TableColumnPopover />*/}
          {this.props.actions.length > 0 && <div styleName={'toolbar'}>
          {this.props.actions.map((action, index) => (
            <React.Fragment key={action.label}>
              <Button label={action.label} icon={action.icon ? action.icon : undefined} onClick={action.callBack} type={'action'} />
              {index + 1 < this.props.actions.length && <div styleName={'spacer'} />}
            </React.Fragment>
          ))}
        </div>}
          {this.props.multiSelect ?
            <CheckboxTable
              {...commonProps}
              ref={r => (this.checkboxTable = r)}
              selectType={"checkbox"}
              selectAll={this.state.selectAll}
              isSelected={this.isSelected}
              toggleSelection={this.toggleSelection}
              toggleAll={this.toggleAll}
              keyField={this.props.keyField}
              SelectAllInputComponent={(props) => <Checkbox value={props.checked} onChange={props.onClick} />}
              SelectInputComponent={(props) => <Checkbox value={props.checked} onChange={props.onClick} />}
            />
            :
            <ReactTable
              {...commonProps}
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
  keyField: 'id',
  multiSelect: false,
  pageSizeOptions: [10, 20, 50, 100, 250],
  filters: [],
  onRowDoubleClick: () => null,
  onFilterChange: () => null,
};

Table.propTypes = {
  /**
   * Sets the table actions. Type: [{ icon: string, label: string (required), action: func (required) }]
   */
  actions: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string,
    label: PropTypes.string.isRequired,
    callBack: PropTypes.func.isRequired,
  })),
  /**
   * Sets the Table columns. For a detailed prop description check the react-table docs.
   */
  columns: PropTypes.array.isRequired,
  /**
   * Sets the Table data displayed in the rows. For a detailed prop description check the react-table docs.
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
   * Sets the data key for multiSelect (checkbox) tables. Should be a unique identifier. Required when multiSelect prop is used.
   */
  keyField: PropTypes.string,
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
};