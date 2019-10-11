import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { VariableSizeList as List } from 'react-window';

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
 */
class TreeTable extends React.Component {

  state = {
    displayExpandAll: false,
    columns: TreeTableUtils.prepareColumnToggle(this.props.columns),
    expanded: {},
    rows: TreeTableUtils.initialiseRootData(this.props.data, this.props.setUniqueRowKey),
    innerHeight: 0,
    outerHeight: 0,
  };

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ rows: TreeTableUtils.initialiseRootData(this.props.data, this.props.setUniqueRowKey) });
    }
  }
  
  onDataRef = (ref) => {
    if (ref) {
      this.setState({ outerHeight: ref.clientHeight });
    }
  }

  onListRef = (ref) => {
    const innerList = ref && ref.children[0];
    if (innerList) {
      this.setState({ innerHeight: innerList.clientHeight });
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
    const { expanded, displayExpandAll, columns, rows, innerHeight, outerHeight } = this.state;

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

    const renderRow = (rowProps) => {
      const { index, style } = rowProps;
      const rowData = rows[index];
      const { _rowId: rowKey } = rowData;

      return (
        <TreeTableRow
          style={style}
          index={index}
          data={rowData}
          parent={rowData.hasOwnProperty('children') ? rowData.children.length > 0 : false} // eslint-disable-line no-prototype-builtins
          // eslint-disable-next-line no-underscore-dangle
          level={rowData._treeDepth}
          isExpanded={expanded[rowKey]}
          columns={columns}
          key={rowKey}
          onRowDoubleClick={props.onRowDoubleClick}
          expandOnParentRowClick={props.expandOnParentRowClick}
          onExpand={onExpandRow}
        />
      );
    };

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
          <TreeTableHeader columns={columns} scrollbarPadding={innerHeight > outerHeight} />
          <div styleName="treeTableData" ref={this.onDataRef}>
            <List
              height={300}
              itemCount={rows.length}
              itemSize={() => 32}
              width="100%"
              outerRef={this.onListRef}
            >
              {renderRow}
            </List>
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
  loading: false,
  toggleColumns: true,
  onRowDoubleClick: null,
  renderActionBarRightItems: null,
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
};

export default TreeTable;
