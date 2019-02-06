import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


import './treeTable.css';
import TreeTableHeader from './TreeTableHeader/TreeTableHeader';
import TreeTableActionBar from './TreeTableActionBar/TreeTableActionBar';
import TreeTableRow from './TreeTableRow/TreeTableRow';
import PROPCONSTANTS from './TreeTablePropTypes';
import uniqid from 'uniqid';
import Filter from '../Filter/Filter';
import TreeTableUtils from './TreeTableUtils';
import TableUtils from '../Table/TableUtils';
import Loader from '../Loader/Loader';


/**
 *  [🌳 • ┬─┬]
 *
 * A tree table contains a hierarchical set of data structured in rows and columns and grouped into nodes.
 * Trees are used to display and work with large amounts of hierarchical data.
 * They have a high data density and therefore convey an immediate feeling of complexity.
 * Ideally, you should only show trees with a lot of hierarchical data as a last resort.
 */
export default class TreeTable extends React.Component {

  state = {
    expandedRows: this.props.defaultExpandedSection ? TreeTableUtils.expandAllParentSectionsFor(this.props.defaultExpandedSection) : [],
    displayExpandAllAction: true,
    columns: TreeTableUtils.prepareColumnToggle(this.props.columns),
  };

  toggleAllRowsExpansion = () => {
    let tree = [];

    if (this.state.displayExpandAllAction) {
      tree = this.generateTreeStructureFromData(this.props.data, '0');
    }

    this.setState((prevState, props) => ({
      expandedRows: tree,
      displayExpandAllAction: !prevState.displayExpandAllAction,
    }));
  };

  handleOnExpandClick = (event, clickedRowIndex, isParent) => {
    const clickedIndex = this.state.expandedRows.indexOf(clickedRowIndex);
    let expandedRowsCopy = [...this.state.expandedRows];

    if (!isParent) {
      return null;
    }

    // Element is already expanded
    if (clickedIndex > -1) {
      // See if any of its children is expanded as well & collapse them
      expandedRowsCopy = expandedRowsCopy.filter(item => !item.startsWith(expandedRowsCopy[clickedIndex]));
    } else {
      expandedRowsCopy.push(clickedRowIndex);
    }

    this.setState((prevState, props) => ({
      expandedRows: expandedRowsCopy,
    }));

  };

  generateRowsFromData = (data, columns, treeIndex, expandedRows) => data.map((rowData, index) => {
    const newTreeIndex = `${treeIndex}.${index}`;
    const rowKey = this.props.setUniqueRowKey(rowData, newTreeIndex);
    const expandedRowsIndices = expandedRows ? expandedRows : this.state.expandedRows;
    return (
      <TreeTableRow
        data={rowData}
        parent={rowData.hasOwnProperty('children') ? rowData.children.length > 0 : false}
        treeIndex={newTreeIndex}
        columns={columns}
        key={rowKey || uniqid()}
        isExpanded={expandedRowsIndices.some(rowIndex => rowIndex === newTreeIndex || rowIndex.startsWith(`${newTreeIndex}.`))}
        generateRowsFromData={this.generateRowsFromData}
        onExpandClick={this.handleOnExpandClick}
        onRowDoubleClick={this.props.onRowDoubleClick}
      />);
  });

  generateTreeStructureFromData = (data, treeIndex) => {
    const result = [];
    data.forEach((item, i) => {
      if (item.hasOwnProperty('children')) {
        if (item.children.length > 0) {
          result.push(`${treeIndex}.${i}`);
          const children = this.generateTreeStructureFromData(item.children, `${treeIndex}.${i}`);
          result.push(...children);
        }
      }
    });
    return result;
  };

  isColumnHidden = hidden => typeof hidden === 'undefined' || hidden !== true;

  toggleColumnDisplay = (columnId, hiddenValue) => {
    const updatedColumns = this.state.columns.map((col, index) => {
      if (col.id === columnId) {
        return ({ ...col, hidden: hiddenValue });
      }
      return col;
    });

    this.setState((prevState, props) => ({
      columns: updatedColumns,
    }));
  };

  restoreColumnDefaults = () => {
    this.setState((prevState, props) => ({
      columns: TreeTableUtils.prepareColumnToggle(this.props.columns),
    }));
  };

  renderLoader = () => (
    <div styleName={'loader'}>
      <Loader size={'large'} />
    </div>
  );


  render() {
    const listItems = this.state.columns.slice(1).map(col => ({ id: col.id, label: col.headerName, value: this.isColumnHidden(col.hidden) }));
    const onItemClick = (item, value) => this.toggleColumnDisplay(item, value);
    const onRestoreDefault = () => this.restoreColumnDefaults();
    const toggleColumns = this.props.toggleColumns;

    const columnToggleProps = { listItems: listItems, onItemClick: onItemClick, onRestoreDefault: onRestoreDefault, toggleColumns: toggleColumns };

    return (
      <div styleName={'treeTableContainer'}>
        {this.props.title && <div styleName={'treeTableTitle'}>
          {this.props.title}
        </div>}

        {this.props.loading && this.renderLoader()}

        <div styleName={classNames('loadingContainer', { loading: this.props.loading })}>
          {this.props.filters.length > 0 &&
            <div styleName={'filterContainer'}>
              <Filter
                filters={this.props.filters}
                onFilterSubmit={this.props.onFilterChange}
              />
            </div>
          }
          <TreeTableActionBar
            toggleAll={this.toggleAllRowsExpansion}
            displayExpandAllAction={this.state.displayExpandAllAction}
            columnToggleProps={columnToggleProps}
          />
          <TreeTableHeader columns={this.state.columns} />
          <div styleName={'treeTableData'}>
            {this.generateRowsFromData(this.props.data, this.state.columns, '0', this.state.expandedRows)}
          </div>
        </div>
      </div>
    );
  }

}

TreeTable.displayName = 'TreeTable';

TreeTable.defaultProps = {
  data: [],
  columns: [],
  filters: [],
  title: '',
  defaultExpandedSection: '',
  loading: false,
  toggleColumns: true,
  onRowDoubleClick: () => null,
  onFilterChange: () => null,
  setUniqueRowKey: () => null,
};

TreeTable.propTypes = {
  /**
   * Sets the Table columns.
   * Type: [{ id: string (required), headerName: string (required), accessor: string (required), headerStyle: object, cellStyle: object, initiallyHidden: bool, width: number }]
   */
  columns: PROPCONSTANTS.COLUMNS,
  /**
   * Sets the Table data displayed in the rows. Type: JSON
   */
  data: PROPCONSTANTS.DATA,
  /**
   * Sets a section to expand when the component is mounted.
   */
  defaultExpandedSection: PropTypes.string,
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
   * Disables the component and displays a loader inside of it.
   */
  loading: PropTypes.bool,
  /**
   * Called when the filter changes.
   */
  onFilterChange: PropTypes.func,
  /**
   * Called when the user double clicks on a row.
   */
  onRowDoubleClick: PropTypes.func,
  /**
   * Sets a function to get a unique key for each row. Params: (rowData, treeIndex)
   */
  setUniqueRowKey: PropTypes.func,
  /**
   * Sets the title.
   */
  title: PropTypes.string,
  /**
   * Whether the columns (hide/show) popover is available to the user.
   */
  toggleColumns: PropTypes.bool,
};
