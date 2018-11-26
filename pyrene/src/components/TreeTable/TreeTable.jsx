import React from 'react';
import PropTypes from 'prop-types';


import './treeTable.css';
import TreeTableHeader from './TreeTableHeader/TreeTableHeader';
import TreeTableActionBar from './TreeTableActionBar/TreeTableActionBar';
import TreeTableRow from './TreeTableRow/TreeTableRow';
import PROPCONSTANTS from './TreeTablePropTypes';
import uniqid from 'uniqid';


/**
 *  [🌳 • ┬─┬]
 *
 * A tree table contains a hierarchical set of data structured in rows and columns and grouped into nodes.
 * Trees are used to display and work with large amounts of hierarchical data.
 * They have a high data density and therefore convey an immediate feeling of complexity.
 * Ideally, you should only show trees with a lot of hierarchical data as a last resort.
 */
export default class TreeTable extends React.Component {

  expandAllParentSectionsFor = (rowIndex) => {
    let i;
    const parentIndices = [];
    for (i = rowIndex.split('.').length; i > 1; i -= 1) {
      parentIndices.push(rowIndex.split('.').slice(-i).join('.'));
    }
    return parentIndices;
  };

  state = {
    expandedRows: this.props.defaultExpandedSection ? this.expandAllParentSectionsFor(this.props.defaultExpandedSection) : [],
    displayExpandAllAction: true,
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
      expandedRowsCopy = expandedRowsCopy.filter(item => !item.startsWith(expandedRowsCopy[clickedIndex] + '.') || item ===  expandedRowsCopy[clickedIndex]);
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
    return (
      <TreeTableRow
        data={rowData}
        parent={rowData.hasOwnProperty('children') ? rowData.children.length > 0 : false}
        treeIndex={newTreeIndex}
        columns={columns}
        key={rowKey ? rowKey : uniqid()}
        expandedRows={expandedRows}
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

  render() {
    return (
      <div styleName={'treeTableContainer'}>
        {this.props.title && <div styleName={'treeTableTitle'}>
          {this.props.title}
        </div>}
        <TreeTableActionBar toggleAll={this.toggleAllRowsExpansion} displayExpandAllAction={this.state.displayExpandAllAction} />
        <TreeTableHeader columns={this.props.columns} />
        <div styleName={'treeTableData'}>
          {this.generateRowsFromData(this.props.data, this.props.columns, '0', this.state.expandedRows)}
        </div>
      </div>
    );
  }

}

TreeTable.displayName = 'TreeTable';

TreeTable.defaultProps = {
  data: [],
  columns: [],
  title: '',
  defaultExpandedSection: '',
  onRowDoubleClick: () => null,
  setUniqueRowKey: () => null,
};

TreeTable.propTypes = {
  /**
   * Sets the Table columns.
   */
  columns: PROPCONSTANTS.COLUMNS,
  /**
   * Sets the Table data displayed in the rows.
   */
  data: PROPCONSTANTS.DATA,
  /**
   * Sets a section to expand when the component is mounted.
   */
  defaultExpandedSection: PropTypes.string,
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
};
