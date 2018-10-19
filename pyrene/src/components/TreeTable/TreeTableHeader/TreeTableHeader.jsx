import React from 'react';
import PropTypes from 'prop-types';

import './treeTableHeader.css';

const TreeTableHeader = props => (
  <div styleName={'treeTableHeader'}>

    {props.headers.map(header => (
      <div styleName={'treeTableHeaderCell'} key={header}>
        {header}
      </div>
    ))}

  </div>
);


TreeTableHeader.displayName = 'TreeTableHeader';

TreeTableHeader.defaultProps = {};

TreeTableHeader.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TreeTableHeader;