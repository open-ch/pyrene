import React from 'react';
import PropTypes from 'prop-types';


import './treeTable.css';
import TreeTableHeader from './TreeTableHeader/TreeTableHeader';
import TreeTableActionBar from './TreeTableActionBar/TreeTableActionBar';
import TreeTableRow from './TreeTableRow/TreeTableRow';
import uniqid from 'uniqid';


/**
 *  🌳 (╯°□°）╯︵ ┻━┻
 *
*/
export default class TreeTable extends React.Component {

  state = {
    expandedRows: [],
  };

  expandAll = () => {
    const tree = this.generateTreeStructureFromData(this.props.data, '0');
    this.setState((prevState, props) => ({
      expandedRows: tree,
    }));
  };

  collapseAll = () => {
    this.setState((prevState, props) => ({
      expandedRows: [],
    }));
  };

  handleOnRowClick = (event, clickedRowIndex, isParent) => {
    event.stopPropagation();

    const clickedIndex = this.state.expandedRows.indexOf(clickedRowIndex);
    let expandedRowsCopy = [...this.state.expandedRows];

    // Element is already expanded
    if (clickedIndex > -1) {
      // See if any of its children is expanded as well & collapse them
      expandedRowsCopy = expandedRowsCopy.filter(item => !item.startsWith(expandedRowsCopy[clickedIndex]));
    } else if (isParent) {
      expandedRowsCopy.push(clickedRowIndex);
    }

    this.setState((prevState, props) => ({
      expandedRows: expandedRowsCopy,
    }));
  };

  generateRowsFromData = (data, columns, treeIndex, expandedRows) => data.map((rowData, index) => (
    <TreeTableRow
      data={rowData}
      parent={rowData.hasOwnProperty('children')}
      treeIndex={`${treeIndex}.${index}`}
      columns={columns}
      key={uniqid()}
      expandedRows={expandedRows}
      generateRowsFromData={this.generateRowsFromData}
      onRowClick={this.handleOnRowClick}
    />
  ), this);

  generateTreeStructureFromData = (data, treeIndex) => {
    const result = [];
    let i = 0;
    while (i < data.length) {
      if (data[i].hasOwnProperty('children')) {
        result.push(`${treeIndex}.${i}`);
        const children = this.generateTreeStructureFromData(data[i].children, `${treeIndex}.${i}`);
        result.push(...children);
      }
      i += 1;
    }
    return result;
  };

  render() {
    return (
      <div styleName={'treeTableContainer'}>
        {this.props.title && <div styleName={'treeTableTitle'}>
          {this.props.title}
        </div>}
        <TreeTableActionBar expandAll={this.expandAll} collapseAll={this.collapseAll} />
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
  title: '',
  defaultAllExpanded: false,
  defaultExpandedSection: '',
};

TreeTable.propTypes = {
  defaultExpandedSection: PropTypes.string,
  defaultAllExpanded: PropTypes.bool,
  title: PropTypes.string,
  columns: PropTypes.array.isRequired,
  /**
   * Needs description & better type
   */
  data: PropTypes.array.isRequired,
};
