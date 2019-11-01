import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './treeTableRow.css';
import TreeTableCell from '../TreeTableCell/TreeTableCell';
import PROPCONSTANTS from '../TreeTablePropTypes';

export default class TreeTableRow extends React.PureComponent {

  updateRowHeight = (ref) => {
    const { updateRowHeight, index } = this.props;
    if (ref) {
      updateRowHeight(index, ref.clientHeight);
    }
  }

  toggleRowExpansion = () => {
    const { data: row, index } = this.props;
    this.props.onExpand({ row, index });
  };

  render() {
    const hasExpandAction = this.props.parent && this.props.expandOnParentRowClick;
    return (
      <div
        styleName={classNames('treeTableRow', { activeAction: hasExpandAction || this.props.onRowDoubleClick !== null })}
        ref={this.updateRowHeight}
      >

        {/* Row Elements are rendered here */}
        <div
          styleName={classNames('rowElementsContainer', { openRootParent: this.props.level === 0 && this.props.isExpanded })}
          onClick={hasExpandAction ? this.toggleRowExpansion : null}
          onDoubleClick={hasExpandAction ? null : () => this.props.onRowDoubleClick(this.props.data)}
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
                key={column.accessor}
                columnProps={column}
                firstColumn={firstColumn}
                parent={this.props.parent}
                sectionOpen={this.props.isExpanded}
                value={this.props.data[column.accessor]}
                rowData={this.props.data}
                onExpandClick={hasExpandAction ? () => null : this.toggleRowExpansion}
              />
            );
          })}

        </div>
      </div>
    );
  }

}

TreeTableRow.displayName = 'TreeTableRow';

TreeTableRow.defaultProps = {
  columns: [],
  data: {},
  onExpand: null,
  onRowDoubleClick: null,
  parent: false,
  updateRowHeight: () => {},
};

TreeTableRow.propTypes = {
  columns: PROPCONSTANTS.COLUMNS,
  data: PROPCONSTANTS.DATAOBJECT,
  expandOnParentRowClick: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  level: PropTypes.number.isRequired,
  onExpand: PropTypes.func,
  onRowDoubleClick: PropTypes.func,
  parent: PropTypes.bool,
  updateRowHeight: PropTypes.func,
};
