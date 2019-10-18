import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import PROPCONSTANTS from '../TreeTablePropTypes';

import './treeTableHeader.css';

const TreeTableHeader = ({ columns, scrollbarPadding }) => (
  <div styleName={classnames('treeTableHeader', { scrollbarPadding })}>

    {columns.map((column) => {
      // Do not display hidden columns
      if (column.hidden) {
        return null;
      }

      const header = column.headerName ? column.headerName : column.accessor;

      const colWidth = (typeof column.width !== 'undefined' || column.width !== 0) ? column.width : null;

      const styling = {
        width: colWidth,
        flex: colWidth ? `${colWidth} 0 auto` : null,
      };
      return (
        <div style={{ ...styling, ...column.headerStyle }} styleName="treeTableHeaderCell" key={header}>
          {header}
        </div>
      );
    })}

  </div>
);


TreeTableHeader.displayName = 'TreeTableHeader';

TreeTableHeader.defaultProps = {
  columns: [],
};

TreeTableHeader.propTypes = {
  columns: PROPCONSTANTS.COLUMNS,
  scrollbarPadding: PropTypes.bool.isRequired,
};

export default TreeTableHeader;
