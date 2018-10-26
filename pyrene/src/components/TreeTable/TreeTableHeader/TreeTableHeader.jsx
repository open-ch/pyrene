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

      return (
        <div styleName={'treeTableHeaderCell'} key={header}>
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
