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

  constructor(props) {
    super(props);
    this.rowRefs = [];
    this.state = {
      displayExpandAll: false,
      columns: TreeTableUtils.prepareColumnToggle(this.props.columns),
    };
  }

  toggleAllRowsExpansion = () => {
    this.rowRefs.forEach(row => row.setExpansion(!this.state.displayExpandAll));
    this.setState((prevState) => {
      return {
        displayExpandAll: !prevState.displayExpandAll,
      };
    });
  };

  addRowRef = (row) => {
    this.rowRefs.push(row);
  };

  generateRowsFromData = (data, columns, treeIndex) => data.map((rowData, index) => {
    const newTreeIndex = `${treeIndex}.${index}`;
    const rowKey = this.props.setUniqueRowKey(rowData, newTreeIndex);
    return (
      <TreeTableRow
        ref={this.addRowRef}
        data={rowData}
        parent={rowData.hasOwnProperty('children') ? rowData.children.length > 0 : false}
        treeIndex={newTreeIndex}
        columns={columns}
        key={rowKey || uniqid()}
        generateRowsFromData={this.generateRowsFromData}
        onRowDoubleClick={this.props.onRowDoubleClick}
      />);
  });

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
            displayExpandAll={this.state.displayExpandAll}
            columnToggleProps={columnToggleProps}
          />
          <TreeTableHeader columns={this.state.columns} />
          <div styleName={'treeTableData'}>
            {this.generateRowsFromData(this.props.data, this.state.columns, '0')}
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
