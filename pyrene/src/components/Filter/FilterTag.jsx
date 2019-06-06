import React from 'react';
import PropTypes from 'prop-types';

import './FilterTag.css';

const FilterTag = props => (
  <div styleName="wrapper">
    <div styleName="label">
      {props.filterLabel}
    </div>
    <div styleName="text">
      {props.filterText}
    </div>
    <div onClick={() => props.onClose(props.filterKey, props.filterText)}>
      <div styleName="clearIcon" className="pyreneIcon-delete" />
    </div>
  </div>
);


FilterTag.displayName = 'FilterTag';

FilterTag.propTypes = {
  filterKey: PropTypes.string.isRequired,
  filterLabel: PropTypes.string.isRequired,
  filterText: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FilterTag;
