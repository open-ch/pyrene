import React from 'react';
import PropTypes from 'prop-types';

import './tableColumnList.css';

const TableColumnList = props => (
  <div styleName={'columnList'}>
    <div styleName={'title'}>Columns</div>
    <div styleName={'list'}>
      Test
    </div>
  </div>
);


TableColumnList.displayName = 'TableColumnList';

TableColumnList.defaultProps = {};

TableColumnList.propTypes = {};

export default TableColumnList;