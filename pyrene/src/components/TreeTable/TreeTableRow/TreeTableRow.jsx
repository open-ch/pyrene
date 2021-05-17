import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './treeTableRow.css';
import TreeTableCell from '../TreeTableCell/TreeTableCell';
import PROPCONSTANTS from '../TreeTablePropTypes';

export default class TreeTableRow extends React.PureComponent {

  handleSingleClick = () => {
    const {
      data, onRowClick, parent, expandOnParentRowClick,
    } = this.props;
    if (parent && expandOnParentRowClick) {
      this.toggleRowExpansion();
    } else {
      onRowClick(data);
    }
  };

  toggleRowExpansion = () => {
    const {
      data: row, index,
    } = this.props;
    this.props.onExpand({ row, index });
  };

  render() {
    const hasExpandAction = this.props.parent && this.props.expandOnParentRowClick;
    const hasSingleClickAction = hasExpandAction || this.props.onRowClick !== null;
    const hasDoubleClickAction = !hasSingleClickAction && this.props.onRowDoubleClick !== null;
    return (
      <div
        className={clsx(styles.treeTableRow, { [styles.activeAction]: (hasSingleClickAction || hasDoubleClickAction) })}
      >

        {/* Row Elements are rendered here */}
        <div
          className={clsx(
            styles.rowElementsContainer,
            { [styles.openRootParent]: (this.props.level === 0 && this.props.isExpanded && this.props.parent) },
            { [styles.highlighted]: this.props.highlighted },
          )}
          onClick={hasSingleClickAction ? this.handleSingleClick : null}
          onDoubleClick={hasDoubleClickAction ? () => this.props.onRowDoubleClick(this.props.data) : null}
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
  highlighted: false,
  onExpand: null,
  onRowClick: null,
  onRowDoubleClick: null,
  parent: false,
};

TreeTableRow.propTypes = {
  columns: PROPCONSTANTS.COLUMNS,
  data: PROPCONSTANTS.DATAOBJECT,
  expandOnParentRowClick: PropTypes.bool.isRequired,
  highlighted: PropTypes.bool,
  index: PropTypes.number.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  level: PropTypes.number.isRequired,
  onExpand: PropTypes.func,
  onRowClick: PropTypes.func,
  onRowDoubleClick: PropTypes.func,
  parent: PropTypes.bool,
};
