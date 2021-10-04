import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import TreeTablePropTypes from '../TreeTablePropTypes';

import styles from './treeTableCell.css';

export default class TreeTableCell extends React.PureComponent {

  render() {
    return (
      <div style={this.props.style} className={styles.treeTableCell}>

        {this.props.firstColumn && (this.props.parent
          ? <div className={clsx(styles.pivotIcon, { [styles.sectionOpen]: this.props.sectionOpen }, 'pyreneIcon-chevronDown')} onClick={this.props.onExpandClick} />
          : <div className={styles.iconSpaceholder} />
        )}

        {/* Use renderCallback if there is one defined for this column */}

        {this.props.columnProps.renderCallback
          ? this.props.columnProps.renderCallback(this.props.value, this.props.rowData)
          : (
            <div className={styles.cellDataContainer} title={this.props.value}>
              {this.props.value}
            </div>
          )}
      </div>
    );
  }

}


TreeTableCell.displayName = 'TreeTableCell';

TreeTableCell.defaultProps = {
  value: '',
  columnProps: {},
  parent: false,
  sectionOpen: false,
  firstColumn: false,
  style: {},
  rowData: {},
};

TreeTableCell.propTypes = {
  columnProps: TreeTablePropTypes.COLUMN,
  firstColumn: PropTypes.bool,
  onExpandClick: PropTypes.func.isRequired,
  parent: PropTypes.bool,
  rowData: TreeTablePropTypes.DATAOBJECT,
  sectionOpen: PropTypes.bool,
  style: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  value: PropTypes.oneOfType(TreeTablePropTypes.ALLOWED_VALUES),
};
