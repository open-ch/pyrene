import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { DynamicSizeList as List } from 'react-window';

import './treeTable.css';
import TreeTableHeader from './TreeTableHeader/TreeTableHeader';
import TreeTableActionBar from './TreeTableActionBar/TreeTableActionBar';
import TreeTableRow from './TreeTableRow/TreeTableRow';
import PROPCONSTANTS from './TreeTablePropTypes';
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
 *
 * For simple tables with few data, avoid the virtualized and height props. For tables with thousands of items, those two options are worth looking into.
 */
class TreeTable extends React.Component {

  state = {
    displayExpandAll: false,
    columns: TreeTableUtils.prepareColumnToggle(this.props.columns),
    expanded: {},
    rows: TreeTableUtils.initialiseRootData(this.props.data, this.props.setUniqueRowKey),
    innerHeight: 0,
    outerHeight: 0,
    tableKey: Date.now(),
  };
  
  listRef = null;

  componentDidUpdate(prevProps, prevState) {
    if (this.props.data !== prevProps.data) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ rows: TreeTableUtils.initialiseRootData(this.props.data, this.props.setUniqueRowKey) });
    }

    if (this.props.virtualized && this.state.rows !== prevState.rows) {
      this.recalculateListLength();
    }
  }
  
  onContainerRef = (ref) => {
    if (ref) {
      this.setState({ outerHeight: ref.clientHeight });
    }
  }

  onListRef = (innerRef) => {
    if (innerRef) {
      this.listRef = innerRef;
      this.recalculateListLength();
    }
  }

  recalculateListLength = () => {
    if (this.listRef) {
      this.setState({ innerHeight: this.listRef.clientHeight });
    }
  }

  toggleAllRowsExpansion = () => {
    const { displayExpandAll } = this.state;
    this.setState((prevState) => {
      if (displayExpandAll) {
        return {
          rows: TreeTableUtils.initialiseRootData(this.props.data, this.props.setUniqueRowKey),
          expanded: {},
          displayExpandAll: !displayExpandAll,
          tableKey: Date.now(), // as all rows are closed, we need to recalculate the height for the whole view - a key is the easiest way
        };
      }
      return {
        ...TreeTableUtils.handleAllRowExpansion(prevState.rows, { ...prevState, expanded: {} }, this.props.setUniqueRowKey),
        displayExpandAll: !displayExpandAll,
      };
    });
  }

  render() {
    const { props } = this;
    const {
      expanded,
      displayExpandAll,
      columns,
      rows,
      innerHeight,
      outerHeight,
      tableKey,
    } = this.state;

    const isColumnHidden = hidden => typeof hidden === 'undefined' || hidden !== true;

    const toggleColumnDisplay = (columnId, hiddenValue) => {
      const updatedColumns = columns.map((col) => {
        if (col.id === columnId) {
          return { ...col, hidden: hiddenValue };
        }
        return col;
      });

      this.setState({ columns: updatedColumns });
    };

    const restoreColumnDefaults = () => {
      this.setState({ columns: TreeTableUtils.prepareColumnToggle(props.columns) });
    };

    const renderLoader = () => (
      <div styleName="loader">
        <Loader size="large" />
      </div>
    );

    const onExpandRow = ({ row }) => {
      this.setState(prevState => TreeTableUtils.handleRowExpandChange(row, prevState, props.setUniqueRowKey));
    };
    
    const getActionBar = () => {
      const listItems = columns.slice(1).map(col => ({ id: col.id, label: col.headerName, value: isColumnHidden(col.hidden) }));
      const onItemClick = toggleColumnDisplay;
      const onRestoreDefault = restoreColumnDefaults;
      const toggleColumns = props.toggleColumns;
  
      const columnToggleProps = {
        listItems: listItems, onItemClick: onItemClick, onRestoreDefault: onRestoreDefault, toggleColumns: toggleColumns,
      };
  
      return (
        <TreeTableActionBar
          toggleAll={this.toggleAllRowsExpansion}
          displayExpandAll={displayExpandAll}
          columnToggleProps={columnToggleProps}
          renderRightItems={props.renderActionBarRightItems}
        />
      );
    };

    const renderRow = (rowProps, ref) => {
      const { index, style } = rowProps;
      const rowData = rows[index];
      const { _rowId: rowKey } = rowData;
      
      return (
        <div style={style} ref={ref} key={rowKey}>
          <TreeTableRow
            style={style}
            index={index}
            data={rowData}
            parent={rowData.hasOwnProperty('children') ? rowData.children.length > 0 : false} // eslint-disable-line no-prototype-builtins
            // eslint-disable-next-line no-underscore-dangle
            level={rowData._treeDepth}
            isExpanded={expanded[rowKey] || false}
            columns={columns}
            key={rowKey}
            onRowDoubleClick={props.onRowDoubleClick}
            expandOnParentRowClick={props.expandOnParentRowClick}
            onExpand={onExpandRow}
          />
        </div>
      );
    };
    /**
     * forwardRef is needed for the DynamicHeightList to get the height of each item
     */
    const renderRowWithRef = React.forwardRef(renderRow);
    
    const isScrollbarVisible = () => props.virtualized && innerHeight > outerHeight;

    return (
      <div styleName="treeTableContainer">
        {props.title && (
          <div styleName="treeTableTitle">
            {props.title}
          </div>
        )}

        {props.loading && renderLoader()}

        <div styleName={classNames('loadingContainer', { loading: props.loading })}>
          {props.filters.length > 0 && (
            <div styleName="filterContainer">
              <Filter
                filters={props.filters}
                onFilterSubmit={props.onFilterChange}
              />
            </div>
          )}
          {getActionBar()}
          <TreeTableHeader columns={columns} scrollbarPadding={isScrollbarVisible()} />
          <div styleName="treeTableData" ref={this.onContainerRef}>
            {props.virtualized ? (
              <List
                key={tableKey}
                height={props.height}
                itemCount={rows.length}
                width="100%"
                innerRef={this.onListRef}
              >
                {renderRowWithRef}
              </List>
            ) : rows.map((_, index) => renderRow({ index }))}
          </div>
        </div>
      </div>
    );
  }
  
}

TreeTable.displayName = 'TreeTable';

TreeTable.defaultProps = {
  data: [],
  expandOnParentRowClick: false,
  columns: [],
  filters: [],
  title: '',
  height: 300,
  loading: false,
  toggleColumns: true,
  onRowDoubleClick: null,
  renderActionBarRightItems: null,
  virtualized: false,
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
   * Enables toggle row expansion on the full parent row, instead of the chevron only. Overrides onRowDoubleClick for parent rows.
   */
  expandOnParentRowClick: PropTypes.bool,
  /**
   * Sets the available filters.
   * Type: [{ label: string (required), type: oneOf('singleSelect', 'multiSelect', 'text') (required), key: string (required), options: array }]
   */
  filters: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    options: PropTypes.array,
    type: PropTypes.oneOf(['singleSelect', 'multiSelect', 'text']).isRequired,
  })),
  /**
   * Sets the height for the table. This is only needed when the virtualized prop is true.
   */
  height: PropTypes.number,
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
   * Render content on the right side of the action bar of the table
   */
  renderActionBarRightItems: PropTypes.func,
  /**
   * Sets a function to get a unique key for each row. Params: (rowData)
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
  /**
   * Whether the table should be virtualized (only visible rows rendered - faster) or all rows always rendered. The height props must also be provided if virtualized is true.
   */
  virtualized: PropTypes.bool,
};

export default TreeTable;
