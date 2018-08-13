import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './tableHeader.css';

const TableHeader = props => {
  //console.log(props);
  return (
    <div styleName={'tableHeader'}>
      {props.children}
    </div>
  );
};


TableHeader.displayName = 'TableHeader';

TableHeader.defaultProps = {};

TableHeader.propTypes = {};

export default TableHeader;