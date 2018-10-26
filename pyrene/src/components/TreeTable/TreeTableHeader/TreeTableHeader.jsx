import React from 'react';
import PropTypes from 'prop-types';

import './treeTableHeader.css';

const TreeTableHeader = props => (
  <div styleName={'treeTableHeader'}>

    {props.columns.map((column) => {

      // Do not display hidden columns
      if (column.hidden) {
        return null;
      }
      const header = column.header ? column.header : column.accessor;

      const colWidth = (typeof column.width !== 'undefined' || column.width !== 0) ? column.width : null;

      const styling = {
        width: colWidth,
        flex: colWidth ? `${colWidth} 0 auto` : null,
      };
      return (
        <div style={styling} styleName={'treeTableHeaderCell'} key={header}>
          {header}
        </div>
      );
    })}

  </div>
);


TreeTableHeader.displayName = 'TreeTableHeader';

TreeTableHeader.defaultProps = {};

TreeTableHeader.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
};

export default TreeTableHeader;
