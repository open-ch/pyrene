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
class TreeTable extends React.Component {

  rowHeightMap = {};

  innerRef = React.createRef();

  containerRef = React.createRef();

  listRef = React.createRef();

  constructor(props) {
    super(props);
    const rows = TreeTableUtils.initialiseRootData(props.data, props.setUniqueRowKey);
    this.state = {
      tableFullyExpanded: false,
      columns: TreeTableUtils.prepareColumnToggle(props.columns),
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

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      const rows = TreeTableUtils.initialiseRootData(this.props.data, this.props.setUniqueRowKey);
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        rows,
        disabledExpandButton: this.isFlatTree(rows),
      });
    }

    const newScrollBarWidth = this.calculateScrollBarWidth();
    if (this.state.scrollBarWidth !== newScrollBarWidth) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        scrollBarWidth: newScrollBarWidth,
      });
    }
  }

  updateRowHeight = (index, newHeight) => {
    const oldHeight = this.rowHeightMap[index];
    if (this.listRef.current && oldHeight !== newHeight) {
      this.rowHeightMap[index] = newHeight;
      this.listRef.current.resetAfterIndex(index);
    }
  };

  toggleAllRowsExpansion = () => {
    const { tableFullyExpanded } = this.state;
    const { data } = this.props;
    this.setState(() => {
      if (tableFullyExpanded) {
        this.rowHeightMap = {};
        return {
          rows: TreeTableUtils.initialiseRootData(data, this.props.setUniqueRowKey),
          expanded: {},
          tableFullyExpanded: !tableFullyExpanded,
          tableKey: Date.now(), // as all rows are closed, we need to recalculate the height for the whole view - a key is the easiest way
        };
      }
      return {
        ...TreeTableUtils.handleAllRowExpansion(data, { rows: data, expanded: {} }),
        tableFullyExpanded: !tableFullyExpanded,
      };
    });
  }

  scrollToRow = (rowId) => {
    const { rows, expanded } = TreeTableUtils.handleExpandAllParentsOfRowById(rowId, this.state);
    this.setState({ rows, expanded }, () => {
      const indexToScrollTo = rows.findIndex(({ _rowId }) => _rowId === rowId);
      if (this.listRef.current) {
        this.listRef.current.scrollToItem(indexToScrollTo);
      }
    });
  };

  calculateScrollBarWidth() {
    if (this.containerRef.current && this.innerRef.current) {
      return this.containerRef.current.offsetWidth - this.innerRef.current.offsetWidth;
    }
    return 0;
  }


  isFullyExpanded(rows, expanded) {
    return rows.filter((r) => r.children && r.children.length)
      .every((r) => expanded[r._rowId]);
  }

  isFlatTree(rows) {
    return rows.every((row) => row._treeDepth === 0 && !(row.children && row.children.length));
  }

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

    const isColumnHidden = (hidden) => typeof hidden === 'undefined' || hidden !== true;

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
      this.setState((prevState) => ({ ...TreeTableUtils.handleRowExpandChange(row, prevState), tableFullyExpanded: this.isFullyExpanded(rows, expanded) }));
    };

    const getActionBar = () => {
      const listItems = columns.slice(1).map((col) => ({ id: col.id, label: col.headerName, value: isColumnHidden(col.hidden) }));
      const onItemClick = toggleColumnDisplay;
      const onRestoreDefault = restoreColumnDefaults;
      const toggleColumns = props.toggleColumns;

      const columnToggleProps = {
        listItems: listItems, onItemClick: onItemClick, onRestoreDefault: onRestoreDefault, toggleColumns: toggleColumns,
      };

      return (
        <TreeTableActionBar
          toggleAll={this.toggleAllRowsExpansion}
          displayExpandAll={!tableFullyExpanded}
          columnToggleProps={columnToggleProps}
          renderRightItems={props.renderActionBarRightItems}
          disabledExpand={disabledExpandButton}
        />
      );
    };

    const rowHeightCallback = (index) => this.rowHeightMap[index] || 32;

    const rowKeyCallback = (index) => {
      const rowData = rows[index];
      // eslint-disable-next-line no-underscore-dangle
      return rowData._rowId;
    };

    const renderRow = ({ index, style }) => {
      const rowData = rows[index];
      const { _rowId: rowKey } = rowData;

      return (
        <div style={style} key={rowKey}>
          <TreeTableRow
            style={style}
            key={rowKey}
            index={index}
            data={rowData}
            parent={rowData.children ? rowData.children.length > 0 : false}
            highlighted={props.highlightedRowId === rowKey}
            // eslint-disable-next-line no-underscore-dangle
            level={rowData._treeDepth}
            isExpanded={expanded[rowKey] || false}
            columns={columns}
            onRowDoubleClick={props.onRowDoubleClick}
            expandOnParentRowClick={props.expandOnParentRowClick}
            onExpand={onExpandRow}
            updateRowHeight={props.virtualized ? this.updateRowHeight : undefined}
          />
        </div>
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

        <div styleName={classNames({ loading: props.loading })}>
          {props.filters.length > 0 && (
            <div styleName="filterContainer">
              <Filter
                filters={props.filters}
                filterValues={props.filterValues}
                onFilterSubmit={props.onFilterChange}
              />
            </div>
          )}
          {getActionBar()}
          <TreeTableHeader columns={columns} scrollPadding={scrollBarWidth} />
          <div ref={this.containerRef} className="scrollable">
            {props.virtualized ? (
              <List
                key={tableKey}
                height={props.height}
                itemCount={rows.length}
                width="100%"
                innerRef={this.innerRef}
                itemSize={rowHeightCallback}
                itemKey={rowKeyCallback}
                ref={this.listRef}
                overscanCount={10}
              >
                {renderRow}
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
  filterValues: {},
  title: '',
  height: 300,
  highlightedRowId: null,
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
   * values to be filtered & displayed in filter dropdown
   * use {} for passing empty filterValues
   * */
  filterValues: PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  }),
  /**
   * Sets the height for the table. This is only needed when the virtualized prop is true.
   */
  height: PropTypes.number,
  /**
   * Highlights a rule in the table. Should be the same value that is calculated by using the `setUniqueRowKey` method.
   */
  highlightedRowId: PropTypes.string,
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
   * Whether the table should be virtualized (only visible rows rendered - faster) or all rows always rendered. The height prop must also be provided if virtualized is true.
   */
  virtualized: PropTypes.bool,
};

export default TreeTable;
