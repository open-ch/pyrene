import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './treeTableRow.css';
import TreeTableCell from '../TreeTableCell/TreeTableCell';
import PROPCONSTANTS from '../TreeTablePropTypes';

export default class TreeTableRow extends React.PureComponent {

  constructor(props) {
    super(props);
    this.childRowRefs = [];
    this.state = {
      isExpanded: false,
    };
  }

  addChildRowRef = (row) => {
    this.childRowRefs.push(row);
  };

  setAllRowsExpansion = (isExpanded) => {
    if (this.props.parent) {
      this.childRowRefs.forEach(row => row.setAllRowsExpansion(isExpanded));
      this.setState(() => ({
        isExpanded: isExpanded,
      }));
    }
  };

  toggleRowExpansion = () => {
    this.setState((prevState) => ({
      isExpanded: !prevState.isExpanded
    }));
  };

  render() {
    return (
      <div styleName={classNames('treeTableRow', { parent: this.props.parent })}>

        {/* Row Elements are rendered here */}
        <div
          styleName={'rowElementsContainer'}
          onDoubleClick={e => this.props.onRowDoubleClick(this.props.data)}
        >

          {this.props.columns.map((column, index) => {

            // Do not display column if it is hidden
            if (column.hidden) {
              return null;
            }

            const colWidth = (typeof column.width !== 'undefined' || column.width !== 0) ? column.width : 100;
            const styling = {
              width: colWidth,
              flex: colWidth ? `${colWidth} 0 auto` : '100 0 auto',
            };

            let firstColumn = false;
            if (index === 0) {
              styling.paddingLeft = (this.props.level * 24) + 8;
              firstColumn = true;
            }

            return (
              <TreeTableCell
                style={{ ...styling, ...column.cellStyle }}
                key={column.header}
                columnProps={column}
                firstColumn={firstColumn}
                parent={this.props.parent}
                sectionOpen={this.state.isExpanded}
                value={this.props.data[column.accessor]}
                original={this.props.data}
                onExpandClick={this.toggleRowExpansion}
              />
            );
          })}

        </div>

        {/* Children rows are rendered here */}

        {this.props.parent && <div styleName={classNames('childrenRowsContainer', { display: this.state.isExpanded })}>
          {this.props.generateRowsFromData(this.props.data.children, this.props.columns, this.props.level + 1, this.addChildRowRef)}
        </div>}
      </div>
    );
  }

}

TreeTableRow.displayName = 'TreeTableRow';

TreeTableRow.defaultProps = {
  columns: [],
  data: [],
  parent: false,
  displayAllChildren: false,
};

TreeTableRow.propTypes = {
  columns: PROPCONSTANTS.COLUMNS,
  data: PROPCONSTANTS.DATAOBJECT,
  generateRowsFromData: PropTypes.func.isRequired,

  onRowDoubleClick: PropTypes.func.isRequired,

  parent: PropTypes.bool,
  level: PropTypes.number.isRequired,
};

