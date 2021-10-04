import React, { FunctionComponent, CSSProperties } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import TreeTablePropTypes from '../TreeTablePropTypes';

import styles from './treeTableCell.css';

type AllowedValues = string | number | Array<any> | boolean | Function;

interface Column {
  accessor: string,
  cellStyle?: object,
  headerName?: string,
  headerStyle?: object,
  initiallyHidden?: boolean,
  width?: number,
  renderCallback?: (value: AllowedValues, rowData: Array<AllowedValues>) => JSX.Element,
}

interface TreeTableCellProps {
  columnProps: Column,
  firstColumn?: boolean,
  onExpandClick: () => void,
  parent?: boolean,
  rowData?: Array<AllowedValues>,
  sectionOpen?: boolean,
  style?: CSSProperties,
  value?: AllowedValues,
}

const TreeTableCell: FunctionComponent<TreeTableCellProps> = ({
  onExpandClick,
  value = '',
  columnProps = {},
  parent = false,
  sectionOpen = false,
  firstColumn = false,
  style = {},
  rowData = {},
}) => (
  <div style={style} className={styles.treeTableCell}>

    {firstColumn && parent
      ? <div
          className={clsx(styles.pivotIcon, { [styles.sectionOpen]: sectionOpen }, 'pyreneIcon-chevronDown')}
          onClick={onExpandClick}
        />
      : <div className={styles.iconSpaceholder} />
    }

    {/* Use renderCallback if there is one defined for this column */}

    {columnProps.renderCallback
      ? columnProps.renderCallback(value, rowData)
      : (
        <div className={styles.cellDataContainer} title={value}>
          {value}
        </div>
      )}
  </div>
);


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
