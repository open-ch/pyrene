import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './tableFilter.css';

const TableFilter = props => (
  <div styleName={'tableFilter'}>
    <div styleName={'iconPlacementContainer'}>
      <input
        styleName={'filterSearchBar'}
        type={'text'}
        placeholder={'Search'}
        onChange={() => null}
        onFocus={() => null}
      />
      <span className={'icon-search'} styleName={'searchIcon'} />
    </div>
  </div>
);


TableFilter.displayName = 'TableFilter';

TableFilter.defaultProps = {};

TableFilter.propTypes = {};

export default TableFilter;